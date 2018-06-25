(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('inlineEditableCategory', [
      '$document',
      '$rootScope',
      'Budget',
      'budgetModal',
      'budgetingToolConfig',
      'categoryValidator',
      'periodAmount',
      'siteConfig',
      function ($document, $rootScope, Budget, budgetModal, budgetingToolConfig, categoryValidator, periodAmount, siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/inline-editable-category/inlineEditableCategory.html',
          link: function (scope) {
            function saveAndCloseCategory (category) {
              if (scope.inlineEditCategory.Cents !== undefined) {
                if (!scope.inlineEditCategory.Cents.eq(category.Cents)) {
                  angular.copy(scope.inlineEditCategory.Cents, category.Cents);
                  Budget.setDirty();
                }
              }

              if (scope.inlineEditCategory.Title !== undefined) {
                if (scope.inlineEditCategory.Title !== category.Title) {
                  category.Title = scope.inlineEditCategory.Title.substring(0, budgetingToolConfig.MAX_CATEGORY_TITLE_FIELD);
                  Budget.setDirty();
                }
              }


              if (scope.inlineEditCategory.Period.PerYear !== category.Period.PerYear) {
                var newCents = periodAmount.convert(
                  scope.inlineEditCategory.Cents,
                  category.Period,
                  scope.inlineEditCategory.Period
                );
                angular.copy(newCents, category.Cents);
                angular.copy(scope.inlineEditCategory.Period, category.Period);
                Budget.setDirty();
              }
              category.editing = false;
            }

            function findOpenCategories () {
              return _.reject(
                _.map(Budget.budget.MasterCategories, function (mc) {
                  return _.find(mc.Categories, {editing: true});
                }),
                _.isUndefined
              );
            }

            function clickOutside (event) {
              // Was the click on any inline-editable-category?
              if (angular.element(event.target).parents('inline-editable-category').length || event.target.className === "dropdown-backdrop" ) {
                return;
              }
              // Handle cases where the user clicked outside the edit form, but not on another category
              // There should never be more than one category open at a time, but just to be sure:
              _.forEach(findOpenCategories(), function (category) {
                // We're outside the usual Angular events here, and the view won't update without a bit of persuasion:
                $rootScope.$apply(saveAndCloseCategory(category));
              });
              event.stopImmediatePropagation();
              $document.off('click', clickOutside);
            }

            scope.openCategoryEditForm = function () {
              // Close all other open categories and update contents. Needs to be called prior to copying the
              // category into the temporary object (below).
              _.forEach(findOpenCategories(), function (category) {
                saveAndCloseCategory(category);
              });

              angular.copy(scope.category, scope.inlineEditCategory);
              scope.category.editing = true;
              $document.on('click', clickOutside);
            };

            scope.getCategoryAmount = function () {
              return periodAmount.displayDollars(scope.category.Cents, scope.category.Period);
            };

            scope.removeCategory = function (idx) {
              budgetModal.areYouSureModal()
                .then(function (confirm) {
                  if (confirm) {
                    scope.mc.Categories.splice(idx, 1);
                    Budget.setDirty();
                  }
                });
            };
          }
        };
      }
    ]);

})();
