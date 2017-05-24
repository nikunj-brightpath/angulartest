import { Component, Input, Output, EventEmitter } from '@angular/core';
declare var tinymce: any;

@Component({
    selector: 'confirmModalComponent',
    templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
    @Input() headerText;
    @Input() message;
    @Input() yesText;
    @Input() noText;
    @Input() modalId;

    @Output() confirmed: EventEmitter<any> = new EventEmitter<any>();

    confirm() {
        this.confirmed.emit();
        this.closeModal();
    }

    closeModal() {
        $("#" + this.modalId).modal("hide");
    }

    showModal() {
        $("#" + this.modalId).modal("show");
    }

}