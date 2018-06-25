'use strict';

angular.module('sorted')
  .factory('RetirementPlannerModel', ['siteConfig', 'NgBackboneModel',
    function (siteConfig, NgBackboneModel) {


      var ResultModel = NgBackboneModel.extend({

        hasResult: function () {

          var self = this,
            pick = ['amount_total', 'retirement_income', 'desired_retirement_income'];

          var t = _.reduce(self.pick(pick),
            function (outcome, obj) {
              return (!_.isNaN(obj)) ? _.add(outcome, parseInt(obj)) : outcome;
            }, 0);

          return !!t; // return a boolean
        }
      });

      return NgBackboneModel.extend({

        idAttribute: 'ID',

        defaults: {
          Title: 'Retirement planner'
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
          // assign reference to 'sorted calculator'
          if (_.has(options, 'calculator')) {
            this.calculator = options.calculator;
          }

          // set default on new calculator
          // this.listenTo(this.result, 'click', function () {
          //   this.trigger('result:change', this);
          // });
          //
          // this.on('change:your_gender', function(model, value) {
          //   if (value === 2) {
          //     if(model.your_life_expectancy === undefined) {
          //       model.set({your_life_expectancy: 91});
          //     }
          //   } else {
          //     model.set({your_life_expectancy: 94});
          //   }
          // });
          //
          // this.on('change:partner_gender', function(model, value) {
          //   if (value === 2) {
          //     model.set({partner_life_expectancy: 91});
          //   } else {
          //     model.set({partner_life_expectancy: 94});
          //   }
          // });

        },

        parse: function (response, options) {
          var self = this,
            data = {},
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
          // strip out result param (see toJSON)

          var calcInput = _.clone(this.attributes);

          calcInput.required_savings_freq = calcInput.lifestyle_freq;
          calcInput.bridge_freq = calcInput.lifestyle_freq;
          calcInput.partner_super = calcInput.your_super;
          calcInput.your_other_income = calcInput.your_other_income * calcInput.your_other_income_freq;
          calcInput.partner_other_income = calcInput.partner_other_income * calcInput.partner_other_income_freq;

          var
            result = this.calculator.calculate(calcInput);

          this.result.set(result);
          return this; // chain-able
        },

        hasResult: function () {

          if (this.get('tab_viewed') !== 1) {
            return false;
          } else {
            return this.result.hasResult();
          }

        },

        // helper methods
        calcSuper: function () {
          var weekly = 390;

          if (this.get('partner')) {
            weekly = 300;
          }
          return (52 / this.get('super_freq')) * weekly;
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
