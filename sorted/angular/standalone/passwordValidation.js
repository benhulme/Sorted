/*
 * jQuery validate.password plug-in 1.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validate.password/
 *
 * Depends on validation plugin 1.5+
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * $Id$
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {

  var
    isLowercase = '\(?=.*[a-z])',
    isUppercase = '\(?=.*[A-Z])',
    isDigit =  '\(?=.*[0-9])',
    isSpecial = '\((?=.*[!@#\$%\^&\*])|(?=.*\ ))',
    matches;

  function rating(rate, message) {
    return {
      rate: rate,
      messageKey: message
    };
  }


  $.validator.passwordRating = function(password) {


    var  conditions = [isLowercase,isUppercase,isDigit,isSpecial];
    matches = 0;
    if ( password.length > 7){

      for(var i = 0; i<conditions.length; i++){
        if (password.match(conditions[i])){
          matches ++;
        }
      }

    }

     switch (matches){
       case 0:
       case 1:
        //return rating (1, 'too-short');
        //break;
       case 2:
        return rating(2, "weak");
        break;
       case 3:
        return rating(3, "good");
        break;
       case 4:
        return rating(4, "strong");
        break;
     }

  };

  $.validator.passwordRating.messages = {
    "too-short": "Too short",
    "very-weak": "Very weak",
    "weak": "Weak",
    "good": "Good",
    "strong": "Strong"
  }

  $.validator.addMethod("password", function(value, element, usernameField) {
    // use untrimmed value
    var password = element.value,
    // get username for comparison, if specified
      username = $(typeof usernameField != "boolean" ? usernameField : []);

    var rating = $.validator.passwordRating(password, username.val());
    // update message for this field

    var meter = $(".password-meter", element.form);

    meter.find(".password-meter-bar").removeClass().addClass("password-meter-bar").addClass("password-meter-" + rating.messageKey);
    meter.find(".password-meter-message")
      .removeClass()
      .addClass("password-meter-message")
      .addClass("password-meter-message-" + rating.messageKey)
      .html($.validator.passwordRating.messages[rating.messageKey]);
    // display process bar instead of error message

    return rating.rate > 2;
  }, "&nbsp;");
  // manually add class rule, to make username param optional
  $.validator.classRuleSettings.password = { password: true };





})(jQuery);
