'use strict';

angular.module('sorted')
  .directive('cmSelect', ['siteConfig', function(siteConfig) {
    return {
      templateUrl: siteConfig.APP_PATH + 'app/components/cm-select/cm-select.html',
      scope: {
        cmOptions: '=',
        cmPlaceholder: '@',
        ngModel: '=',
      },
      link: function(scope, elm) {
        var selectElm = elm;

        selectElm.on('click', '.cm-option', function(event) {
          scope.$apply(function() {
            scope.ngModel = event.target.attributes['cm-value'].value;
          });
        });

        scope.$watch('ngModel', function(newValue) {

          if (newValue === null) {
            //reset the placeholder
            scope.placeholder = scope.cmPlaceholder;
          } else if (newValue && elm.find('.cm-option').length > 1) {
            scope.placeholder = elm.find('.cm-option[cm-value="' + newValue + '"]')[0].attributes['cm-label'].value;
          }

        });

        var cancelOptionWatch = scope.$watch('cmOptions', function() {
          var defaultField = _.find(scope.cmOptions, { value: scope.ngModel });

          if (defaultField) {
            scope.placeholder = defaultField.label;
            cancelOptionWatch();
          }

        });

      },
      controller: ['$scope',
        function($scope) {

          $scope.options = $scope.cmOptions;
          $scope.placeholder = $scope.cmPlaceholder;

        },
      ]
    };//return

  }]);
