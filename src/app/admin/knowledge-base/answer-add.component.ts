import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { CreateIntentInput, IntentServiceProxy } from '@shared/service-proxies/service-proxies';
import { NgForm, FormControl, AbstractControl } from '@angular/forms'
import { SimpleTinyComponent } from "@app/shared/tiny-mce/tiny-mce.component";

@Component({
    templateUrl: "./answer-add.component.html",
    selector: 'answerAddComponent'
})
export class AnswerAddComponent extends AppComponentBase implements OnInit {

    @ViewChild('answerAddForm') answerAddForm: NgForm;

    @ViewChild('simpleTiny') tinyMce: SimpleTinyComponent;

    emptyTinyMce

    createIntentInput: CreateIntentInput = new CreateIntentInput();
    appId: string;
    saving: boolean = false;
    tinyMceContent: string;
    isTinyMceFocused: boolean = false;
    constructor(
        injector: Injector,
        private activatedRoute: ActivatedRoute,
        private intentServiceProxy: IntentServiceProxy
    ) {
        super(injector);

    }

    toggleSideBars(id: string): void {
        $('#' + id).toggle(200, "linear");

    }

    ngOnInit() {
        this.setAppId();
    }

    setAppId() {
        this.activatedRoute
            .params
            .subscribe(params => {
                this.appId = params['appId'];
            });
    }

    setTinyMceContent(content) {
        this.createIntentInput.answer = content;
    }

    setTinyMceFocused() {
        this.isTinyMceFocused = true;
    }

    saveAnswers(isAddMore: boolean) {
        this.createIntentInput.name = Math.random().toString();
        this.createIntentInput.appId = this.appId;
        this.createIntentInput.subKey = "2ee262003e8a4a949106c731dbdb938f";
        this.saving = true;
        this.intentServiceProxy.createIntent(this.createIntentInput)
            .finally(() => {
                this.saving = false;
            })
            .subscribe((data) => {
                console.log(data);
                this.createIntentInput = new CreateIntentInput();
                isAddMore ? '' : this.toggleSideBars('qrtKnldgeBaseAddAns');
                this.notify.success("Your answer has been added successfully!");
                this.resetForm();
            })
    }

    resetForm() {
        this.answerAddForm.resetForm();
        this.isTinyMceFocused = false;
        this.tinyMce.emptyTinyMce();
    }
}