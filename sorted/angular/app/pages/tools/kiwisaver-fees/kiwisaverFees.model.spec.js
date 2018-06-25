'use strict';

describe('Factory: kiwisaverFeesModel', function() {

  var model;

  beforeEach(function() {
    module('sorted');
    inject(function(retirementPlannerModel) {
      model = retirementPlannerModel;
    });
  });

  describe('Initialization', function() {

    it('should initialise an empty model', function() {

      expect(model.fields.loanAmount).toBeNull();
      expect(model.fields.interestRate).toBeNull();
      expect(model.fields.repaymentAmount).toBeNull();
      expect(model.fields.repaymentFrequency).toBeNull();
      expect(model.fields.mortgageTerm).toBeNull();
      expect(model.fields.lumpSumRepayment).toBeNull();

    });

  });

  describe('Functions', function() {

    it('should reset all fields', function() {

      model.fields.loanAmount = 100000;
      model.fields.interestRate = 10;
      model.fields.repaymentAmount = 1000;
      model.fields.repaymentFrequency = 'WEEKLY';
      model.fields.mortgageTerm = 10;
      model.fields.lumpSumRepayment = 10000;

      model.reset();

      expect(model.fields.salary).toBeNull();
      expect(model.fields.expense).toBeNull();
    });

    it('should remove commas and dollar signs and format as float', function() {

      model.fields.loanAmount = '$1,000';
      model.fields.repaymentAmount = '$9,000.00';
      var prepared = model.prepare(model.fields);
      var loanAmount = parseFloat(1000).toFixed(2);
      var repaymentAmount = parseFloat(9000).toFixed(2);

      expect(prepared.loanAmount).toBe(loanAmount);
      expect(prepared.repaymentAmount).toBe(repaymentAmount);
    });
  });
});
