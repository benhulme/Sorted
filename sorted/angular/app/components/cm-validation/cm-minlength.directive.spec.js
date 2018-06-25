'use strict';

describe('Directive: cmValidation - cmMinlength', function() {

  var element;
  var scope;
  var $compile;
  var minlengthInput;

  function compileDirective(attrs) {
    scope.model = '';
    element = angular.element('<form name="testForm"><input name="minlength" type="text" ng-model="model" ' +
      'cm-minlength="5" ' + attrs + '></input></form>');

    $compile(element)(scope);
    scope.$digest();

    minlengthInput = scope.testForm.minlength;
  }

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function(_$compile_, $rootScope) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('ctrl.$validators.minlength', function() {

    it('should consider an empty model to be valid', function() {
      compileDirective();
      expect(minlengthInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the cmCondition is false', function() {
      compileDirective('cm-condition="false"');

      // Ensure that input would be invalid if cmCondition case was not executed
      scope.model = 'hi';
      scope.$digest();
      expect(minlengthInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value is greater than the minimum length allowed', function() {
      compileDirective();
      scope.model = '123456';
      scope.$digest();
      expect(minlengthInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value is equal to the minimum length allowed', function() {
      compileDirective();
      scope.model = '12345';
      scope.$digest();
      expect(minlengthInput.$valid).toBe(true);
    });

    it('should consider the input to be invalid if the value is less than the minimum length allowed', function() {
      compileDirective();
      scope.model = '1234';
      scope.$digest();
      expect(minlengthInput.$invalid).toBe(true);
    });

  });
});
