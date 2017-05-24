import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServiceProxy, PasswordComplexitySetting, ProfileServiceProxy, TokenAuthServiceProxy, AuthenticateModel, AuthenticateResultModel, IsTenantAvailableInput } from '@shared/service-proxies/service-proxies'
import { AppComponentBase } from '@shared/common/app-component-base';
import { LoginService } from '../login/login.service';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { RegisterModel } from './register.model';
import { AppConsts } from '@shared/AppConsts';
import { SubdomainTenancyNameFinder } from '@shared/helpers/SubdomainTenancyNameFinder';
import { AppTenantAvailabilityState } from '@shared/AppEnums';

@Component({
    templateUrl: './register.component.html',
    animations: [accountModuleAnimation()]
})
export class RegisterComponent extends AppComponentBase implements OnInit {

    model: RegisterModel = new RegisterModel();


    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();
    showCompanyNameTextbox: boolean = false;
    companyName: string = null;
    saving: boolean = false;

    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _router: Router,
        private readonly _loginService: LoginService,
        private _profileService: ProfileServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        //Prevent to register new users in the host context
        // if (this.appSession.tenant == null) {
        //     this._router.navigate(['account/login']);
        //     return;
        // }

        this.model.companyName = this.getTenancyNameOrNull();
        this.loadTenantSettings(this.model.companyName, false);
        this.showCompanyNameTextbox = this.model.companyName == null ? true : false;
        this._profileService.getPasswordComplexitySetting().subscribe(result => {
            this.passwordComplexitySetting = result.setting;
        });
    }
    private loadTenantSettings(tenancyName, callAuthenticate: boolean): void {
        if (!tenancyName) {
            abp.multiTenancy.setTenantIdCookie(undefined);
            callAuthenticate ? this.authenticate() : '';
            //    location.reload();
            return;
        }

        var input = new IsTenantAvailableInput();
        input.tenancyName = tenancyName;

        this._accountService.isTenantAvailable(input)
            .finally(() => { this.saving = false; })
            .subscribe((result) => {
                switch (result.state) {
                    case AppTenantAvailabilityState.Available:
                        abp.multiTenancy.setTenantIdCookie(result.tenantId);
                        callAuthenticate ? this.authenticate() : '';
                        //   location.reload();
                        return;
                    case AppTenantAvailabilityState.InActive:
                        this.message.warn(this.l('TenantIsNotActive', tenancyName));
                        break;
                    case AppTenantAvailabilityState.NotFound: //NotFound
                        this.message.warn(this.l('ThereIsNoTenantDefinedWithName{0}', tenancyName));
                        break;
                }
            })
    }
    private authenticate(): void {
        this.saving = true;
        this._loginService.authenticate(
            () => this.saving = false
        );
    }
    get useCaptcha(): boolean {
        //uncomment the below line to captcha functionality
        //return this.setting.getBoolean('App.UserManagement.UseCaptchaOnRegistration');
        return false;
    }
    private getTenancyNameOrNull(): string {
        let subdomainTenancyNameFinder = new SubdomainTenancyNameFinder();
        var tenancyName = subdomainTenancyNameFinder.getCurrentTenancyNameOrNull(AppConsts.appBaseUrlFormat);
        return tenancyName;
    }
    save(): void {
        if (this.useCaptcha && !this.model.captchaResponse) {
            this.message.warn(this.l('CaptchaCanNotBeEmpty'));
            return;
        }
        this.model.name = "default";
        this.model.surname = "defalut"
        //this.model.companyName=this.companyName;
        this.saving = true;
        this._accountService.register(this.model)
            .finally(() => { this.saving = false; })
            .subscribe((result) => {
                if (!result.canLogin) {
                    this.notify.success(this.l('SuccessfullyRegistered'));
                    this._router.navigate(['account/login']);
                    return;
                }

                //Autheticate
                this.saving = true;
                this._loginService.authenticateModel.userNameOrEmailAddress = this.model.userName;
                this._loginService.authenticateModel.password = this.model.password;
                this._loginService.authenticate(() => { this.saving = false; });
            });
    }

    captchaResolved(captchaResponse: string): void {
        this.model.captchaResponse = captchaResponse;
    }
}