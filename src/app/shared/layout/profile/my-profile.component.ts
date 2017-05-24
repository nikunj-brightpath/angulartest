import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProfileServiceProxy, CurrentUserProfileEditDto, DefaultTimezoneScope, UserLoginInfoDto,UpdateProfilePictureInput } from "@shared/service-proxies/service-proxies";
import { AppSessionService } from '@shared/common/session/app-session.service';
import { AppConsts } from '@shared/AppConsts';
import { ChangeProfilePictureModalComponent } from './change-profile-picture-modal.component';
import { NgForm } from '@angular/forms';



@Component({
    selector: 'myProfile',
    templateUrl: './my-profile.component.html'

})
export class MyProfileComponent extends AppComponentBase implements OnInit {


    @ViewChild('changeProfilePictureModal') changeProfilePictureModal: ChangeProfilePictureModalComponent;
    @ViewChild('myProfileForm') profileForm: NgForm;


    public saving: boolean = false;
    public user: CurrentUserProfileEditDto = new CurrentUserProfileEditDto();
    private _initialTimezone: string = undefined;
    public allRoles: string;
    public profilePicture: string = "/assets/common/images/person-placeholder.jpg";
    public profileExist:boolean=false;
    constructor(
        injector: Injector,
        private _profileService: ProfileServiceProxy,
        private _appSessionService: AppSessionService
    ) {
        super(injector);
    }

    showProfile() {
        this._profileService.getCurrentUserProfileForEdit().subscribe((result) => {
            let allRoles = [];
            this.user = result;
            this.user.roles.forEach((item) => {
                allRoles.push(item.roleName)
            });
            this.allRoles = allRoles.join(",");
            this._initialTimezone = result.timezone;
            // this.canChangeUserName = this.user.userName != AppConsts.userManagement.defaultAdminUserName;
            $('#qrtMyProfile').toggle(200, "linear");
        });
    }

    hideProfile() {
        $('#qrtMyProfile').toggle(200, "linear");
    }


    changeProfilePicture(): void {
        this.changeProfilePictureModal.show();
    }

    ngOnInit() {
        this.registerToEvents();
        this.getProfilePicture();
    }

    registerToEvents() {
        abp.event.on("profilePictureChanged", () => {
            this.getProfilePicture();
        });
    }
    getProfilePicture(): void {
        this._profileService.getProfilePicture().subscribe(result => {
            if (result && result.profilePicture) {
                this.profileExist=true;
                this.profilePicture = 'data:image/jpeg;base64,' + result.profilePicture;
            }else{
                this.profilePicture = "/assets/common/images/person-placeholder.jpg";
                this.profileExist=false;
            }
        });
    }

    save(): void {
        this.saving = true;
        this._profileService.updateCurrentUserProfile(this.user)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this._appSessionService.user.name = this.user.name;
                this._appSessionService.user.surname = this.user.surname;
                this._appSessionService.user.userName = this.user.userName;
                this._appSessionService.user.emailAddress = this.user.emailAddress;

                this.notify.info(this.l('SavedSuccessfully'));

                if (abp.clock.provider.supportsMultipleTimezone && this._initialTimezone !== this.user.timezone) {
                    this.message.info(this.l('TimeZoneSettingChangedRefreshPageNotification')).done(() => {
                        window.location.reload();
                    });
                }
            });
    }

    closeMyProfile() {
        if (!this.profileForm.dirty) {
            this.profileForm.reset();
            $('#qrtMyProfile').toggle(200, "linear");
            return;
        }

        let self = this;
        self.message.confirm(
            "Are you sure to discard changes?",
            function (isConfirmed) {
                if (isConfirmed) {
                    self.profileForm.reset();
                    $('#qrtMyProfile').toggle(200, "linear");
                }
            }
        );
    }
}