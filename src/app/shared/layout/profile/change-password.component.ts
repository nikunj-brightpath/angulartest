import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProfileServiceProxy, ChangePasswordInput, PasswordComplexitySetting } from '@shared/service-proxies/service-proxies'
import { NgForm } from '@angular/forms';


@Component({
    selector: 'changePassword',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent extends AppComponentBase {

    @ViewChild('changePasswordForm') changePasswordForm: NgForm;

    currentPassword: string;
    password: string;
    saving: boolean = false;
    confirmPassword: string;
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();

    constructor(
        injector: Injector,
        private _profileService: ProfileServiceProxy
    ) {
        super(injector);
    }

    show(): void {
        this.currentPassword = '';
        this.password = '';
        this.confirmPassword = '';
        this.changePasswordForm.reset();
        $('#qrtResetPwd').toggle(200, "linear");
        this._profileService.getPasswordComplexitySetting().subscribe(result => {
            this.passwordComplexitySetting = result.setting;
        });
    }

    save(): void {
        var input = new ChangePasswordInput();
        input.currentPassword = this.currentPassword;
        input.newPassword = this.password;

        this.saving = true;
        this._profileService.changePassword(input)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this.notify.info(this.l('YourPasswordHasChangedSuccessfully'));
            });
    }

    closeChangePassword() {
        if (!this.changePasswordForm.dirty) {
            this.changePasswordForm.reset();
            $('#qrtResetPwd').toggle(200, "linear");
            return;
        }

        let self = this;
        self.message.confirm(
            "Are you sure to discard changes?",
            function (isConfirmed) {
                if (isConfirmed) {
                    self.changePasswordForm.reset();
                    $('#qrtResetPwd').toggle(200, "linear");
                }
            }
        );
    }

    toggleSideBars(id: string): void {
        $('#' + id).toggle(200, "linear");
        this.changePasswordForm.reset();
    }


}