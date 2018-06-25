/**
 * Created by greg on 25/02/2016.
 */

"use strict";

// jshint ignore:start

angular.module('sorted')
  .factory('SavingsCalculatorModel', ['siteConfig', 'NgBackboneModel', 'NgBackboneCollection',
    function (siteConfig, NgBackboneModel, NgBackboneCollection) {

      var
        ResultModel = NgBackboneModel.extend({

          hasResult: function () {

            var self = this,
              pick = ['contributions', 'total', 'interest'];

            var t = _.reduce(self.pick(pick),
              function (outcome, obj) {
                return (!_.isNull(obj)) ? _.add(outcome, parseInt(obj)) : outcome;
              }, 0);

            return !!t; // return a boolean
          }
        }, {
          pick: [
            'total',
            'contributions',
            'interest',
            'period',
            'age',
            'total_saved',
            'nudge_age',
            'nudge_interest',
            'nudge_period',
            'nudge_total',
            'nudge_total_saved'
          ]
        });


      var
        InputModel = NgBackboneModel.extend({

          defaults: {
            saving_freq: 52,
            starting: moment().format(siteConfig.DATE_FORMAT),
            Title: 'Savings calculator'
          },

          intAttrs: ['type', 'saving_amount', 'saving_freq', 'initial_savings', 'iar'],
          floatAttrs: ['interest_rate', 'regular_amount', 'regular_duration_amount', 'nudge_dollars'],
          dateAttrs: ['starting', 'ending'],

          urlRoot: siteConfig.API_PREFIX,

          url: function () {
            var uri = this.urlRoot + '/calculator';
            return (!this.isNew()) ? uri + '/' + this.get('id') : uri;
          },

          parse: function (data) {
            var self = this,
              parsed = {};

            // strip out the result param if it exists
            if (_.has(data.result, 'result')) {
              self.result.set(_.pick(data, 'result'));
              // now remove from resp object
              data = _.omit(data, 'result');
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

            return parsed;
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

            // update ending if type, regular_amount, regular_duration_amount_type
            // & starting are present and any one of them change
            this.on('change', function (model) {

              if (model.get('type') === 0 &&
                parseInt(model.get('regular_duration_amount')) > 0 &&
                model.has('regular_duration_amount_type') &&
                model.has('starting')) {

                var duration = moment.duration(parseInt(model.get('regular_duration_amount')), model.get('regular_duration_amount_type')),
                  ending = moment(model.get('starting'), siteConfig.DATE_FORMAT).add(duration).format(siteConfig.DATE_FORMAT);

                model.set({ending: ending}, {silent: true});

              }

            });

            this.on('change:ending', function (model, value) {

              // format the ending value if present and not consistent with desired format
              var dateReg = /^\d{2}([/])\d{2}([/])\d{4}$/;
              if (value.length > -1 && !dateReg.test(value)) {
                this.set({ending: moment(value, siteConfig.DATE_FORMAT)}, {silent: true});
              }

            });

            // Provide event broadcast of result object changes
            this.listenTo(this.result, 'change', function () {
              this.trigger('result:change', this);
            });

            // trigger calculation to load default values in result
            //this.calculate(); // TODO turned off to deal with bug fix temp at this stage
          },

          calculate: function () {

            var
              result = this.calculator.calculate(_.clone(this.attributes)); // strip out result param (see toJSON)

            this.result.set(result);

            return this; // chain-able
          },

          hasResult: function () {

            if (this.attributes.type === 0) {

              var regularFreq;

              if (this.attributes.regular_duration_amount_type === 'weeks') {
                regularFreq = 52;
              } else if (this.attributes.regular_duration_amount_type === 'months') {
                regularFreq = 12;
              } else if (this.attributes.regular_duration_amount_type === 'years') {
                regularFreq = 1;
              }

              var regularDuration = 1 / regularFreq * this.attributes.regular_duration_amount;
              var savingsFreq = 1 / this.attributes.saving_freq;

              if (regularDuration < savingsFreq) {
                this.result.attributes.total = 0;
                this.result.attributes.total_saved = 0;
                this.result.attributes.interest = 0;
                this.result.attributes.period = 0;
                return false;
              }

            } else {

              var startDate = moment(this.attributes.starting, siteConfig.DATE_FORMAT);
              var endDate = moment(this.attributes.ending, siteConfig.DATE_FORMAT);

              var duration = moment.duration(endDate.diff(startDate)).asDays();

              if (duration < 7) {
                this.result.attributes.total = 0;
                this.result.attributes.total_saved = 0;
                this.result.attributes.interest = 0;
                this.result.attributes.period = 0;
                return false;
              }

            }

            return this.result.hasResult();
          },

          saveResult: function () {


            var
            /*self = this,*/
              opts = {
                success: function (model, response, options) {
                  console.info('SUCCESS: ', model, response, options);
                },
                error: function (model, response, options) {
                  console.error('ERROR: ', model, response, options);
                }
              };

            return this.save(null, opts);
          },

          loadResult: function (resultID) {

            // TODO remove as is for testing only
            this.set('id', resultID);

            var
              opts = {
                success: function (model, response, options) {
                  console.info('SUCCESS: ', model, response, options);
                },
                error: function (model, response, options) {
                  console.error('ERROR: ', model, response, options);
                }
              };


            return this.fetch(opts);
          },

          // specialize for saving of model to back-end
          toJSON: function () {
            var data = NgBackboneModel.prototype.toJSON.apply(this, arguments);

            _.merge(data, {result: this.result.toJSON()});

            // include result attributes in response
            return _.merge({Data: data}, _.pick(data, 'CalcID', 'Title'));
          },

          _toInt: function (val) {

            var parsedInteger = false;

            if (_.isEmpty(val)) {
              return val;
            }

            if (_.isInteger(val)) {
              parsedInteger = val;
            }
            else if (typeof (val) === 'string') {
              val = val.replace('$', '').replace(',', '');
              parsedInteger = parseInt(val);
            }

            return (!_.isNaN(parsedInteger)) ? parsedInteger : 0;
          },

          _toFloat: function (val, decimal) {
            var parsedFloat = false;
            if (val) {
              if (typeof (val) === 'string') {
                val = val.replace('$', '').replace(',', '');
              }
              parsedFloat = parseFloat(val).toFixed(decimal);
            }

            if (!parsedFloat || _.isNaN(parsedFloat)) {
              return false;
            } else {
              return parsedFloat;
            }
          },

          _toDate: function (val) {
            // if not empty string, build with defined format, if null then new date else don't build
            var d = (!_.isEmpty(val)) ? moment(val, siteConfig.DATE_FORMAT) : (_.isNull(val)) ? moment() : false;
            return (d) ? d.format(siteConfig.DATE_FORMAT) : "";
          },


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
          Title: 'My Savings Calculation'
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
          // TODO does response from backend have both status and data???
          if (_.has(response, 'status') && _.has(response, 'data')) {
            data = response.data;
          }
          else {
            data = response;
          }

          // set the model data on the contained collection
          if (_.has(data, 'Data')) {
            self.collection.reset(data.Data, options);
          }
          else if (_.has(data, 'models')) {
            self.collection.reset(data.models, options);
          }

          return _.omit(data, ['Data', 'models']);
        },

        hasResult: function () {
          return this.collection.hasResult();
        },

        /**
         * Specialize the fetch call
         * to handle the use of this container model for Backend
         */
        fetch: function (options) {

          return NgBackboneModel.prototype.fetch.apply(this, options);

          // make call to backend

          // parse the results BEFORE setting,

          // return success/error
        },

        toJSON: function () {
          var
            data = NgBackboneModel.prototype.toJSON.apply(this, arguments);
          return _.merge(data, {Data: this.collection.toJSON()});
        }
      });
    }]);
