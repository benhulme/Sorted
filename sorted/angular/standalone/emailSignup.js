'use strict';

$(document).ready(function(){

  function attemptSubmit(event) {

    event.preventDefault();


    var email = {
      email: $(document).find('.email-signup-input').val()
    };

    if (validateEmail(email) === true) {

      var request = $.ajax({
        type: 'POST',
        url: '/api/v0.1/collector/email',
        data: JSON.stringify(email),
        dataType: 'application/json',
      });

      request.done(function(data){
        console.log('success', data);
        showSuccess();

      });

      request.fail(function(jqXHR, textStatus){
        console.error('fail');
        console.error(jqXHR, textStatus);
        showSuccess();
      });

    }

  }

  function showSuccess() {
    $(document).find('.email-signup-start').fadeOut(function(){
      $(document).find('.email-signup-success').fadeIn();
    });
  }

  function validateEmail(email) {
    var EMAIL_REGEXP = /^[a-zA-Z0-9.+_-]+@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    var isValid = EMAIL_REGEXP.test(email.email);

    if (isValid) {
      $(document).find('.email-signup-input').removeClass('form-input-error');
    } else {
      $(document).find('.email-signup-input').addClass('form-input-error');
    }

    return isValid;
  }

  $(document).on('submit', '.email-signup-form', attemptSubmit);

});
