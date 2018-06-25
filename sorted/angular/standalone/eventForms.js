/**
 * Created by stanislavk on 27/07/2016.
 */
(function(){
  $(document).ready(function(){


    var public_name = $('#Form_PublicEventForm_FullName')[0].value,
      public_company = $('#Form_PublicEventForm_Company')[0].value,
      public_email = $('#Form_PublicEventForm_Email')[0].value,
      public_fb_event = $('#Form_PublicEventForm_FBEventUrl')[0].value,
      private_name = $('#Form_PrivateEventForm_FullName')[0].value,
      private_company = $('#Form_PrivateEventForm_Company')[0].value,
      private_email = $('#Form_PrivateEventForm_Email')[0].value;
    if( public_name!=='' || public_company!=='' || public_email!=='' || public_fb_event!==''){
      $('html, body').animate({
        scrollTop: $("#Form_PublicEventForm").offset().top-130
      }, 1000);
    }


    if( private_name!=='' || private_company!=='' || private_email!==''){
      $('html, body').animate({
        scrollTop: $("#Form_PrivateEventForm").offset().top-100
      }, 1000);
    }


    if($('#Form_PublicEventForm_error').is(':visible')){
      $('#Form_PublicEventForm fieldset').hide();
      $('#Form_PublicEventForm .Actions').hide();

      $('html, body').animate({
        scrollTop: $('#Form_PublicEventForm_error').offset().top-130
      }, 1000);
    }


    if($('#Form_PrivateEventForm_error').is(':visible')){
      $('#Form_PrivateEventForm fieldset').hide();
      $('#Form_PrivateEventForm .Actions').hide();
      $('html, body').animate({
        scrollTop: $('#Form_PrivateEventForm_error').offset().top-130
      }, 1000);
    }


  })
})()
