'use strict';

angular.module('sorted')
  .factory('debtCalculatorModel', [function debtCalculatorModel() {

    var clone = function(obj) {
      return JSON.parse(JSON.stringify(obj));
    };

    function formatFloat(val, decimal) {
      var parsedFloat = false;
      if (val) {
        if (typeof (val) === 'string') {
          val = val.replace('$', '').replace(',', '');
        }
        parsedFloat = parseFloat(val).toFixed(decimal);
      }

      if (!parsedFloat || isNaN(parsedFloat)) {
        return false;
      } else {
        return parsedFloat;
      }
    }

    function formatInteger(val) {

      var parsedInteger = false;

      if (val) {
        if (typeof (val) === 'string') {
          val = val.replace('$', '').replace(',', '');
        }
        parsedInteger = parseInt(val);
      }

      if (!parsedInteger || isNaN(parsedInteger)) {
        return false;
      } else {
        return parsedInteger;
      }

    }

    var Model = function(form) {

      this.fields = {};
      this.result = {};
      this.nudge = form.nudge;
      this.graphic = form.graphic;
      this.modelName = form.model;

      for (var fieldItem in form.fields) {
        if (form.fields.hasOwnProperty(fieldItem)) {
          this.fields[fieldItem] = {
            calcModel: clone(form.fields[fieldItem].calcModel),
            format: clone(form.fields[fieldItem].format),
            required: clone(form.fields[fieldItem].required),
            value: clone(form.fields[fieldItem].value),
          };
        }
      }

      this.prepare = function(data) {
        var prepared = {};
        var ready = true;

        for (var dataItem in data) {
          if (data.hasOwnProperty(dataItem)) {

            var value = data[dataItem].value;

            if (data[dataItem].format) {
              switch (data[dataItem].format.type) {
                case 'INTEGER':
                  value = formatInteger(data[dataItem].value);
                  break;
                case 'FLOAT':
                  value = formatFloat(data[dataItem].value, data[dataItem].format.decimals);
                  break;
              }
            }

            if ((!value && value !== 0) && data[dataItem].required === true) {
              ready = false;
            }

            prepared[data[dataItem].calcModel] = value;

          }

        }

        return {
          ready: ready,
          data: prepared,
        };
      };
    };

    var modelInstance = {
      getInstance: function(fields) {
        return new Model(fields);
      },
    };

    return modelInstance;

  }]);
