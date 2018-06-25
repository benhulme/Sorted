/* global BigNumber */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .controller('CategoryModalCtrl', [
      '$scope',
      '$log',
      '$q',
      '$uibModalInstance',
      'budgetModal', 
      'budgetingToolConfig',
      'Category',
      'periodAmount',
      'Profile',
      'siteConfig',
      'categoryModel',
      'masterCategoryModel',
      function ($scope, $log, $q, $uibModalInstance, budgetModal, budgetingToolConfig, Category, periodAmount, Profile, siteConfig, categoryModel, masterCategoryModel) {
        if (categoryModel === null) {
          categoryModel = Category.create();
        }
        $scope.category = categoryModel;
        if (!$scope.category.Period) {
          $scope.category.Period = budgetingToolConfig.BUDGET_PERIODS[budgetingToolConfig.DEFAULT_BUDGET_PERIOD];
        }
        $scope.initialPeriod = $scope.category.Period;
        if (!$scope.category.Cents) {
          $scope.category.Cents = new BigNumber(0);
        }
        $scope.category.newCategoryImage = null;
        $scope.category.newCategoryImagePreview = null;

        // Two copies of the category amount are maintained in the modal.
        // The first is used in the input field, and the second is manipulated
        // each time the amount field or period dropdown changes. On modal close,
        // only newCents is retained.
        var newCents = _.clone($scope.category.Cents);

        $scope.periods = budgetingToolConfig.BUDGET_PERIODS;
        $scope.profile = Profile.get();
        $scope.siteConfig = siteConfig;
        $scope.placeholder = budgetingToolConfig.CATEGORY_TITLE_PLACEHOLDER;
        $scope.getIconPath = Category.getIconPath;

        $scope.removeCategory = function () {
          budgetModal.areYouSureModal()
            .then(function (confirm) {
              if (confirm) {
                masterCategoryModel.Categories.splice(_.findIndex(masterCategoryModel.Categories, {'ID': categoryModel.ID}), 1);
                $uibModalInstance.close(masterCategoryModel);
              }
            });
        };

        var disableCentsWatch = $scope.$watch('category.Cents', function (newVal) {
          if (newVal) {
            newCents = periodAmount.convert(newVal, $scope.initialPeriod, $scope.category.Period);
          }
        });

        function updateMasterCategories(image) {
          if (image) {
            $scope.category.Icon.ID = image.ID;
            $scope.category.Icon.Filename = image.imageURL.replace(/^\//, '');
            $scope.category.Icon.IsCustom = true;
          }
          var index = _.findIndex(masterCategoryModel.Categories, {'ID': $scope.category.ID});
          disableCentsWatch();
          $scope.category.Cents = newCents;
          if (index === -1) {
            masterCategoryModel.Categories.push($scope.category);
          } else {
            angular.copy($scope.category, masterCategoryModel.Categories[index]);
          }
          $uibModalInstance.close(masterCategoryModel);
        }

        $scope.saveCategory = function () {
          if (!$scope.category.Cents || 
              $scope.category.Cents.lessThan(0) || 
              $scope.category.Cents.greaterThan(Number.MAX_SAFE_INTEGER || budgetingToolConfig.IE_MAX_SAFE_INTEGER)) {
            newCents = new BigNumber(0);
          }
          if ($scope.category.newCategoryImage) {
            return Profile.uploadBudgetImage($scope.category.newCategoryImage)
              .then(function (response) {
                if (!response) {
                  // TODO: handle failed upload
                  return $q.reject("Can't upload image.");
                }
                if (response.data.imageURL) {
                  delete $scope.category.newCategoryImage;
                  updateMasterCategories(response.data);
                  $uibModalInstance.close(masterCategoryModel);
                  return;
                }
                return $q.reject("Can't upload image.");
              })          
              .catch(function (error) {
                $log.error(error);
              });
          }
          updateMasterCategories();
          $uibModalInstance.close(masterCategoryModel);
        };

        $scope.cancelCategory = function () {
          $uibModalInstance.dismiss('cancel');
        };

        $scope.$watch('category.Period', function (newVal, oldVal) {
          newCents = periodAmount.convert(newCents, oldVal, newVal);
        });
      }
    ]);

})();
