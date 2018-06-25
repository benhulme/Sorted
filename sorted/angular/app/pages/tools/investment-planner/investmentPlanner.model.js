/**
 * Created by greg on 1/03/2016.
 */

angular.module('sorted')
  .factory('InvestmentPlannerModel', ['siteConfig', 'NgBackboneModel',
    function (siteConfig, NgBackboneModel) {
    "use strict";

    var ResultModel = NgBackboneModel.extend({

      hasResult: function () {
        return this.result.hasResult();
      }
    });

    return NgBackboneModel.extend({

      idAttribute: 'ID',

      intAttrs: [],
      floatAttrs: [],
      dateAttrs: [],

      defaults: {
          Title: 'Investor kickstarter'
        },

      urlRoot: siteConfig.API_PREFIX,

      url: function () {
        var uri = this.urlRoot + '/rest/tool';
        return (!this.isNew()) ? uri + '/' + this.get('ID') : uri;
      },

      constructor: function () {
          // set up a reference to a resultModel
          this.result = new ResultModel();
          NgBackboneModel.apply(this, arguments);
        },

      initialize: function (attributes, options) {

        if (_.has(options, 'calculator')) {
          this.calculator = options.calculator;
        }
      },

      parse: function (response, options) {
        var self = this,
          data = {},
          //parsed = {},
          opts = options || {};

        // handle responses from backend
        if (_.has(response, 'status') && _.has(response, 'data')) {
          data = _.merge(_.cloneDeep(response.data.Data), _.pick(response.data, 'ID'));
        }
        else {
          data = response;
        }

        // strip out the result param if it exists
        if (_.has(data.result, 'result')) {
          self.result.set(_.pick(data, 'result'), opts);
        }

        return _.omit(data, ['result']);
      },

      calculate: function () {
        var
          result = this.calculator.calculate(_.clone(this.attributes)); // strip out result param (see toJSON)
        this.result.set(result);
        return this; // chain-able
      },

      hasResult: function () {
        return this.result.hasResult();
      },

      saveResult: function () {

        var
          opts = {
            parse: true // flag to pass response through parse for cleanings and storing
          };

        return this.save(null, opts);
      },

      // a crude, yet simple way of ensuring minimum data prior to calculation
      // due to expensive time taken to complete
      validate: function (attrs) {
        function inValidCheck(list) {
          var invalid = [];
          _.forEach(list, function (val, key) {
            if (_.isEmpty(val)) {
              return invalid.push(key);
            }
          });
          return (invalid.length);
        }

        if (inValidCheck(_.omit(attrs, ['CalcID','ID']))) {
          return 'Invalid';
        }

      },


      toJSON: function () {
        var
          data = NgBackboneModel.prototype.toJSON.apply(this, arguments);

        _.merge(data, {result: this.result.toJSON()});

        return _.merge({Data: data}, _.pick(data, 'CalcID', 'Title'));

      }

    });
  }]);
