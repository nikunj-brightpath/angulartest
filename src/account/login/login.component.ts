import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { TokenAuthServiceProxy, AuthenticateModel, AuthenticateResultModel, IsTenantAvailableInput, AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { LoginService, ExternalLoginProvider } from './login.service';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { SubdomainTenancyNameFinder } from '@shared/helpers/SubdomainTenancyNameFinder';
import { AppTenantAvailabilityState } from '@shared/AppEnums';




@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()],
    selector: 'loginComponent'
})
export class LoginComponent extends AppComponentBase implements OnInit {


    showCompanyNameTextbox: boolean = false;
    companyName: string = null;
    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _router: Router,
        private _sessionService: AbpSessionService,
        private _accountService: AccountServiceProxy
    ) {
        super(injector);


    }
    submitting: boolean = false;
    ngOnInit() {
        this.companyName = this.getTenancyNameOrNull();
        this.loadTenantSettings(this.companyName, false);
        this.showCompanyNameTextbox = this.companyName == null ? true : false;
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
            .finally(() => {
                this.submitting = false;
            })
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

    private getTenancyNameOrNull(): string {
        let subdomainTenancyNameFinder = new SubdomainTenancyNameFinder();
        var tenancyName = subdomainTenancyNameFinder.getCurrentTenancyNameOrNull(AppConsts.appBaseUrlFormat);
        return tenancyName;
    }

    get multiTenancySideIsTeanant(): boolean {
        return this._sessionService.tenantId > 0;
    }

    get isSelfRegistrationAllowed(): boolean {
        if (!this._sessionService.tenantId) {
            return false;
        }

        return this.setting.getBoolean('App.UserManagement.AllowSelfRegistration');
    }


    private authenticate(): void {
        this.submitting = true;
        this.loginService.authenticate(
            () => this.submitting = false

        );


    }

    login(): void {
    this.submitting = true;
        this.loadTenantSettings(this.companyName, true);

    }

    externalLogin(provider: ExternalLoginProvider) {
        this.loginService.externalAuthenticate(provider);
    }

    // goToSignUp() {
    //   this.router.navigateByUrl('/login'); 
    // }

}