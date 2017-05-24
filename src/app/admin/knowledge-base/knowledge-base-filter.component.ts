import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    templateUrl: "./knowledge-base-filter.component.html",
    selector: 'knowlegdeBaseFilter'
})
export class KnowledgeBaseFilterComponent extends AppComponentBase {

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    toggleSideBars(id: string): void {
        $('#' + id).toggle(200, "linear");
    }
}