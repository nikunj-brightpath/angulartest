import { Component, Injector, OnInit, ViewChild, Output, EventEmitter } from '@angular/core'
import { AppComponentBase } from '@shared/common/app-component-base';
import { RoleServiceProxy, RoleListDto } from "@shared/service-proxies/service-proxies";
import * as moment from 'moment';
//import { ModalDirective } from 'ng2-bootstrap';
import { CommonFilterDataService } from './common-filter-data-service';
import * as _ from 'lodash';


@Component({
    selector: 'filterUserComponent',
    templateUrl: './filter-users.component.html'
})

export class FilterUserComponent extends AppComponentBase implements OnInit {

    @Output() filterEvent: EventEmitter<any> = new EventEmitter<any>();
    // startDate: moment.Moment;//moment().startOf("day"); to set default date as current date
    // endDate: moment.Moment; //moment().endOf("day");
    // roles: any;

    filter: any;
    constructor(injector: Injector,
        private _roleServiceProxy: RoleServiceProxy,
        private _commonFilterDataService: CommonFilterDataService) {
        super(injector);
        this.getRoles();
    }

    toggleSideBars(id: string): void {
        $('#' + id).toggle(200, "linear");
    }

    applyFilters() {
        this.toggleSideBars('qrtFilter');
        this._commonFilterDataService.set(this.filter);
        this.filterEvent.emit(null);
    }

    ngOnInit() {
        this.filter = this._commonFilterDataService.get();
    }

    resetFilter(): void {
        this.toggleSideBars('qrtFilter');
        this.filter.roles.forEach(element => {
            element.selected = false;
        });
        this.filter.startDate = undefined;
        this.filter.endDate = undefined;
        this._commonFilterDataService.set(this.filter);
        this.filterEvent.emit(null);
    }

    updateFilterFromParent() {
        this.filter = this._commonFilterDataService.get();
    }

    private getRoles(): void {
        this._roleServiceProxy.getRoles("")
            .subscribe(result => {
                this.filter.roles = result.items.filter(item => item.displayName == 'Admin' || item.displayName == 'Agent');
                this._commonFilterDataService.set(this.filter)
            })
    }
}