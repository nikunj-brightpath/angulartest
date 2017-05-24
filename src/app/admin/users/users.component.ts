import { Component, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserServiceProxy, UserListDto, EntityDtoOfInt64 } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { NotifyService } from '@abp/notify/notify.service';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { FlatPermissionWithLevelDto, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditUserModalComponent } from './create-or-edit-user-modal.component';
import { EditUserPermissionsModalComponent } from './edit-user-permissions-modal.component';
import { ImpersonationService } from './impersonation.service';
import { JTableHelper } from '@shared/helpers/JTableHelper';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import * as moment from "moment";
import { CreateOrEditUserComponent } from "./create-or-edit-user.component";
import { FilterUserComponent } from "./filter-users.component";
import { CommonFilterDataService } from './common-filter-data-service'

@Component({
    templateUrl: "./users.component.html",
    animations: [appModuleAnimation()]
})
export class UsersComponent extends AppComponentBase implements AfterViewInit {

    @ViewChild('createOrEditUserModal') createOrEditUserModal: CreateOrEditUserModalComponent;
    @ViewChild('editUserPermissionsModal') editUserPermissionsModal: EditUserPermissionsModalComponent;
    @ViewChild('createOrEditUserComponent') createOrEditUserComponent: CreateOrEditUserComponent;

    @ViewChild('filterComponent') filterUserComponent: FilterUserComponent;
    //Filters
    advancedFiltersAreShown: boolean = false;
    filterText: string = '';
    selectedPermission: string = '';
    startDate: moment.Moment = undefined;
    endDate: moment.Moment = undefined;
    roleNames: any[];
    filter: any = {};
    userData: any;
    userCount: number;
    adminCount: number;
    agentCount: number;
    firstName: string;
    lastName: string;
    userId: number;
    cUser: any;
    tempUser: any = null;
    private _$usersTable: JQuery;
    constructor(
        injector: Injector,
        private _http: Http,
        private _userServiceProxy: UserServiceProxy,
        private _notifyService: NotifyService,
        private _fileDownloadService: FileDownloadService,
        private _impersonationService: ImpersonationService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _commonFilterDataService: CommonFilterDataService
    ) {
        super(injector);
    }
    loadingData: boolean = false;
    editUser(id: string, user?: any) {
        user.isEditing = true;
        this.tempUser = user;
        this.userId = user.id;
        this.createOrEditUserComponent.getUserById(user.id);
        this.toggleSideBars(id);
    }

    ngAfterViewInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.loadingData = true;
        this.filter = this._commonFilterDataService.get();
        let roleIds: number[] = [];
        this.filter.roles.forEach(element => {
            if (element.selected) {
                roleIds.push(element.id);
            }

        });


        this._userServiceProxy.getUsers(this.filter.startDate, this.filter.endDate, roleIds, 0, 0, '', 1000, 0)
            .finally(() => {
                this.loadingData = false;
            })
            .subscribe(result => {
                this.userData = result.items;
                this.userCount = result.items.length;

                this.adminCount = result.items[0].adminCount;
                this.agentCount = result.items[0].agentCount;
                var userDt = result.items;

            });
    }

    displayRoleName(item): string {

        var roleNames = '';
        if (item) {
            for (var j = 0; j < item.roles.length; j++) {
                if (roleNames.length) {
                    roleNames = roleNames + ', ';

                }
                roleNames = roleNames + item.roles[j].roleName;
            };
        }
        return roleNames;
    }
    exportToExcel(): void {
        this._userServiceProxy.getUsersToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createUser(): void {
        this.createOrEditUserModal.show();
    }

    confirmDeleteUser(user: any): void {
        if (user.userName === AppConsts.userManagement.defaultAdminUserName) {
            this.message.warn(this.l("{0}UserCannotBeDeleted", AppConsts.userManagement.defaultAdminUserName));
            return;
        }
        user.isEditing = true;
        this.tempUser = user;
        $("#deleteConfirmModal").modal("show");
        this.firstName = user.name;
        this.lastName = user.surname;
        this.userId = user.id;
        this.cUser = user;
    }

    deleteUser(userId: number): void {
        $("#deleteConfirmModal").modal("hide");

        this._userServiceProxy.deleteUser(userId)
            .finally(()=>{
                this.resetEditableRow();
            })
            .subscribe(() => {
                this.getUsers();
                this.notify.success(this.l('SuccessfullyDeleted'));
            })
        
    }

    //deleteUser(user: UserListDto): void {
    //    if (user.userName === AppConsts.userManagement.defaultAdminUserName) {
    //        this.message.warn(this.l("{0}UserCannotBeDeleted", AppConsts.userManagement.defaultAdminUserName));
    //        return;
    //    }

    //    this.message.confirm(
    //        this.l('UserDeleteWarningMessage', user.userName),
    //        (isConfirmed) => {
    //            if (isConfirmed) {
    //                this._userServiceProxy.deleteUser(user.id)
    //                    .subscribe(() => {
    //                        this.getUsers();
    //                        this.notify.success(this.l('SuccessfullyDeleted'));
    //                    });
    //            }
    //        }
    //    );
    //}



    toggleSideBars(id: string): void {
        $('#' + id).toggle(200, "linear");
    }

    updateFilterForRole(role: any): void {
        var index = this.filter.roles.findIndex(function (obj) {
            return obj.id == role.id;
        })
        this.filter.roles[index].selected = false;
        this._commonFilterDataService.set(this.filter);
        this.filterUserComponent.updateFilterFromParent();
        this.getUsers();
    }

    updateFilterForDate(): void {
        this.filter.startDate = undefined;
        this.filter.endDate = undefined;
        this._commonFilterDataService.set(this.filter);
        this.filterUserComponent.updateFilterFromParent();
        this.getUsers();
    }

    addUser(id: string): void {
        this.createOrEditUserComponent.addUser(id);
    }

    resetEditableRow() {
        if (this.tempUser) {
            this.tempUser.isEditing = false;
            this.tempUser = null;
        }
    }
}