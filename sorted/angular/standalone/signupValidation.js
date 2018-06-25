/**
 * Created by stanislavk on 25/02/2016.
 */
'use strict';



$(document).ready(function () {




  var form;



  jQuery.validator.addMethod("ajaxEmail", function(value) {
    var response = true,
      message = {
        Email: value
      };



    $.ajax({
      type: "POST",
      url: "/api/v0.1/profile/checkemail",
      data: message,
      async: false,
      success: function (data) {
        if(data.success==="true"){

          response = true;

        }else{
       response = false;
        }
      }
    });

    return response;

  }, 'This email address is already being used. Do you want to '+'<a  data-dismiss="modal" data-toggle="modal" data-target="#login-modal" >log in</a>'+ ' or '+ '<a href="/Security/lostpassword">reset your password?</a>');




  var signUpValidation = function(){


    var today = new Date();
    form =  $('#signup').validate({
      rules:{
        Email:{
          required: true,
          email: true,
          maxlength : 256,
          ajaxEmail:true
        },
        FirstName: {
          required : true,
          maxlength: 25
        },
        Surname: {
          required : true,
          maxlength: 25
        },
        MobilPhone:{
          minlength: 7,
          maxlength: 15,
          digits: true
        },
        Password:{
          password: true

        },
        Confirm_password:{
          password: false,
          required: true,
          minlength: 8,
          maxlength: 100,
          equalTo: '#Password'

        },
        month:{
          required: true
        },
        year: {
          required: true,
          range: [1900, today.getFullYear()]
        },
        conditions: 'required'
      },
      messages:{
        Email: {
          email:'Enter a valid email address',
          required: 'Email is required'
        },
        Confirm_password: 'Passwords do not match',
        FirstName: 'First name is required',
        Surname: 'Last name is required',
        year: 'Please enter a valid birthdate',
        month: 'Please select a month',
        conditions: 'Agree to Sorted’s terms & condition required'
      },
      submitHandler: function(form,event){
        event.preventDefault();

        var form = $(form);
        var postData = {
          "FirstName": form.find('[name="FirstName"]').val(),
          "Surname": form.find('[name="Surname"]').val(),
          "Password": form.find('[name="Password"]').val(),
          "Email": form.find('[name="Email"]').val(),
          "MobilePhone": form.find('[name="MobilPhone"]').val(),
          "Subscription": form.find('[name="Subscription"]').prop("checked") ,
          "BirthDate": form.find('[name="year"]').val()+'-'+form.find('[name="month"]').val()+'-01'


        },
          loginData = {
            "Email": form.find('[name="Email"]').val(),
            "Password": form.find('[name="Password"]').val()

          };



        $.ajax({
          type: "POST",
          dataType: "json",
          headers: {
            'X-Csrf-Token': window.$_gah2Anoh
          },
          url: "/api/v0.1/profile/save",
          data: JSON.stringify(postData),
          async: false,
          success: function () {
            $('#signup-modal').modal('hide');

          },
          complete: function(){
            $.ajax({
              type: "POST",
              headers: {
                'X-Csrf-Token': window.$_gah2Anoh
              },
              dataType: "json",
              url: "/api/v0.1/profile/login",
              data: loginData,
              async:false,
              success: function () {

                  $('.modal-backdrop').remove();
                  $('body').removeClass('modal-open');
                  window.open(window.location.origin+'#/check-email','_blank');
                  loginProfile();

              }
            });
          }
        });
        return false;
      }
    });

  };


  $.validator.passwordRating.messages = {
    "too-short": "Password should be at least 8 symbols",
    "weak": "<p class='password-error'>Password must be at least 8 characters long and contain three of the following: capital letter, lowercase letter, number, punctuation mark or a special character(e.g. $&*!@#)</p><div class='password-bullet red'></div><div class='password-bullet'></div><div class='password-bullet'></div> <span class='font-xs'>Weak</span>",
    "good": "<div class='password-bullet yellow'></div><div class='password-bullet yellow'></div><div class='password-bullet '></div> <span class='font-xs'>Good</span>",
    "strong": "<div class='password-bullet green'></div><div class='password-bullet green'></div><div class='password-bullet green'></div> <span class='font-xs'>Strong</span>"
  };





  var waitForElem = setInterval(function(){
    if($('#signup-modal').length){
      $('#signup-modal').on('shown.bs.modal',function(){
        signUpValidation();
      });
      $('#signup-modal').on('hiden.bs.modal', function(){
        form.resetForm();
      });

    }
  },100);




});

