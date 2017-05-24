import { Component, Injector, OnInit, ViewChild, Output, EventEmitter } from '@angular/core'
import { AppComponentBase, } from '@shared/common/app-component-base';
import { RoleServiceProxy, RoleListDto } from "@shared/service-proxies/service-proxies";

import { UserEditDto, CreateOrUpdateUserInput, UserServiceProxy, UserRoleDto } from "@shared/service-proxies/service-proxies";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationDirective } from "@app/shared/common-directives/common-directives";


@Component({
    selector: 'createOrEditUserComponent',
    templateUrl: './create-or-edit-user.component.html'
})
export class CreateOrEditUserComponent extends AppComponentBase implements OnInit {


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() resetEditableRow: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('notificationDirective') notificationDirective: NotificationDirective;

    user: UserEditDto = new UserEditDto();
    roles: any[];
    selectRoleNmae: string = "Agent";
    userForm: FormGroup;
    constructor(injector: Injector,
        private _userService: UserServiceProxy,
        private fb: FormBuilder,
        private _roleServiceProxy: RoleServiceProxy,

    ) {
        super(injector);


    }
    saving: boolean = false;
    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {
            [key: string]: any
        } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value && !this.user.id) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

    ngOnInit() {
        this.userForm = this.fb.group({
            'name': [null, Validators.required],
            'surname': [null, Validators.required],
            'emailAddress': [null, [Validators.required, Validators.email]],
            'password': [null, []],
            'confirmPassword': [null, []]
        }, { validator: this.matchingPasswords('password', 'confirmPassword') }
        );

        this._roleServiceProxy.getRoles("")
            .subscribe(result => {
                this.roles = result.items.filter(item => item.displayName == 'Admin' || item.displayName == 'Agent');
            })
    }


    save(isAddMore: boolean): void {
        this.saving = true;
        var input = new CreateOrUpdateUserInput();

        input.user = this.user;
        input.setRandomPassword = false;
        input.sendActivationEmail = false;
        input.user.isActive = true;

        input.user.shouldChangePasswordOnNextLogin = false;
        input.user.isTwoFactorEnabled = false;
        input.user.isLockoutEnabled = false;
        input.user.userName = this.user.emailAddress;
        input.assignedRoleNames = [this.selectRoleNmae];

        this.saving = true;
        this._userService.createOrUpdateUser(input)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.modalSave.emit(null);
                this.user = new UserEditDto();
                this.selectRoleNmae = "Agent";
                this.userForm.reset()
                this.resetEditableRow.emit(null);
                isAddMore ? '' : this.toggleSideBars('qrtAddUser');
            });
    }
    //close(): void {
    //    this.modal.hide();
    //}

    getUserById(userId?: number): void {
        this.saving = true;
        this.userForm.get('password').clearValidators();
        this.userForm.get('confirmPassword').clearValidators();
        this.user = new UserEditDto();
        this.userForm.reset();
        this.user.id = userId;
        this._userService.getUserForEdit(userId).finally(() => { this.saving = false; }).subscribe(result => {
            this.user = result.user;
            let roles = result.roles;
            let assignedRole = roles.filter(item => item.isAssigned)[0];
            this.selectRoleNmae = assignedRole.roleName;

        });
    }

    toggleSideBars(id: string): void {
        $('#' + id).toggle(200, "linear");
        this.resetEditableRow.emit(null);
    }

    addUser(id: string) {
        this.user = new UserEditDto();
        this.userForm.reset()
        this.toggleSideBars('qrtAddUser');
        this.userForm.get('password').setValidators([Validators.required]);
        this.userForm.get('confirmPassword').setValidators([Validators.required]);
    }

    testGrowl() {
        this.notificationDirective.showNotify('user updated successfully');
    }

}