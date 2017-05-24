import { Component, OnDestroy, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
declare var tinymce: any;

@Component({
    selector: 'simple-tiny',
    template: `<textarea id="{{elementId}}"></textarea>`
})
export class SimpleTinyComponent implements AfterViewInit, OnDestroy {
    @Input() elementId: String;
    @Output() onEditorKeyup = new EventEmitter<any>();
    @Output() onEditorFocus = new EventEmitter<any>();

    editor;

    ngAfterViewInit() {
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['link', 'paste', 'table'],
            skin_url: '../../../assets/skins/lightgray',
            menubar: " ",
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.onEditorKeyup.emit(content);
                });

                editor.on('focus', () => {
                    this.onEditorFocus.emit();
                });
            },
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }

    emptyTinyMce() {
        tinymce.get(this.elementId).setContent('');
    }
}