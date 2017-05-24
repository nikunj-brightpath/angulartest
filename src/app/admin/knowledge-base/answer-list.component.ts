import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AnswerAddComponent } from './answer-add.component'

@Component({
    templateUrl: "./answer-list.component.html"
})
export class AnswerListComponent extends AppComponentBase {

    @ViewChild('answerAddComponent') answerAddComponent: AnswerAddComponent;
    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    toggleSideBars(id: string): void {
        $('#' + id).toggle(200, "linear");
        this.answerAddComponent.resetForm();
    }
}