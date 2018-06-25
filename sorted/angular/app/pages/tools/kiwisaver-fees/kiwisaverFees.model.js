/**
 * Created by greg on 6/03/2016.
 */

angular.module('sorted')
  .factory('KiwisaverFeesModel', ['siteConfig', 'NgBackboneModel', 'NgBackboneCollection',
    function (siteConfig, NgBackboneModel, NgBackboneCollection) {
      "use strict";

      var
        SchemeModel = NgBackboneModel.extend({
          // add an attribute to store whether model is being compared
          defaults: {
            compare: 0
          },

          initialize: function () {
            this.on('change:compare', function () {
            }, this);
          }
        });

      var NominalResultCollection = NgBackboneCollection.extend({
        model: SchemeModel
      });

      var TodaysResultCollection = NgBackboneCollection.extend({
        model: SchemeModel
      });

      var ResultModel = NgBackboneModel.extend({

        constructor: function () {
          // set up a reference to a resultModel
          this.todays = new TodaysResultCollection();
          this.nominal = new NominalResultCollection();
          NgBackboneModel.apply(this, arguments);
        },

        initialize: function () {
          // proxy to result collection change events
          this.listenTo(this.todays, 'change', function () {
            this.trigger('result:change');
          });
        },

        parse: function (data, options) {
          var
            todays = [],
            nominal = [];

          _.forEach(data, function (obj) {
            todays.push(obj.todays);
            nominal.push(obj.nominal);
          });

          this.todays.reset(todays, options);
          this.nominal.reset(nominal, options);

          return data;
        },

        // custom reset method
        reset: function (data, options) {
          this.parse(data, options || {});
          return this;
        },

        hasResult: function () {

          /*var self = this,
           pick = ['retirement_lump_sum', 'retirement_income', 'years_3', 'years_5'];

           var t = _.reduce(self.pick(pick),
           function (outcome, obj) {
           return (!_.isNull(obj)) ? _.add(outcome, parseInt(obj)) : outcome;
           }, 0);

           return !!t; // return a boolean*/

          return true; //TODO need to add logic here if required;
        },

        toJSON: function () {
          return _.merge(
            {},
            {todays: this.todays.toJSON()},
            {nominal: this.nominal.toJSON()}
          );
        }
      });


      return NgBackboneModel.extend({

        idAttribute: 'ID',

        defaults: {
          Title: 'KiwiSaver fees calculator'
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

          this.on('change:year_born change:month_born', function (model) {

            if (model.has('year_born') && model.has('month_born')) {

              var date = '01/' + model.get('month_born') + '/' + model.get('year_born'),
                birthdate = moment(date, siteConfig.DATE_FORMAT);

              if (birthdate.isValid()) {
                model.set('my_birthdate', birthdate.format(siteConfig.DATE_FORMAT));
              }
            }
          });
        },

        parse: function (response) {
          var
            data = {};

          // handle responses from backend
          if (_.has(response, 'status') && _.has(response, 'data')) {
            data = response.data;

            if (_.has(data, 'Data')) {
              data = data.Data;
              _.merge(data, _.pick(response.data.Data, 'Title'), _.pick(response.data, 'ID'));
            }
          }
          else {
            data = response;
          }

          // strip out the result param if it exists - Result not being saved at present
          /*if (_.has(data, 'Data') && _.has(data.Data, 'result')) {
            self.result.reset(_.pick(data, 'result'), opts);
          }*/

          return _.omit(data, ['result', 'Data']);
        },

        loadDummyData: function (dummyData) {
          return this.calculate(dummyData);
        },

        calculate: function (dummyData) {
          var
            self = this,
            deferred = $.Deferred(),
            data = dummyData || this._prepare();

          // register an event handler for the standalone calculator
          $(document).on('ksfcalcend', function () {

            self.calculating = false;

            self.result.reset(self.calculator.model.results); // custom method

            return deferred.resolve(self);
          });

          this.calculator.calculate(data); // (data) transform attr values for calculation

          // return a promise
          return deferred.promise();
        },

        /**
         *
         * @private
         */
        _prepare: function () {
          // transform employment to boolean
          var attrs = _.clone(this.attributes);
          return _.merge(attrs, {
            employment: (attrs.employment === '1') ? true : false,
            iac: (attrs.iac === 1) ? true : false,
          });
        },

        hasResult: function () {
          return (this.result.nominal.length > 0 && this.result.todays.length > 0);
        },

        toJSON: function () {
          var
            data = NgBackboneModel.prototype.toJSON.apply(this, arguments);

          // Don't store the Scheme data for time being
          //_.merge(data, {result: this.result.toJSON()});

          return _.merge(
            {Data: data},
            _.pick(data, 'CalcID'),
            (_.has(data, 'Title')) ? _.pick(data, 'Title') : {Title: 'My KiwiSaver Fees calculation'}
          );
        },

        // a crude, yet simple way of ensuring minimum data prior to calculation
        // due to expensive time taken to complete
        validate: function (attrs) {
          function inValidCheck(list) {
            var invalid = [];
            _.forEach(list, function (val, key) {
              if (!_.isNumber(val) && _.isEmpty(val)) {
                return invalid.push(key);
              }
            });
            return (invalid.length);
          }

          if (attrs.employment === '1') { // employed
            if (inValidCheck(_.omit(attrs, ['earnings', 'contrib', 'contrib_freq']))) {
              return 'Invalid';
            }
          }
          else if (attrs.employment !== '1') {
            if (inValidCheck(_.omit(attrs, ['salary', 'employee_contrib', 'employer_contrib']))) {
              return 'Invalid';
            }
          }
        }
      });

    }]);
