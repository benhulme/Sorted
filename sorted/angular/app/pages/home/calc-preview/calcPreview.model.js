'use strict';

angular.module('sorted')
  .factory('calcPreviewModel', function calcPreviewModel() {

    var defaultFields = {
      salary: null,
      expense: null,
    };

    var clone = function(obj) {
      return JSON.parse(JSON.stringify(obj));
    };

    var model = {
      fields: clone(defaultFields),
      reset: function() {
        model.fields = clone(defaultFields);
      },
      prepare: function(data) {
        var prepared = {};
        angular.forEach(data, function(val, key) {
          var stripped = val.replace('$', '').replace(',', '');
          prepared[key] = parseFloat(stripped).toFixed(2);
        });
        return prepared;
      },
    };

    return model;

  });
