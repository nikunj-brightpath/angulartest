/* - Filter Modal */	    
$('.modal').on('shown.bs.modal', function (e) {
  	$('.modal-backdrop').removeClass("modal-backdrop");    
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

 /* show more */
 $(document).ready(function() {
	        
    try {
	    var showChar = 190;
	    var ellipsestext = "...";
	    var moretext = "Read more >";
	    var lesstext = "Read less ";

	    $('.seemore').each(function() {
	        var content = $(this).html();
	 
	        if(content.length > showChar) {
	 
	            var c = content.substr(0, showChar);
	            var h = content.substr(showChar, content.length - showChar);
	 
	            var html = c + '<span class="seemoreellipses">' + ellipsestext + '&nbsp;</span><span class="seemorecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="javascript:void(0);" class="seemorelink">' + moretext + '</a></span>';
	 
	            $(this).html(html);
	        }
	 
	    });
	 
	    $(".seemorelink").click(function(){
	        if($(this).hasClass("less")) {
	            $(this).removeClass("less");
	            $(this).html(moretext);
	        } else {
	            $(this).addClass("less");
	            $(this).html(lesstext);
	        }
	        $(this).parent().prev().toggle();
	        $(this).prev().toggle();
	        return false;
	    });
	}
	catch(e) {
		//silence is good
	}
}),



$(document).ready(function() {
    
/** Notifications for create user*/
function notify(from, align, icon, type, animIn, animOut){
    $.growl({
        icon: icon,
        title: ' The Knowledge base ',
        message: ' VineForce is created successfully!',
        url: ''
    },{
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
        animate: {
            enter: animIn,
            exit: animOut
        },
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

$('.create-alert').click(function(e){
    e.preventDefault();
    var nFrom = $(this).attr('data-from');
    var nAlign = $(this).attr('data-align');
    var nIcons = $(this).attr('data-icon');
    var nType = $(this).attr('data-type');
    var nAnimIn = $(this).attr('data-animation-in');
    var nAnimOut = $(this).attr('data-animation-out');
    notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);
});

/* dialog sweet aler */


	//Delete Answer
	$('#kb-deletekb').click(function(){
	    swal({
	        title: "Are you sure?",
	        text: "This will permanently delete the KB and its associated answers.",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonClass: "palette-purplec-400 bg",
	        confirmButtonColor: "#8a82d6",
	        confirmButtonText: "Yes",
	        cancelButtonText: "No",
	        closeOnConfirm: false,
	        closeOnCancel: false
	    }, function(isConfirm){
	        if (isConfirm) {
	            swal("Deleted", "Your Knowledge Base  has been deleted!", "success");
	        } else {
	            swal("Cancelled", "Your Knowledge Base is safe!", "error");
	        }
	    });
	});

	//Update Edit Answer
	$('#kb-editkb').click(function(){
	    swal({
	        title: "Are you sure?",
	        text: "This will change the name of your Knowledge Base.",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonClass: "palette-purplec-400 bg",
	        confirmButtonColor: "#8a82d6",
	        confirmButtonText: "Yes",
	        cancelButtonText: "No",
	        closeOnConfirm: false,
	        closeOnCancel: false
	    }, function(isConfirm){
	        if (isConfirm) {
	            swal("Updated", "Your Knowledge Base  name has been updated!", "success");
	        } else {
	            swal("Cancelled", "Your Knowledge Base  name is safe!", "error");
	        }
	    });
	});
	//Update answer
	$('#kb-updateanswer').click(function(){
	    swal({
	        title: "Are you sure?",
	        text: "This will change the details of your question and/or answer!",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonClass: "palette-purplec-400 bg",
	        confirmButtonColor: "#8a82d6",
	        confirmButtonText: "Yes",
	        cancelButtonText: "No",
	        closeOnConfirm: false,
	        closeOnCancel: false
	    }, function(isConfirm){
	        if (isConfirm) {
	            swal("Updated", "Your question and/or answer has been updated!", "success");
	        } else {
	            swal("Cancelled", "Your question ad/or answer is safe!", "error");
	        }
	    });
	});
	//Delete Answer
	$('#kb-deleteanswer').click(function(){
	    swal({
	        title: "Are you sure?",
	        text: "This will permanently delete this answer!",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonClass: "palette-purplec-400 bg",
	        confirmButtonColor: "#8a82d6",
	        confirmButtonText: "Yes",
	        cancelButtonText: "No",
	        closeOnConfirm: false,
	        closeOnCancel: false
	    }, function(isConfirm){
	        if (isConfirm) {
	            swal("Deleted", "Your answer  has been deleted!", "success");
	        } else {
	            swal("Cancelled", "Your answer  is safe!", "error");
	        }
	    });
	});

});






 /* sidebar modal */

 /*Js for add knowledge base callout*/
// $(document).ready(function () {
//     $('body').on('click', '[data-ma-action]', function (e) {
//         e.preventDefault();
        
//         var action = $(this).data('ma-action');
//         var $this = $(this);
        
//         switch (action) {
            
//             /* Open Sidebar */
//             case 'sidebar-open':
                
//                 var target = $(this).data('ma-target');
//                 $this.addClass('toggled');
//                 $('#main').append('<div data-ma-action="sidebar-close" class="sidebar-backdrop animated fadeIn" />')
                
//                 if (target == 'add-knowledgeBase') {
//                     $('#s-add-kb').addClass('toggled');
//                 }
//                 if (target == 'add-answer-callout') {
//                     $('#s-add-answer').addClass('toggled');
//                 }
//                 $('body').addClass('o-hidden');
                
//                 break;
            
//             /* Close Sidebar */
//             case 'sidebar-close':
                
//                 $('[data-ma-action="sidebar-open"]').removeClass('toggled');
//                 $('.sidebar').removeClass('toggled');
//                 $('.sidebar-backdrop').remove();
//                 $('body').removeClass('o-hidden');
                
//                 break;
//         }
//     }); 
// });
/*Js for add knowledge base callout*/
$(document).ready(function () {
    $('body').on('click', '[data-ma-action]', function (e) {
        e.preventDefault();
        
        var action = $(this).data('ma-action');
        var $this = $(this);
        
        switch (action) {
            
            /*-------------------------------------------
                Mainmenu and Notifications open/close
            ---------------------------------------------*/
            
            /* Open Sidebar */
            case 'sidebar-open':
                
                var target = $(this).data('ma-target');

                $this.addClass('toggled');
                $('#main').append('<div data-ma-action="sidebar-close" class="sidebar-backdrop animated fadeIn" />')
                
                if (target == 'main-menu') {
                    $('#s-main-menu').addClass('toggled');
                }
                if (target == 'user-alerts') {
                    $('#s-user-alerts').addClass('toggled');
                }
                if (target == 'add-knowledgeBase') {
                    $('#s-add-kb').addClass('toggled');
                }
                if (target == 'edit-knowledgeBase') {
                    $('#s-edit-kb').addClass('toggled');
                }
                if (target == 'Get-knowledgeWidgetCode') {
                    $('#s-knowledgeWidgetCode-kb').addClass('toggled');
                }
                if (target == 'add-knowledgeBaseAnswer') {
                    $('#s-add-answer').addClass('toggled');
                }
                if (target == 'edit-knowledgeBaseAnswer') {
                    $('#s-edit-answer').addClass('toggled');
                }
                if (target == 'Kb-CustomizeWidget') {
                    $('#s-customizewidget-kb').addClass('toggled');
                }

                $('body').addClass('o-hidden');
                
                break;
        }
    }); 
});


/* text editor */
$(".html-editor").summernote({
    height: 300,
    toolbar: [
        [ 'para', [ 'ol', 'ul' ] ],
        [ 'style', [ 'style' ] ],
        [ 'font', [ 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear'] ],
    ],                 
});

/* Collapse */
 $('.kb-grid-answer-List .media-body > a').on('click',function(e) {
 	$obj = $(this);
     if(!$(this).parents('.media').children('.collapse').hasClass('in')){
        console.log('aaa');
        $('.kb-grid-answer-List .media-body .ans').show();
        $(this).parents('.media').find('.media-body .ans').hide();
    }
    else {
    	$(this).parents('.media').find('.media-body .ans').show();	
    }
    // You can also add preventDefault to remove the anchor behavior that makes
    // the page jump
//     // e.preventDefault();
});

/* Add Alternate Questions*/
$('#add-questbtn').click(function(){
    $('#addNewQuestion').toggleClass('hidden');
    $('#add-questbtn').addClass('hidden');
});
$('.save-QuestBtn').click(function(){
     $('.question-list').append('<li class="f-16 lgi-text text p-l-15"> How to file a state return? <button type="button" class="close palette-purplec-400 text"><span aria-hidden="true">×</span></button></li>')
});

/* Callout scroller */
$(document).ready(function(){
 chatBar();
 $(window).scroll(function(){
 chatBar();
 });
});
function chatBar(){
 var header = 77; // Header area Height
 var footer = 78; // Footer Area Height 
 var calculateboth= header + footer;
 var windowHeight = $(window).height();  // Calculate Window Height(Viewport)
 var actualheight = windowHeight - calculateboth;
 //console.log(windowHeight + '-' +  actualheight);
 $('#card-scroller .scroller').css({ height: windowHeight - calculateboth })
}
 




