import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule, TabsModule, TooltipModule } from 'ng2-bootstrap';
import { FileUploadModule } from '@node_modules/ng2-file-upload';

import { AdminRoutingModule } from './admin-routing.module'
import { UtilsModule } from '@shared/utils/utils.module'
import { AppCommonModule } from '@app/shared/common/app-common.module'

import { UsersComponent } from './users/users.component'
import { PermissionComboComponent } from './shared/permission-combo.component';
import { RoleComboComponent } from './shared/role-combo.component';
import { CreateOrEditUserModalComponent } from './users/create-or-edit-user-modal.component';
import { CreateOrEditUserComponent } from "./users/create-or-edit-user.component";
import { FilterUserComponent } from "./users/filter-users.component";


import { EditUserPermissionsModalComponent } from './users/edit-user-permissions-modal.component';

import { PermissionTreeComponent } from './shared/permission-tree.component';
import { FeatureTreeComponent } from './shared/feature-tree.component';

import { RolesComponent } from './roles/roles.component'
import { CreateOrEditRoleModalComponent } from './roles/create-or-edit-role-modal.component'

import { AuditLogsComponent } from './audit-logs/audit-logs.component'
import { AuditLogDetailModalComponent } from './audit-logs/audit-log-detail-modal.component'

import { HostSettingsComponent } from './settings/host-settings.component'
import { MaintenanceComponent } from './maintenance/maintenance.component'
import { EditionsComponent } from './editions/editions.component'
import { CreateOrEditEditionModalComponent } from './editions/create-or-edit-edition-modal.component'
import { ImpersonationService } from './users/impersonation.service';
import { CommonFilterDataService } from './users/common-filter-data-service'
import { LanguagesComponent } from './languages/languages.component';
import { LanguageTextsComponent } from './languages/language-texts.component';
import { CreateOrEditLanguageModalComponent } from './languages/create-or-edit-language-modal.component';
import { TenantsComponent } from './tenants/tenants.component'
import { CreateTenantModalComponent } from './tenants/create-tenant-modal.component'
import { EditTenantModalComponent } from './tenants/edit-tenant-modal.component'
import { TenantFeaturesModalComponent } from './tenants/tenant-features-modal.component'
import { EditTextModalComponent } from './languages/edit-text-modal.component';
import { OrganizationUnitsComponent } from './organization-units/organization-units.component';
import { OrganizationTreeComponent } from './organization-units/organization-tree.component';
import { OrganizationUnitMembersComponent } from './organization-units/organization-unit-members.component';
import { CreateOrEditUnitModalComponent } from './organization-units/create-or-edit-unit-modal.component';
import { TenantSettingsComponent } from './settings/tenant-settings.component';
import { KnowledgeBaseListComponent } from './knowledge-base/knowledge-base-list.component';
import { KnowledgeBaseAddComponent } from './knowledge-base/knowledge-base-add.component';
import { KnowledgeBaseFilterComponent } from './knowledge-base/knowledge-base-filter.component';
import { AnswerListComponent } from './knowledge-base/answer-list.component';
import { AnswerAddComponent } from './knowledge-base/answer-add.component';
import { AnswerImportComponent } from './knowledge-base/answer-import.component';
//import { PopoverModule } from 'ng2-bootstrap';

import { PipeSelected } from './users/role-tag-pipe';
import { SimpleTinyComponent } from '@app/shared/tiny-mce/tiny-mce.component';
import { ConfirmModalComponent } from '@app/shared/confirm-modal/confirm-modal.component';
import { CustomizeWidgetComponent } from './customize-widget/customize-widget.component';

import { OpenSidebarDirective } from '@app/shared/common-directives/common-directives';
import { TopSearchDirective } from '@app/shared/common-directives/common-directives';
import { NotificationDirective } from "@app/shared/common-directives/common-directives";



@NgModule({
    imports: [
        FormsModule,
        CommonModule,

        FileUploadModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),

        AdminRoutingModule,
        UtilsModule,
        AppCommonModule,
        ReactiveFormsModule,
       
        //  PopoverModule.forRoot()
    ],
    declarations: [
        UsersComponent,
        PermissionComboComponent,
        RoleComboComponent,
        CreateOrEditUserModalComponent,
        EditUserPermissionsModalComponent,
        PermissionTreeComponent,
        FeatureTreeComponent,
        RolesComponent,
        CreateOrEditRoleModalComponent,
        AuditLogsComponent,
        AuditLogDetailModalComponent,
        HostSettingsComponent,
        MaintenanceComponent,
        EditionsComponent,
        CreateOrEditEditionModalComponent,
        LanguagesComponent,
        LanguageTextsComponent,
        CreateOrEditLanguageModalComponent,
        TenantsComponent,
        CreateTenantModalComponent,
        EditTenantModalComponent,
        TenantFeaturesModalComponent,
        CreateOrEditLanguageModalComponent,
        EditTextModalComponent,
        OrganizationUnitsComponent,
        OrganizationTreeComponent,
        OrganizationUnitMembersComponent,
        CreateOrEditUnitModalComponent,
        TenantSettingsComponent,
        CreateOrEditUserComponent,
        FilterUserComponent,
        PipeSelected,
        KnowledgeBaseListComponent,
        KnowledgeBaseAddComponent,
        KnowledgeBaseFilterComponent,
        AnswerListComponent,
        AnswerAddComponent,
        AnswerImportComponent,
        SimpleTinyComponent,
        ConfirmModalComponent,
        CustomizeWidgetComponent,
        OpenSidebarDirective,
        NotificationDirective
    ],
    providers: [
        ImpersonationService,
        CommonFilterDataService
    ]
})
export class AdminModule { }