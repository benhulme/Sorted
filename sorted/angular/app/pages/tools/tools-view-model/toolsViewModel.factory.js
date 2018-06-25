(function() {
  'use strict';

  angular.module('sorted')
  .factory('toolsViewModel', ['$filter', '$sce', 'silverStripeService',
    function ($filter, $sce, silverStripeService) {

      function markCustomContentSafe(pages) {
        return _.map(pages, function (page) {
          if (page.hasOwnProperty('CustomContent')) {
            page.TrustedCustomContent = $sce.trustAsHtml(page.CustomContent);
          }
          return page;
        });
      }

      function qPromiseSuccess(response) {
        var data = response.data[0];

        // Group tool pages by category
        var viewModel = _.reduce(data.Categories, function (vm, category) {
          category.Slug = $filter('titleSlug')(category.Title);
          category.Pages = markCustomContentSafe(
            _.filter(data.ToolPages, function (page) {
              return _.includes(page.CategoryIDs, '' + category.ID);
            })
          );
          vm.push(category);
          return vm;
        }, []);

        return viewModel;
      }

      function qPromiseFail(response) {
        console.error('Failed to load tool pages', response);
        return null;
      }

      function build() {
        return silverStripeService.get('toolsArticles')
          .then(qPromiseSuccess, qPromiseFail);
      }

      return {
        build: build
      };

    }]);

})();
