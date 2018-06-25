'use strict';

describe('Factory: calcPreviewModel', function() {

  var model;

  beforeEach(function() {
    module('sorted');
    inject(function(calcPreviewModel) {
      model = calcPreviewModel;
    });
  });

  describe('Initialization', function() {

    it('should initialise an empty model', function() {

      expect(model.fields.salary).toBeNull();
      expect(model.fields.expense).toBeNull();
    });

  });

  describe('Functions', function() {

    it('should reset all fields', function() {

      model.fields.salary = 1000;
      model.fields.expense = 1000;
      model.reset();

      expect(model.fields.salary).toBeNull();
      expect(model.fields.expense).toBeNull();
    });

    it('should remove commas and dollar signs and format as float', function() {

      model.fields.salary = '$1,000';
      model.fields.expense = '$9,000.00';
      var prepared = model.prepare(model.fields);
      var salary = parseFloat(1000).toFixed(2);
      var expense = parseFloat(9000).toFixed(2);

      expect(prepared.salary).toBe(salary);
      expect(prepared.expense).toBe(expense);
    });
  });
});
