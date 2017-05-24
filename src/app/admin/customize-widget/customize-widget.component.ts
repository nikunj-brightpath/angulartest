import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';


@Component({
    templateUrl: "./customize-widget.component.html"
})
export class CustomizeWidgetComponent extends AppComponentBase {

    constructor(
        injector: Injector) {
        super(injector);

    }
}