/**
 * Created by greg on 7/03/2016.
 *
 * Structure:
 * -
 */



// jshint ignore:start
"use strict";


angular.module('sorted')
  .factory('MortgageToolModel', ['siteConfig', 'NgBackboneModel', 'NgBackboneCollection',
    function (siteConfig, NgBackboneModel, NgBackboneCollection) {

      var lastCalcUsed = '';

      /**
       * ResultModel represents the results returned from the
       * sorted calculator for a specific Mortgage.
       *
       * It is directly related (owned by) an InputModel
       */
      var
        ResultModel = NgBackboneModel.extend({

          initialize: function (attributes, options) {

            // pass a reference to the parent model, so it can
            // be accessed in change:total below
            if (_.has(options, 'parent')) {
              this.parent = options.parent;
            }

            /**
             * Calculator Result fudge - add the lump_sum_repayment amount to the result.total
             * to get the original total value (sorted calculator workaround).
             */
            this.on('change:total', function () {
              var pT = parseInt(this.get('total')),
                pLSR = parseInt(this.parent.get('lump_sum_repayment'));

              if (_.isInteger(pT) && _.isInteger(pLSR)) {
                var newTotal = _.add(pT, pLSR);
                this.set({total: newTotal}, {silent: true});
              }
            });

            /**
             * Update the result object's min_repayment if model repayment differs e.g. when
             * the 'other' calculator result (doesn't return repayment) is used
             */
            this.listenTo(this.parent, 'change:repayments1', function () {
              var repayments1 = _.round(this.parent.get('repayments1')),
                min_repayment = _.round(this.get('min_repayment'));

              if (repayments1 !== min_repayment) {
                this.set({min_repayment: repayments1}, {silent: true});
              }
            });

            /**
             * Custom event handler for event triggered by ModelCollection
             * to ensure all Models share the month_born & year_born
             * values entered by a User
             *
             * TODO need to check why this has not been implemented
             */
            /*this.on('update:age', function (data) {
             console.info('result update:age heard: ', data, this.get('age'));
             });*/
          },

          calcResult: function () {
            var self = this;

            return _.reduce(self.pick(['total', 'interest']), function (outcome, obj) {
              return (!_.isNaN(obj)) ? _.add(outcome, parseInt(obj)) : outcome;
            }, 0);
          },

          hasResult: function () {
            return (this.calcResult()); // return a boolean
          }
        });

      /**
       * InputModel represents the details entered about a single Mortgage
       * e.g. loan amount, interest rate, etc
       */
      var
        InputModel = NgBackboneModel.extend({

          constructor: function () {
            // set up a reference to a resultModel
            this.result = new ResultModel(null, {parent: this}); // pass reference to self
            NgBackboneModel.apply(this, arguments);
          },

          initialize: function (attributes, options) {
            // assign reference to 'sorted calculator'
            if (_.has(options, 'mortgageRepayment')) {
              this.mortgageRepayment = options.mortgageRepayment;
            }

            if (_.has(options, 'mortgageManager')) {
              this.mortgageManager = options.mortgageManager;
            }

            // cast as integer: month_born & year_born
            this.on('change:year_born change:month_born', function (model) {
              var
                changed = _.clone(model.changed),
                parsed = _.transform(changed, function (result, v, k) {
                  result[k] = (!isNaN(v)) ? parseInt(v) : null;
                }, {});

              // update the model silently
              model.set(parsed, {silent: true});
            });

            // proxy event emitter
            this.listenTo(this.result, 'change', function () {
              this.trigger('result:change', this);
            });

            // update the repayment amount if differs from result:min_repayment
            this.listenTo(this.result, 'change:min_repayment', function () {
              if (this.result.get('min_repayment') !== this.get('repayments1')) {
                this.set({repayments1: _.round(this.result.get('min_repayment'))}, {silent: true});
              }
            });

            // update the model term if result time differs
            this.listenTo(this.result, 'change:time', function () {
              var
                term = parseInt(this.get('term1')),
                time = _.round(this.result.get('time'));

              if (time !== term) {
                this.set({term1: time}, {silent: true});
              }
            });
          },

          parse: function (data, options) {
            var self = this,
              opts = options || {};

            // strip out the result param if it exists
            if (_.has(data.result, 'result')) {
              self.result.set(_.pick(data, 'result'), opts);
            }

            if (data) {

              data.id = parseInt(data.unique.substr(data.unique.length - 1)) - 1;

            }

            return _.omit(data, ['result']);
          },


          calculate: function () {

            var
              result = this._getCalculator().calculate(this._prepare(this.attributes));

            //ceil the repayment time
            result.mortgage1.time = Math.ceil(result.mortgage1.time);

            // only use the first result for each model
            this.result.set(result.mortgage1);
            return this; // chain-able
          },
          calculateSlider: function (term) {
            var data = this.pick(['loan1', 'interest1', 'freq1', 'lump_sum_repayment']);

            data.term1 = term;

            if (data.lump_sum_repayment > 0) {
              data.loan1 = data.loan1 - data.lump_sum_repayment;
            }

            var result = this.mortgageRepayment.calculate(data);
            return result.mortgage1.min_repayment;
          },

          /**
           * If last modified = repaymentAmount -> mortgageManager
           * if last modified = mortgageTerm -> mortgageRepayment
           * else use last used calculator
           *
           */
          _getCalculator: function () {

            if (this.hasChanged('repayments1') && !this.hasChanged('term1')) {
              lastCalcUsed = 'mortgageManager';
            }
            else if (this.hasChanged('term1') && !this.hasChanged('repayments1')) {
              lastCalcUsed = 'mortgageRepayment';
            }

            if (!lastCalcUsed) {
              lastCalcUsed = 'mortgageManager';
            }

            return this[lastCalcUsed];

          },

          _prepare: function (data) {
            var
              d = _.pick(_.clone(data), ['loan1', 'interest1', 'repayments1', 'freq1', 'term1', 'lump_sum_repayment', 'year_born1', 'month_born1']);

            // subtract lump_sum_repayment from loan amount and zero lsr prior to calculation - work around for 'sorted calc'.
            var r = _.merge(d, {loan1: d.loan1 - d.lump_sum_repayment, lump_sum_repayment: 0});

            var month, year;

            //find which month & year has been set

            if (this.collection.models[0].attributes.year_born1 && this.collection.models[0].attributes.month_born1) {

              month = this.collection.models[0].attributes.month_born1;
              year = this.collection.models[0].attributes.year_born1;

            } else if (this.collection.models[1].attributes.year_born1 && this.collection.models[1].attributes.month_born1) {

              month = this.collection.models[1].attributes.month_born1;
              year = this.collection.models[1].attributes.year_born1;

            } else if (this.collection.models[2].attributes.year_born1 && this.collection.models[2].attributes.month_born1) {

              month = this.collection.models[2].attributes.month_born1;
              year = this.collection.models[2].attributes.year_born1;

            }

            //set all the months and years to be the same

            if (month && year) {
              this.collection.models[0].attributes.month_born1 = month;
              this.collection.models[0].attributes.year_born1 = year;
              this.collection.models[1].attributes.month_born1 = month;
              this.collection.models[1].attributes.year_born1 = year;
              this.collection.models[2].attributes.month_born1 = month;
              this.collection.models[2].attributes.year_born1 = year;
            }

            

            r.year_born1 = year;
            r.month_born1 = month;

            return r;
          },

          calcMinRepaymentAmt: function () {
            var thirtyYears = this.pick(['loan1', 'interest1', 'freq1']);
            _.merge(thirtyYears, {term1: 30});

            var result = this.mortgageRepayment.calculate(thirtyYears);

            return result.mortgage1.min_repayment;
          },

          hasResult: function () {
            return this.result.hasResult();
          },

          // used for detecting changes to inputs causing invalid results
          validate: function () {

            if (!this.hasResult()) {
              return 'Invalid';
            }
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
       * aka InputModelCollection
       *
       * required as there are 3 Mortgages current and each
       * require independant calculation and storage capability
       *
       */
      var
        InputCollection = NgBackboneCollection.extend({

          model: InputModel,

          initialize: function (models, options) {

            if (_.has(options, ['parent'])) {
              this.parent = options.parent;
            }

            // ensure all models in collection have the user birth dates
            // this.on('change', function (model) {
            //   var
            //     birthAttrs = ['year_born', 'month_born'],
            //     changedAttrs = _.keys(model.changed);

            //   // if one of the birthdate related attributes has updated, then ....
            //   if (_.intersection(birthAttrs, changedAttrs).length) {

            //     this.each(function (m) {

            //       // update all 'other' models
            //       if (m.id !== model.id) {
            //         m.set(_.pick(model.changed, [birthAttrs]), {silent: true});
            //       }

            //       // if both year_born & month_born are set, then update result age value
            //       if (m.has(birthAttrs[0]) && m.has(birthAttrs[1])) {
            //         m.result.trigger('update:age', m.pick(['month_born', 'year_born']));
            //       }
            //     });
            //   }

            // }, this); // context

          },

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
       * aka MortgageToolModel
       *
       */
      return NgBackboneModel.extend({
        idAttribute: 'ID',

        urlRoot: siteConfig.API_PREFIX,

        defaults: {
          Title: 'My Mortgage Calculator'
        },

        url: function () {
          var uri = this.urlRoot + '/rest/tool';
          return (!this.isNew()) ? uri + '/' + this.get('ID') : uri;
        },

        constructor: function () {
          this.collection = new InputCollection(null, {parent: this});
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


          // Set the model data on the contained collection
          // Note: Do NOT use 'reset' as it will result in
          // the InputModel's not having a sorted calculator
          // available to 'calculate'
          if (_.has(data, 'Data')) {
            self.collection.set(data.Data, options);
          }
          else if (_.has(data, 'models')) {
            self.collection.set(data.models, options);
          }

          // ensure ID is stored as Int so existing model can be
          // found during fetch
          if (_.has(data, 'ID')) {
            _.merge(data, {ID: _.toString(data.ID)});
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
