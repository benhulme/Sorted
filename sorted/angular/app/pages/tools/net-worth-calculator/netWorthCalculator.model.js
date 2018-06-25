/**
 * Created by greg on 3/03/2016.
 */

"use strict";


angular.module('sorted')
  .factory('NetWorthCalculatorModel', ['siteConfig', 'NgBackboneModel', 'NgBackboneCollection',
    function (siteConfig, NgBackboneModel, NgBackboneCollection) {

      var
        ResultModel = NgBackboneModel.extend({

          calcResult: function () {
             var self = this;
             return _.reduce(self.attributes,
              function (outcome, obj) {
                return (!_.isNaN(obj)) ? _.add(outcome, parseInt(obj)) : outcome;
              }, 0);
          },

          hasResult: function () {

            var
              p = this.pick(['sum_total', 'debt_total']);

            return (p.sum_total > 0 || p.debt_total > 0); // return a boolean
          }
        });

      var
        InputModel = NgBackboneModel.extend({

          constructor: function () {
            // set up a reference to a resultModel
            this.result = new ResultModel();
            NgBackboneModel.apply(this, arguments);
          },

          initialize: function (attributes, options) {
            // assign reference to 'sorted calculator'
            if (_.has(options, 'calculator')) {
              this.calculator = options.calculator;
            }
          },

          calTotal: function () {
            // sum each section       
            if(this.result.has('sum_total')){
              return '$' + this.result.get('total');
            }   
            return '';
            
          },

          parse: function (data, options) {
            var self = this,
              opts = options || {};

            // strip out the result param if it exists
            if (_.has(data.result, 'result')) {
              self.result.set(_.pick(data, 'result'), opts);
            }

            return _.omit(data, ['result']);
          },

          calculate: function () {
            var
              cleaned = _.omit(_.clone(this.attributes), ['id', 'identifier']),
              result = this.calculator.calculate(cleaned); // strip out result param (see toJSON)

            this.result.set(result);
            return this; // chain-able
          },

          hasResult: function () {
            return this.result.hasResult();
          },

          toJSON: function () {
            var
              data = NgBackboneModel.prototype.toJSON.apply(this, arguments);

            return _.merge(data, {result: this.result.toJSON()});
          }
        });

      /**
       * A collection of InputModels
       * with helper methods to interrogate the collection
       *
       */
      var
        InputCollection = NgBackboneCollection.extend({

          model: InputModel,

          hasResult: function () {
            return !!this.find(function (m) {
              return m.hasResult();
            });
          }

        });

      /**
       * A Model to wrap the Collection in order to store
       * Backend attributes like ID & Title
       *
       */
      return NgBackboneModel.extend({
        idAttribute: 'ID',

        urlRoot: siteConfig.API_PREFIX,

        defaults: {
          Title: 'My NetWorth Savings Calculation'
        },

        url: function () {
          var uri = this.urlRoot + '/rest/tool';
          return (!this.isNew()) ? uri + '/' + this.get('ID') : uri;
        },

        constructor: function () {
          this.collection = new InputCollection();
          NgBackboneModel.apply(this, arguments);
        },

        parse: function (response, options) {
          var
            self = this,
            data = {};

          // handle responses from backend
          if (_.has(response, 'status') && _.has(response, 'data')) {
            data = response.data;
          }
          else {
            data = response;
          }

          // set the model data on the contained collection
          if (_.has(data, 'Data')) {
            self.collection.set(data.Data, options);
          }
          else if (_.has(data, 'models')){
            self.collection.reset(data.models, options);
          }

          return _.omit(data, ['Data', 'models']);
        },

        hasResult: function () {
          return this.collection.hasResult();
        },

        toJSON: function () {
          var
            data = NgBackboneModel.prototype.toJSON.apply(this, arguments);
          return _.merge(data, {Data: this.collection.toJSON()});
        }
      });
    }]);
