(function(){
  'use strict';

  angular.module('sorted')
    .service('saveCalcService', ['$http', 'apiEndpoints', function($http, apiEndpoints) {

      return {
        save: function(data) {
          var req = {
              method: 'POST',
              url: apiEndpoints.calcSave,
              data: data,
              headers: {
                'Content-Type': 'application/json'
              },
            };
          return $http(req);
        },
        update: function(data) {
          var req = {
            method: 'PUT',
            url: apiEndpoints.calcSave,
            data: data,
            headers: {
              'Content-Type': 'application/json'
            },
          };
          return $http(req);
        },
        prepare: function(models) {

          var saveData = {};
          angular.forEach(models, function(model, modelName) {
            var temp = {};
            angular.forEach(model.fields, function(field, fieldName) {
              temp[fieldName] = field.value;
            });
            temp.result = model.result;
            saveData[modelName] = temp;
          });

          return saveData;

        }
      };
    }]);
}());
