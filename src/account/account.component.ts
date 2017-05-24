import { Component, ViewContainerRef, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login/login.service';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';

import * as moment from 'moment';

@Component({
    templateUrl: './account.component.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class AccountComponent extends AppComponentBase implements OnInit {

    private viewContainerRef: ViewContainerRef;

    currentYear: number = moment().year();
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    public constructor(
        injector: Injector,
        private _loginService: LoginService,
        viewContainerRef: ViewContainerRef
    ) {
        super(injector);

        this.viewContainerRef = viewContainerRef; // We need this small hack in order to catch application root view container ref for modals
    }

    showTenantChange(): boolean {
        return abp.multiTenancy.isEnabled && !this.supportsTenancyNameInUrl();
    }

    ngOnInit(): void {
        this._loginService.init();
        $('body').attr('class', 'page-md ');
    }

    private supportsTenancyNameInUrl() {
        return (AppConsts.appBaseUrlFormat && AppConsts.appBaseUrlFormat.indexOf(AppConsts.tenancyNamePlaceHolderInUrl) >= 0);
    }
}
