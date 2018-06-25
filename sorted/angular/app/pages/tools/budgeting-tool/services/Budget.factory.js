/* global globalState */
(function () {
  'use strict';

  // NOTE: all amounts are stored in cents per day
  angular.module('budgetingTool')
    .factory('Budget', [
      '$log',
      '$q',
      '$timeout',
      '$window',
      'Alert',
      'budgetingToolConfig',
      'calculatorApi',
      'budgetConverter',
      function ($log, $q, $timeout, $window, Alert, budgetingToolConfig, calculatorApi, budgetConverter) {
        var _budget = {};
        var _calculator = {};
        var _saveInProgress = false;
        var _dirty = false;

        function startSaveAttempt () {
          _saveInProgress = true;
        }

        function endSaveAttempt () {
          _saveInProgress = false;
          _dirty = false;
          globalState.dirty = false;
        }

        function create () {
          angular.copy({
            // Leaving `Cents` undefined here allows placeholder to show until user enters value
            IncomeStreams: [],
            Categories: [],
            Period: budgetingToolConfig.BUDGET_PERIODS[budgetingToolConfig.DEFAULT_BUDGET_PERIOD]
          }, _budget);
          return _budget;
        }

        function clear () {
          angular.copy({}, _budget);
          angular.copy({}, _calculator);
        }

        function del (calculator) {
          return calculatorApi.del(calculator || _calculator);
        }

        function get () {
          if (!_.isEmpty(_budget)) {
            return _budget;
          }
          return calculatorApi.get(budgetingToolConfig.CALC_ID)
            .then(function (calculator) {
              if (calculator) {
                angular.copy(calculator, _calculator);
                angular.copy(
                  budgetConverter.process(angular.fromJson(calculator.Data)), 
                  _budget
                );
                _dirty = false;
                globalState.dirty = false;
              } else {
                // No existing calculator, this should be an unsaved budget
                _dirty = true;
                globalState.dirty = true;
              }
              return _budget;
            });
        }

        function save () {
          if (_saveInProgress) {
            if (!_.isEmpty(_calculator)) {
              return calculatorApi.update(_calculator, _budget);
            }

            // For this release at least, we need to guarantee no other budget exists before saving
            return calculatorApi.get(budgetingToolConfig.CALC_ID)
              .then(function (calculator) {
                if (calculator) {
                  return $q.reject({ calculator: calculator });
                }

                return calculatorApi.save(budgetingToolConfig.CALC_ID, _budget)
                  // API does not return the new record on success, so we need to 
                  // go back to the database for it
                  .then(function (saveResponse) {
                    if (saveResponse && saveResponse.status !== 200) {
                      return $q.reject();
                    }

                    endSaveAttempt();
                    return calculatorApi.get(budgetingToolConfig.CALC_ID)
                      .then(function (newCalculator) {
                        angular.copy(newCalculator, _calculator);
                      });
                  });
              });
          }
        }

        function overwrite (calculator) {
          return del(calculator)
            .then(save)
            .then(function () {
              endSaveAttempt();
              Alert.replaced();
            });
        }

        function keepCurrent() {
          clear();
          return get()
            .then(function () {
              endSaveAttempt();
              Alert.retained();
            });
          }

        function updateMasterCategory (masterCategory) {
          _dirty = true;
          globalState.dirty = true;
          var index = _.findIndex(_budget.MasterCategories, { ID: masterCategory.ID });
          angular.copy(
            masterCategory,
            _budget.MasterCategories[index]
          );
        }

        function deleteMasterCategory (id) {
          _dirty = true;
          globalState.dirty = true;
          _budget.MasterCategories.splice(
            _.findIndex(_budget.MasterCategories, { ID: id }), 1
          );
        }

        function saveInProgress () {
          return _saveInProgress;
        }

        function updateHeaderFields (budget) {
          _dirty = true;
          globalState.dirty = true;
          _budget.Title = budget.Title;
          angular.copy(budget.Period, _budget.Period);
          angular.copy(budget.IncomeStreams, _budget.IncomeStreams);
        }

        return {
          budget: _budget,
          clear: clear,
          create: create,
          del: del,
          deleteMasterCategory: deleteMasterCategory,
          isDirty: function () { return _dirty; },
          setDirty: function () { _dirty = true; },
          endSaveAttempt: endSaveAttempt,
          get: get,
          keepCurrent: keepCurrent,
          overwrite: overwrite,
          save: save,
          startSaveAttempt: startSaveAttempt,
          saveInProgress: saveInProgress,
          updateHeaderFields: updateHeaderFields,
          updateMasterCategory: updateMasterCategory
        };
      }
    ]);

})();
