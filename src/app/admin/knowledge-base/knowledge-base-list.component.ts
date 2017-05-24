import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { KnowledgeBaseAddComponent } from './knowledge-base-add.component'


@Component({
    templateUrl: "./knowledge-base-list.component.html",
    animations: [appModuleAnimation()]
})
export class KnowledgeBaseListComponent extends AppComponentBase {

    @ViewChild('knowledgeBaseAdd') knowledgeBaseAdd: KnowledgeBaseAddComponent
    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    toggleSideBars(id: string): void {
        $('#' + id).toggle(200, "linear");
    }

    showAddKnowledgeBase() {
        this.knowledgeBaseAdd.showAddKnowledgeBase();
    }
}