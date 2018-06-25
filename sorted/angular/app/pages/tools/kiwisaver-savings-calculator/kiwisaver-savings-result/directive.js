/**
 * Created by greg on 1/03/2016.
 */

(function () {
  'use strict';
  angular.module('sorted')
    .directive('kiwisaverSavingsResult', ['siteConfig', 'Profile', function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/kiwisaver-savings-calculator/kiwisaver-savings-result/index.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          model: '='
        },
        link: function (scope) {

          scope.siteConfig = siteConfig;

          scope.lessThanXYears = function(numYears) {

            if (scope.model.$attributes.joined_month && scope.model.$attributes.joined_year) {

              var dateJoinedString = scope.model.$attributes.joined_year + '-' + scope.model.$attributes.joined_month  + '-' +  '01';

              var joinedDate = moment(dateJoinedString, 'YYYY-MM-DD');

              //based on first of this month
              var dateToTest = moment().year(moment().year())
                                      .month(moment().month())
                                      .date(1);

              //subtract appropriate number of years
              dateToTest.subtract(numYears, 'y');

              if (joinedDate.diff(dateToTest, 'y') < 0 || Object.is(joinedDate.diff(dateToTest, 'y'), -0)) {
                return false;
              } else {
                return true;
              }

            }

          };

          /**
           * Broadcast listener triggered from Modal form
           */
          scope.$on('save:calc', function (event, title) {

            // call save on the model
            var
              opts = {
                success: function () {
                  angular.element('#save-as-modal').modal('hide');
                },
                error: function () {
                },
                silent: true,
                parse: true // flag to pass response through parse for cleanings and storing
              };

            scope.model.$attributes.Title = title;

            scope.model.save(null,  opts);
          });



        },
      };

    }]);
}());
