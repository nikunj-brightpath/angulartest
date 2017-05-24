import { HostListener, Directive, ElementRef, Renderer, Input, OnInit, Component } from '@angular/core';

@Directive({
    selector: `[floatingLabel]`
})
export class FloatingLabelDirective {

    constructor(private el: ElementRef, private renderer: Renderer) {
        $(this.el.nativeElement).val() == "" ? "" : $(this.el.nativeElement).closest('.fg-line').addClass('fg-toggled');;
    }

    @HostListener('focus', ['$event'])
    floatingLabelOnFocus(event: Event) {
        $(this.el.nativeElement).closest('.fg-line').addClass('fg-toggled');
    }

    @HostListener('blur', ['$event'])
    floatingLabelOnBlur(event: Event) {
        var p = $(this.el.nativeElement).closest('.form-group, .input-group');
        var i = p.find('.form-control').val();

        if (p.hasClass('fg-float')) {
            if (i.length == 0) {
                $(this.el.nativeElement).closest('.fg-line').removeClass('fg-toggled');
            }
        }
        else {
            $(this.el.nativeElement).closest('.fg-line').removeClass('fg-toggled');
        }
    }
}
declare var Waves: any;

@Directive({
    selector: `[waveBtnRound]`
})
export class WaveButtonRoundDirective implements OnInit {
    @Input() waveBtnRound: boolean;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        // if (this.waveBtnRound == true) {
        //     Waves.attach(this.el.nativeElement, ['waves-circle', 'waves-float']);
        // } else {
        //     Waves.attach(this.el.nativeElement);
        // }
        // Waves.init();
    }
}

@Directive({
    selector: `[animateBlockDirective]`
})
export class AnimateBlockDirective {

    constructor(private el: ElementRef) {
    }

    @HostListener('click', ['$event'])
    openAccountBlock(event: Event) {
        event.preventDefault();

        var z = $(this.el.nativeElement).data('block');
        var t = $(this.el.nativeElement).closest('.l-block');
        var c = $(this.el.nativeElement).data('bg');

        t.removeClass('toggled');

        setTimeout(function () {
            $('.login').attr('data-lbg', c);
            $(z).addClass('toggled');
        });
    }
}

//custom modal
declare var $: any;  //<-- let typescript compiler know your referencing a var that was already declared

@Directive({
    selector: 'scrollbar',
    host: { 'class': 'mCustomScrollbar' },  //<-- Make sure you add the class
})
export class ScrollbarDirective implements OnInit {
    el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }
    ngOnInit() {
        //$(function(){ console.log('Hello'); }); <--TEST JQUERY
        //check if your plugins are loading
        //$().mousewheel) ? console.log('mousewheel loaded') : console.log('mousewheel not loaded');
        //$().mCustomScrollbar) ? console.log('mCustomScrollbar loaded') : console.log('mCustomScrollbar not loaded');

        $(this.el.nativeElement).mCustomScrollbar({
            autoHideScrollbar: false,
            theme: "light",
            advanced: {
                updateOnContentResize: true
            }
        });
    }
}

@Directive({
    selector: `[openSideBar]`,
})
export class OpenSidebarDirective {
    el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    @HostListener('click', ['$event'])
    openSideBar(event: Event) {

        event.preventDefault();

        var action = $(this.el.nativeElement).data('ma-action');
        var $this = $(this.el.nativeElement);

        switch (action) {

            /*-------------------------------------------
            Callout open/close
            ---------------------------------------------*/

            /* Open Sidebar */
            case 'sidebar-open':

                var target = $(this.el.nativeElement).data('ma-target');

                if ($('#main').find('.sidebar-backdrop').length == 0) {
                    $this.addClass('toggled');
                    $('#main').append('<div data-ma-action="sidebar-close" class="sidebar-backdrop animated fadeIn" />')
                }

                if (target == 'main-menu') {
                    $('#s-main-menu').addClass('toggled');
                }
                if (target == 'user-alerts') {
                    $('#s-user-alerts').addClass('toggled');
                }
                if (target == 'add-User') {
                    $('#s-add-user').addClass('toggled');
                }
                if (target == 'edit-User') {
                    $('#s-edit-user').addClass('toggled');
                }
                if (target == 'add-filter') {
                    $('#s-add-filter').addClass('toggled');
                }
                if (target == 'Get-knowledgeWidgetCode') {
                    $('#s-knowledgeWidgetCode-kb').addClass('toggled');
                }
                if (target == 'add-knowledgeBaseAnswer') {
                    $('#s-add-answer').addClass('toggled');
                }
                if (target == 'import-knowledgeBaseAnswer') {
                    $('#s-import-answer').addClass('toggled');
                }
                if (target == 'edit-knowledgeBaseAnswer') {
                    $('#s-edit-answer').addClass('toggled');
                }
                if (target == 'Kb-CustomizeWidget') {
                    $('#s-customizewidget-kb').addClass('toggled');
                }
                if (target == 'Get-previewWidget') {
                    $('#s-previewWidget-kb').addClass('toggled');
                }
                if (target == 'duplicate-QuestAnswer') {
                    $('#s-duplicate-answer').addClass('toggled');
                    $('#s-add-answer').removeClass('toggled');

                }

                $('body').addClass('o-hidden');

                break;
            case 'sidebar-close':
                $('#s-add-user').removeClass('toggled');
                 $('#main').remove('<div data-ma-action="sidebar-close" class="sidebar-backdrop animated fadeIn" />')
                break;
        }
    }
}



@Directive({
    selector: `[topsearch]`,
})
export class TopSearchDirective {
    el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    @HostListener('focus', ['$event'])
    topSearchOnFocus(event: Event) {
        $('.h-search').addClass('focused');
    }

    @HostListener('blur', ['$event'])
    topSearchOnBlur(event: Event) {
        var x = $(this.el.nativeElement).val();

        if (!x) {
            $('.h-search').removeClass('focused');
        }
    }

}

@Component({
    selector: `notify`,
    template: ''
})
export class NotificationDirective {
    @Input() from: String;
    @Input() align: String;
    @Input() icon: String;
    @Input() type: String;
    //  @Input() aniamationIn: String;
    // @Input() aniamationOut: String;


    el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    private notify(from, align, icon, type, message) {
        $.growl({
            icon: icon,
            //title: ' The Knowledge base ',
            message: message,
            url: ''
        }, {
                element: 'body',
                type: type,
                allow_dismiss: true,
                placement: {
                    from: from,
                    align: align
                },
                offset: {
                    x: 30,
                    y: 30
                },
                spacing: 10,
                z_index: 1031,
                delay: 2500,
                timer: 1000,
                url_target: '_blank',
                mouse_over: false,
                // animate: {
                //     enter: animIn,
                //     exit: animOut
                // },
                icon_type: 'class',
                template: '<div data-growl="container" class="alert" role="alert">' +
                '<button type="button" class="close" data-growl="dismiss">' +
                '<span aria-hidden="true">&times;</span>' +
                '<span class="sr-only">Close</span>' +
                '</button>' +
                '<span data-growl="icon"></span>' +
                '<span data-growl="title"></span>' +
                '<span data-growl="message"></span>' +
                '<a href="#" data-growl="url"></a>' +
                '</div>'
            });
    };

    public showNotify(message) {
        // var nFrom = $(this.el.nativeElement).attr('data-from');
        // var nAlign = $(this.el.nativeElement).attr('data-align');
        // var nIcons = $(this.el.nativeElement).attr('data-icon');
        // var nType = $(this.el.nativeElement).attr('data-type');
        // var nAnimIn = $(this.el.nativeElement).attr('data-animation-in');
        // var nAnimOut = $(this.el.nativeElement).attr('data-animation-out');
        this.notify(this.from, this.align, this.icon, this.type, message);
    }
}








