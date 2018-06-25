(function() {
  'use strict';

  angular.module('sorted')
  .factory('guidesViewModel', ['$filter', 'silverStripeService',
    function ($filter, silverStripeService) {
      function qPromiseSuccess(response) {
        var data = response.data[0];

        // Lowercase slug for use in filter and icon names
        _.map(data.Categories, function (category) {
          category.Slug = $filter('titleSlug')(category.Title);
        });

        // Group guide pages by category
        var viewModel = _.reduce(data.Categories, function (vm, category) {
          category.Pages = _.filter(data.GuidePages, function (page) {
            return _.includes(page.CategoryIDs, '' + category.ID);
          });
          vm.push(category);
          return vm;
        }, []);

        return viewModel;
      }

      function qPromiseFail(response) {
        console.error('Failed to load guide pages', response);
        return null;
      }

      function build() {
        return silverStripeService.get('guidesArticles')
          .then(qPromiseSuccess, qPromiseFail);
      }

      return {
        build: build
      };
    }]);

})();
