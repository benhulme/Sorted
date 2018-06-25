(function () {
  'use strict';

  // File attribute directive for uploads. Upgraded from:
  // https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
  angular.module('budgetingTool')
    .directive('imageFileModel', ['$parse', 'budgetingToolConfig', function ($parse, budgetingToolConfig) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var model = $parse(attrs.imageFileModel);
          var previewModel = $parse(attrs.imagePreviewModel);

          element.bind('change', function() {
            var isAllowedType = _.includes(
              budgetingToolConfig.CATEGORY_IMAGE_TYPES, 
              element[0].files[0].type
            ); 
            if (isAllowedType) {
              var reader = new FileReader();
              reader.onload = function (e) {
                scope.$apply(function () {
                  model.assign(scope, element[0].files[0]);
                  previewModel.assign(scope, e.target.result);
                });
              };
              reader.readAsDataURL(element[0].files[0]);
            }
          });
        }
      };
    }]);

})();
