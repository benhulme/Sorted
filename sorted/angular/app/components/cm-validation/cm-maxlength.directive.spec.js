'use strict';

describe('Directive: cmValidation - cmMaxlength', function() {

  var element;
  var scope;
  var $compile;
  var maxlengthInput;

  function compileDirective(attrs) {
    scope.model = '';
    element = angular.element('<form name="testForm"><input name="maxlength" type="text" ng-model="model" ' +
      'cm-maxlength="5" ' + attrs + '></input></form>');

    $compile(element)(scope);
    scope.$digest();

    maxlengthInput = scope.testForm.maxlength;
  }

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function(_$compile_, $rootScope) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('ctrl.$validators.maxlength', function() {

    it('should consider an empty model to be valid', function() {
      compileDirective();
      expect(maxlengthInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the cmCondition is false', function() {
      compileDirective('cm-condition="false"');

      // Ensure that input would be invalid if cmCondition case was not executed
      scope.model = 'longer than allowed';
      scope.$digest();
      expect(maxlengthInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value is less than the maximum length allowed', function() {
      compileDirective();
      scope.model = '1234';
      scope.$digest();
      expect(maxlengthInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value is equal to the maximum length allowed', function() {
      compileDirective();
      scope.model = '12345';
      scope.$digest();
      expect(maxlengthInput.$valid).toBe(true);
    });

    it('should consider the input to be invalid if the value is greater than the maximum length allowed', function() {
      compileDirective();
      scope.model = '123456';
      scope.$digest();
      expect(maxlengthInput.$invalid).toBe(true);
    });

  });
});
