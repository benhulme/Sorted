/**
 * Created by greg on 11/02/2016.
 */
(function () {
  "use strict";
  angular.module('sorted')
    .factory('orderViewModel', ['silverStripeService',
      function (silverStripeService) {
        function qPromiseSuccess(response) {
          var data = response.data;
          return _.merge({}, {
            Categories: data.Categories,
            Booklets: _.filter(data.Collateral, {CategoryID: "1"}),
            Seminars: _.filter(data.Collateral, {CategoryID: "2"}),
            Posters: _.filter(data.Collateral, {CategoryID: "3"})
          });
        }

        function qPromiseFail(response) {
          console.error('Failed to load collateral', response);
          return null;
        }

        function build() {
          return silverStripeService.get('sortedCollateral')
            .then(qPromiseSuccess, qPromiseFail);
        }

        return {
          build: build
        };
      }]);
}());
