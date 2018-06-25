(function(){
  'use strict';

  angular.module('sorted')
    .service('calcService', ['$http', 'apiEndpoints', function($http, apiEndpoints) {

      return {
        save: function(data) {
          var req = {
              method: 'POST',
              url: apiEndpoints.calcSave,
              data: data,
              headers: {
                'Content-Type': 'application/json',
              },
            };
          return $http(req);
        },
        update: function(data, id) {
          var req = {
            method: 'PUT',
            url: apiEndpoints.calcSave + '/' + id,
            data: data,
            headers: {
              'Content-Type': 'application/json',
            },
          };
          return $http(req);
        },
        get: function(id) {
          var req = {
            method: 'GET',
            url: apiEndpoints.calcSave + '/' + id,
            headers: {
              'Content-Type': 'application/json',
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

        },
        prepareCollection: function(collection) {

          var saveData = [];

          angular.forEach(collection.models, function(model) {

            var temp = model.attributes;
            temp.result = model.result.attributes;

            saveData.push(temp);

          });

          return saveData;

        },
        load: function(models, dataToLoad) {

          angular.forEach(models, function(model, modelName) {

            if (!Array.isArray(dataToLoad[modelName].result)) {
              models[modelName].result = dataToLoad[modelName].result;
              models[modelName].ready = true;
            }

            angular.forEach(model.fields, function(field, fieldName) {

              if (dataToLoad[modelName] && dataToLoad[modelName][fieldName]) {
                models[modelName].fields[fieldName].value = dataToLoad[modelName][fieldName];
              }

            });

          });

          return models;
        },
        loadCollection: function(collection, dataToLoad) {

          angular.forEach(dataToLoad, function(data, key) {

            var model = collection.get(key);

            angular.forEach(data, function(field, fieldName) {

              model.$attributes[fieldName] = field;

            });

          });

        },
      };
    }]);
}());
