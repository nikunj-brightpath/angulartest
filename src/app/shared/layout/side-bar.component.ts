import { Component, OnInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { SideBarMenu } from './side-bar-menu';
import { SideBarMenuItem } from './side-bar-menu-item';

import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LocalizationService } from '@abp/localization/localization.service';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
import { ProfileServiceProxy, UserLinkServiceProxy, UserServiceProxy, LinkedUserDto, ChangeUserLanguageDto } from '@shared/service-proxies/service-proxies';
import { LoginAttemptsModalComponent } from './login-attempts-modal.component';
import { LinkedAccountsModalComponent } from './linked-accounts-modal.component';
import { ChangePasswordModalComponent } from './profile/change-password-modal.component';
import { ChangePasswordComponent } from './profile/change-password.component';
import { MyProfileComponent } from './profile/my-profile.component';


import { ChangeProfilePictureModalComponent } from './profile/change-profile-picture-modal.component';
import { MySettingsModalComponent } from './profile/my-settings-modal.component'
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { ImpersonationService } from '@app/admin/users/impersonation.service';
import { LinkedAccountService } from '@app/shared/layout/linked-account.service';
import { NotificationSettingsModalCompoent } from '@app/shared/layout/notifications/notification-settings-modal.component';
import { UserNotificationHelper } from '@app/shared/layout/notifications/UserNotificationHelper';
import { AppConsts } from '@shared/AppConsts';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';


@Component({
    templateUrl: './side-bar.component.html',
    selector: 'side-bar'
})
export class SideBarComponent extends AppComponentBase implements OnInit {
    @ViewChild('notificationSettingsModal') notificationSettingsModal: NotificationSettingsModalCompoent;

    @ViewChild('loginAttemptsModal') loginAttemptsModal: LoginAttemptsModalComponent;
    @ViewChild('linkedAccountsModal') linkedAccountsModal: LinkedAccountsModalComponent;
    @ViewChild('changePasswordModal') changePasswordModal: ChangePasswordModalComponent;
    @ViewChild('changeProfilePictureModal') changeProfilePictureModal: ChangeProfilePictureModalComponent;
    @ViewChild('mySettingsModal') mySettingsModal: MySettingsModalComponent;
    @ViewChild('changePassword') changePasswordComponent: ChangePasswordComponent;
    @ViewChild('myProfile') myProfile: MyProfileComponent;



    languages: abp.localization.ILanguageInfo[];
    currentLanguage: abp.localization.ILanguageInfo;
    isImpersonatedLogin: boolean = false;

    shownLoginNameTitle: string = "";
    shownLoginName: string = "";
    profilePicture: string = "/assets/common/images/default-profile-picture.png";
    recentlyLinkedUsers: LinkedUserDto[];
    unreadChatMessageCount = 0;

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    chatConnected = false;
    activeRouteUrl: string;
    constructor(
        injector: Injector,
        private _sessionService: AbpSessionService,
        private _abpMultiTenancyService: AbpMultiTenancyService,
        private _profileServiceProxy: ProfileServiceProxy,
        private _userLinkServiceProxy: UserLinkServiceProxy,
        private _userServiceProxy: UserServiceProxy,
        private _authService: AppAuthService,
        private _impersonationService: ImpersonationService,
        private _linkedAccountService: LinkedAccountService,
        private _userNotificationHelper: UserNotificationHelper,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {
        super(injector);
    }

    // menu: SideBarMenu = new SideBarMenu("MainMenu", "MainMenu", [
    //     new SideBarMenuItem("Dashboard", "Pages.Tenant.Dashboard", "icon-home", "/app/main/dashboard"),
    //     new SideBarMenuItem("Tenants", "Pages.Tenants", "icon-globe", "/app/admin/tenants"),
    //     new SideBarMenuItem("Editions", "Pages.Editions", "icon-grid", "/app/admin/editions"),
    //     new SideBarMenuItem("Administration", "", "icon-wrench", "", [
    //         new SideBarMenuItem("OrganizationUnits", "Pages.Administration.OrganizationUnits", "icon-layers", "/app/admin/organization-units"),
    //         new SideBarMenuItem("Roles", "Pages.Administration.Roles", "icon-briefcase", "/app/admin/roles"),
    //         new SideBarMenuItem("Users", "Pages.Administration.Users", "icon-people", "/app/admin/users"),
    //         new SideBarMenuItem("Languages", "Pages.Administration.Languages", "icon-flag", "/app/admin/languages"),
    //         new SideBarMenuItem("AuditLogs", "Pages.Administration.AuditLogs", "icon-lock", "/app/admin/auditLogs"),
    //         new SideBarMenuItem("Maintenance", "Pages.Administration.Host.Maintenance", "icon-wrench", "/app/admin/maintenance"),
    //         new SideBarMenuItem("Settings", "Pages.Administration.Host.Settings", "icon-settings", "/app/admin/hostSettings"),
    //         new SideBarMenuItem("Settings", "Pages.Administration.Tenant.Settings", "icon-settings", "/app/admin/tenantSettings")
    //     ])
    // ]);
    menu: SideBarMenu = new SideBarMenu("MainMenu", "MainMenu", [
        new SideBarMenuItem("Home", "Pages.Tenant.Dashboard", "icon-home", "/app/main/dashboard"),
        new SideBarMenuItem("Tenants", "Pages.Tenants", "icon-globe", "/app/admin/tenants"),
        // new SideBarMenuItem("Editions", "Pages.Editions", "icon-grid", "/app/admin/editions"),
        new SideBarMenuItem("Administration", "", "icon-wrench", "", [
            // new SideBarMenuItem("OrganizationUnits", "Pages.Administration.OrganizationUnits", "icon-layers", "/app/admin/organization-units"),
            // new SideBarMenuItem("Roles", "Pages.Administration.Roles", "icon-briefcase", "/app/admin/roles"),
            // new SideBarMenuItem("Users", "Pages.Administration.Users", "icon-people", "/app/admin/users"),
            // new SideBarMenuItem("Languages", "Pages.Administration.Languages", "icon-flag", "/app/admin/languages"),
            // new SideBarMenuItem("AuditLogs", "Pages.Administration.AuditLogs", "icon-lock", "/app/admin/auditLogs"),
            // new SideBarMenuItem("Maintenance", "Pages.Administration.Host.Maintenance", "icon-wrench", "/app/admin/maintenance"),
            new SideBarMenuItem("Settings", "Pages.Administration.Host.Settings", "icon-settings", "/app/admin/hostSettings"),
            new SideBarMenuItem("Settings", "Pages.Administration.Tenant.Settings", "icon-settings", "/app/admin/tenantSettings")
        ]),
        new SideBarMenuItem("Tickets", "Pages.Tickets", "/assets/layouts/layout4/img/icon/ticket_24", ""),
        new SideBarMenuItem("Leads", "Pages.Leads", "/assets/layouts/layout4/img/icon/sign_24", ""),
        new SideBarMenuItem("Knowledge Base", "Pages.KnowledgeBase", "/assets/layouts/layout4/img/icon/books_24", "/app/admin/knowledge-base"),
        new SideBarMenuItem("Settings", "Pages.Settings", "/assets/layouts/layout4/img/icon/settings_24", "", [
            new SideBarMenuItem("Integration", "Pages.Settings.Integration", "", ""),
            new SideBarMenuItem("Users", "Pages.Administration.Users", "", "/app/admin/users"),
        ])
    ]);
    checkChildMenuItemPermission(menuItem): boolean {

        for (var i = 0; i < menuItem.items.length; i++) {
            var subMenuItem = menuItem.items[i];

            if (subMenuItem.permissionName && this.permission.isGranted(subMenuItem.permissionName)) {
                return true;
            }

            if (subMenuItem.items && subMenuItem.items.length) {
                return this.checkChildMenuItemPermission(subMenuItem);
            } else if (!subMenuItem.permissionName) {
                return true;
            }
        }

        return false;
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        if (menuItem.items && menuItem.items.length) {
            return this.checkChildMenuItemPermission(menuItem);
        }

        return true;
    }
    private unloadLoginCss(): string {
        $('link[href="/assets/pages/css/login-5.css"]').prop('disabled', true);
    //    $( "<style>.body.page-md {background-color : #F9FCFB}</style>" ).appendTo( "head" )
        return 'Success';
    }
    ngOnInit() {
        this.unloadLoginCss();
       
        this._userNotificationHelper.settingsModal = this.notificationSettingsModal;

        this.languages = this.localization.languages;
        this.currentLanguage = this.localization.currentLanguage;
        this.isImpersonatedLogin = this._sessionService.impersonatorUserId > 0;

        this.shownLoginNameTitle = this.isImpersonatedLogin ? this.l("YouCanBackToYourAccount") : "";
        this.getCurrentLoginInformations();
        this.getProfilePicture();
        this.getRecentlyLinkedUsers();

        this.registerToEvents();

        this.activeRouteUrl = this._router.url;
        this._router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((data: NavigationStart) => {
                this.activeRouteUrl = data.url;
            })
    }

    registerToEvents() {
        abp.event.on("profilePictureChanged", () => {
            this.getProfilePicture();
        });

        abp.event.on('app.chat.unreadMessageCountChanged', messageCount => {
            this.unreadChatMessageCount = messageCount;
        });

        abp.event.on('app.chat.connected', () => {
            this.chatConnected = true;
        });
    }

    changeLanguage(languageName: string): void {
        let input = new ChangeUserLanguageDto();
        input.languageName = languageName;

        this._profileServiceProxy.changeLanguage(input).subscribe(() => {
            abp.utils.setCookieValue(
                "Abp.Localization.CultureName",
                languageName,
                new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
                abp.appPath
            );

            window.location.reload();
        });
    }

    getCurrentLoginInformations(): void {
        var loginName = this.appSession.getShownLoginName();
        this.shownLoginName = loginName.substring(loginName.indexOf('\\') + 1, loginName.length);
    }

    getShownUserName(linkedUser: LinkedUserDto): string {
        if (!this._abpMultiTenancyService.isEnabled) {
            return linkedUser.username;
        }

        return (linkedUser.tenantId ? linkedUser.tenancyName : ".") + "\\" + linkedUser.username;
    }

    getProfilePicture(): void {
        this._profileServiceProxy.getProfilePicture().subscribe(result => {
            if (result && result.profilePicture) {
                this.profilePicture = 'data:image/jpeg;base64,' + result.profilePicture;
            }
        });
    }

    getRecentlyLinkedUsers(): void {
        this._userLinkServiceProxy.getRecentlyUsedLinkedUsers().subscribe(result => {
            this.recentlyLinkedUsers = result.items;
        });
    }

    showLoginAttempts(): void {
        this.loginAttemptsModal.show();
    }

    showLinkedAccounts(): void {
        this.linkedAccountsModal.show();
    }

    changePassword(): void {
        this.changePasswordModal.show();
    }

    changeProfilePicture(): void {
        this.changeProfilePictureModal.show();
    }

    changeMySettings(): void {
        this.mySettingsModal.show();
    }

    logout(): void {
        this._authService.logout();
    }

    onMySettingsModalSaved(): void {
        this.shownLoginName = this.appSession.getShownLoginName();
    }

    backToMyAccount(): void {
        this._impersonationService.backToImpersonator();
    }

    switchToLinkedUser(linkedUser: LinkedUserDto): void {
        this._linkedAccountService.switchToAccount(linkedUser.id, linkedUser.tenantId);
    }

    get chatEnabled(): boolean {
        return !this._sessionService.tenantId || this.feature.isEnabled("App.ChatFeature");
    }

    showChangePassword(): void {
        this.changePasswordComponent.show();
    }

    showMyProfile(): void {
        this.myProfile.showProfile();
    }
}