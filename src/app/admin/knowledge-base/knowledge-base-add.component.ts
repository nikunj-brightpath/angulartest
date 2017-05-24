import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { KnowledgeBaseServiceProxy, CreateAppInput, CreateAppOutput } from '@shared/service-proxies/service-proxies';
import { NgForm } from '@angular/forms';
import { ConfirmModalComponent } from "@app/shared/confirm-modal/confirm-modal.component";


@Component({
    templateUrl: "./knowledge-base-add.component.html",
    selector: 'knowlegdeBaseAdd'
})
export class KnowledgeBaseAddComponent extends AppComponentBase {

    @ViewChild('knowledgeBaseForm') knowledgeBaseAddForm: NgForm
    @ViewChild('confirmModalComponent') confirmModalComponent: ConfirmModalComponent

    saving: boolean = false;
    model: CreateAppInput = new CreateAppInput();
    constructor(
        injector: Injector,
        private _knowledgeBaseServiceProxy: KnowledgeBaseServiceProxy,
        private _router: Router
    ) {
        super(injector);

    }

    toggleSideBars(id: string): void {
        $('#' + id).toggle(200, "linear");
    }

    save() {
        this.model.description = "savvy support app";
        this.model.culture = "en-us";
        this.model.subKey = "2ee262003e8a4a949106c731dbdb938f";
        this.saving = true;
        this._knowledgeBaseServiceProxy.createApp(this.model)
            .finally(() => {
                this.saving = false;
                this.model = new CreateAppInput();
            })
            .subscribe((data: CreateAppOutput) => {
                this._router.navigateByUrl('app/admin/answers/' + data.appid);
            });
    }

    showAddKnowledgeBase() {
        this.model = new CreateAppInput();
        $('#qrtKnldgeBase').toggle(200, "linear");
        this.knowledgeBaseAddForm.reset();
    }

    confirmCloseKnowledgeBase() {
        if (!this.knowledgeBaseAddForm.dirty) {
            this.knowledgeBaseAddForm.reset();
            $('#qrtKnldgeBase').toggle(200, "linear");
            return;
        }

        this.confirmModalComponent.showModal();
    }


    closeAddKnowledgeBase() {
        this.knowledgeBaseAddForm.reset();
        $('#qrtKnldgeBase').toggle(200, "linear");
    }


}