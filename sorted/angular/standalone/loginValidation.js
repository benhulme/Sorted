/**
 * Created by stanislavk on 29/02/2016.
 */
'use strict';

  $(document).ready(function(){

    var form;






    var signinValidation = function(){

      form =  $('#login-form').validate({
        rules:{
          Email: {
            required: true,
            email: true
          },
          Password: {
            required: true,
            password: false
          }

        },
        messages:{
          Email: {
            required: 'Please enter a valid email',
            email: 'Please enter a valid email',
          },
          Password:  'Incorrect email address or password <br> Are you trying to '+'<a  data-dismiss="modal" data-toggle="modal" data-target="#signup-modal" >register</a> '+ 'for a new account?'

        },
        submitHandler: function(form,event){
          event.preventDefault();

          var form = $(form);
          var postData = {
            "Email": form.find('[name="Email"]').val(),
            "Password": form.find('[name="Password"]').val(),
            "Remember": form.find('[name="Remember"]').val()
          };



          $.ajax({
            type: "POST",
            dataType: "json",
            headers: {
              'X-Csrf-Token': window.$_gah2Anoh
            },
            url: "/api/v0.1/profile/login",
            data: postData,
            success: function (data) {
              if(data.success==='false'){
                $('#Password-error').show();
                $('#login-form').find('[name="Password"]').addClass('error').attr('aria-invalid','true').after('<label class="error" id="Password-error">Incorrect email address or password <br> Are you trying to '+'<a  data-dismiss="modal" data-toggle="modal" data-target="#signup-modal">register</a> '+ 'for a new account?</label>');
              }else{
                $('#login-modal').modal('hide');
                loginProfile();
              }



            }
          });
          return false;
        }
      });

    };


    var waitForElem = setInterval(function(){
      if($('#login-modal').length){
        $('#login-modal').on('shown.bs.modal',function(){
          signinValidation();
        });
        $('#login-modal').on('hiden.bs.modal', function(){
          form.resetForm();
        });

      }
    },100);

  })
