/**
 * Created by stanislavk on 6/03/2016.
 */


/**
 * Created by stanislavk on 26/02/2016.
 */
(function(){
  'use strict';
  angular.module('sorted')
    .directive('emailValid', ['siteConfig', function() {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
          ctrl.$parsers.unshift(function (viewValue) {

            var message = {
              Email: viewValue
            },
                response ='';

            $.ajax({
              type: "POST",
              url: "/api/v0.1/profile/checkemail",
              data: message,
              async: false,
              success: function (data) {
                if (data.success === "true") {
                  ctrl.$setValidity('inUse', true);
                  response = viewValue;
                } else {
                  ctrl.$setValidity('inUse', false);
                  response = viewValue;
                }
              }
            });

            return response;
          });

        }
    };
}]);
}());



