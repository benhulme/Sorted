'use strict';

$(document).ready(function() {

	var onFormSuccess,
		navHeight = $('.nav-sticky').height() + 35; //25 is the top padding of form container

	onFormSuccess = function(el){
      if(el.children('#Form_DrawForm_error').hasClass('good')) {
        $('html, body').animate({scrollTop:$('#draw-form-container').position().top - navHeight });
        el.find('fieldset, .Actions').hide();
       	$('#draw-form-container h2').hide();
      }
    };

    onFormSuccess($('#Form_DrawForm'));

    if($('#Form_DrawForm_acceptance_Holder .message').hasClass('required')){
       $('#Form_DrawForm_acceptance_Holder .message').html('Agree to Sorted’s terms & condition required');
      $('html, body').animate({scrollTop:$('#draw-form-container').position().top - navHeight });
    }

    if($('#draw-form-container').hasClass('already-entered') && $('#Form_DrawForm_error:hidden')){
        $('#Form_DrawForm_error').addClass('good');
        $('#Form_DrawForm_error').show().html("You're in the draw!");
    }

});
