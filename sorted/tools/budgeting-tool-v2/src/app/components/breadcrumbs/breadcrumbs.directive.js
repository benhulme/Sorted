// (function(){
//   'use strict';
//
//   angular.module('sorted')
//     .directive('breadcrumbs', ['$location', 'siteConfig', function ($location, siteConfig) {
//       return {
//         templateUrl: siteConfig.APP_PATH + 'app/components/breadcrumbs/breadcrumbs.html',
//         restrict: 'E',
//         controller: ['$scope', function ($scope) {
//           var segments = $location.path()
//             .replace(/^#?\/?/g, '')
//             .split('/');
//           $scope.breadcrumbs = _.map(segments, function (path, index, crumbs) {
//             var title = path.replace(/-/g, ' ');
//             path = index > 0 ? '/' + path : path;
//             path = crumbs.slice(0, index).join('/') + path;
//             return {
//               title: title,
//               path: path
//             };
//           });
//         }]
//       };
//     }]);
//
// })();



(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .directive('breadcrumbs', breadcrumbs);

  /** @ngInject */
  function breadcrumbs(budgetingToolConfig, siteConfig) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/breadcrumbs/breadcrumbs.html',
      scope: {
        breadcrumbs: '='
      },
      link: linkFunc,
      controller: BreadcrumbsController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {

    }

    /** @ngInject */
    function BreadcrumbsController(moment) {
      var vm = this;
    }
  }

})();


