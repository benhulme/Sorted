/**
 * Created by greg on 1/03/2016.
 */

angular.module('sorted')
  .factory('KiwiSaverSavingsModel', ['siteConfig', 'NgBackboneModel',
    function (siteConfig, NgBackboneModel) {
      "use strict";

      var ResultModel = NgBackboneModel.extend({

        hasResult: function () {

          var self = this,
            pick = ['retirement_lump_sum', 'retirement_income', 'years_3', 'years_5'];

          var t = _.reduce(self.pick(pick),
            function (outcome, obj) {
              return (!_.isNull(obj)) ? _.add(outcome, parseInt(obj)) : outcome;
            }, 0);

          return !!t; // return a boolean
        }
      });

      return NgBackboneModel.extend({

        idAttribute: 'ID',

        intAttrs: [],
        floatAttrs: [],
        dateAttrs: [],

        defaults: {
            Title: 'KiwiSaver savings calculator'
          },

        urlRoot: siteConfig.API_PREFIX,

        url: function () {
          var uri = this.urlRoot + '/rest/tool';
          return (!this.isNew()) ? uri + '/' + this.get('ID') : uri;
        },

        initialize: function () {

          // set up a reference to a resultModel
          this.result = new ResultModel();

          // defaults for life_expectancy based on gender
          this.on('change:gender', function () {
            if (this.get('gender') === 2) { // male
              this.set('life_expectancy', 91);
            }
            else if (this.get('gender') === 1) { // female
              this.set('life_expectancy', 94);
            }
          });
        },

        parse: function (response, options) {

          var self = this,
            data = {},
            parsed = {},
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

          _.forEach(data, function (val, key) {

            if (self.intAttrs.indexOf(key) > -1) {
              parsed[key] = self._toInt(val);
            }
            else if (self.floatAttrs.indexOf(key) > -1) {
              parsed[key] = self._toFloat(val);
            }
            else if (self.dateAttrs.indexOf(key) > -1) {
              parsed[key] = self._toDate(val);
            }
            else {
              parsed[key] = val;
            }

          });

          return _.omit(parsed, ['result']);
        },

        calculate: function (calculator) {
          var
            result = calculator.calculate(_.clone(this.attributes)); // strip out result param (see toJSON)

          if (!result) {
            this.result.clear();
          } else {
            this.result.set(result);
          }

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

        //  specialize for saving of model to back-end
        //  response format for Backend
        //  {CalcID:"", Data: {}, Title: ""}
        toJSON: function () {
          var
            data = NgBackboneModel.prototype.toJSON.apply(this, arguments);

          _.merge(data, {result: this.result.toJSON()});

          return _.merge({Data: data}, _.pick(data, 'CalcID', 'Title'));

        }

      });
    }]);
