/* global BigNumber */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('totalValues', [
      'Budget', 'periodAmount', function (Budget, periodAmount) {
        // Where `x` is any container with objects having a numeric `Cents` property
        function getTotal (x) {
          return _.reduce(x, function (total, item) {
            return total.plus(item.Cents);
          }, new BigNumber(0));
        }

        function getSubtotal () {
          return getTotal(Budget.budget.MasterCategories);
        }

        function getIncomeTotal () {
          return getTotal(Budget.budget.IncomeStreams);
        }

        function getRemainingDisplay () {
          var remaining = getIncomeTotal().minus(getSubtotal());
          return periodAmount.displayDollars(remaining);
        }

        // var once=false;

        function updateTotals () {

          return _.map(Budget.budget.MasterCategories, function (masterCategory) {
            var cents = _.reduce(masterCategory.Categories, function (sum, category) {
              return sum.plus(category.Cents);
            }, new BigNumber(0));
            console.log(cents);
            return _.assign(angular.copy(masterCategory), { Cents: cents });
          });

          // if(!once) {
          //   once=true;
          //
          //   return _.map(Budget.budget.MasterCategories, function (masterCategory) {
          //     var cents = _.reduce(masterCategory.Categories, function (sum, category) {
          //       return sum.plus(category.Cents);
          //     }, new BigNumber(0));
          //     console.log(cents);
          //     return _.assign(angular.copy(masterCategory), { Cents: cents });
          //   });
          // } else {
          //   console.log('Do Calcuation after firdt');
          //   var temp = [];
          //   var copy = angular.copy(Budget.budget.MasterCategories);
          //   for(var key1 in copy) {
          //
          //     var masterCategory = copy[key1];
          //     // console.log(key1);
          //     // console.log(masterCategory);
          //     // console.log(masterCategory.Cents);
          //
          //     var bigNumber = new BigNumber(0);
          //
          //     for(var i = 0; i < masterCategory.Categories.length; i++)
          //     {
          //       // console.log(masterCategory.Categories[i]);
          //       var category = masterCategory.Categories[i];
          //       if(category.Title === 'Groceries') {
          //         // console.log(category);
          //         // console.log(category.Cents);
          //       }
          //
          //     }
          //
          //     // console.log(bigNumber);
          //   }
          //   return copy;
          // }


        }

        return {
          getIncomeTotal: getIncomeTotal,
          getSubtotal: getSubtotal,
          getRemainingDisplay: getRemainingDisplay,
          updateTotals: updateTotals
        };
      }
    ]);

})();
