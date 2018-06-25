
/**
 * Created by stanislavk on 25/02/2016.
 */
'use strict';



$(document).ready(function () {


  $('#ChangePasswordForm_ChangePasswordForm_NewPassword1').after('<div class="password-meter"><div class="password-meter-message "><div class="password-bullet"></div><div class="password-bullet"></div><div class="password-bullet"></div></div></div>');

    $('#ChangePasswordForm_ChangePasswordForm')

      .validate({
      rules:{
        OldPassword:{
          password: false
        },
        NewPassword1:{
          password: true
        },
        NewPassword2:{
          password: false,
          required: true,
          minlength: 8,
          maxlength: 100,
          equalTo: '#ChangePasswordForm_ChangePasswordForm_NewPassword1'

        }

      },
      messages:{
        Confirm_password: 'Passwords do not match'
      }

    });






});

