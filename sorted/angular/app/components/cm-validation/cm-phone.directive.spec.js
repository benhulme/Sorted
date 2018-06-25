'use strict';

describe('Directive: cmValidation - cmPhone', function() {

  var element;
  var scope;
  var $compile;
  var phoneInput;

  function compileDirective(attrs) {
    scope.phoneModel = '';
    element = angular.element('<form name="testForm"><input name="phone" type="text" ng-model="phoneModel" cm-phone ' +
      attrs + '></input></form>');

    $compile(element)(scope);
    scope.$digest();

    phoneInput = scope.testForm.phone;
  }

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function(_$compile_, $rootScope) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('ctrl.$validators.phone', function() {

    it('should consider an empty model to be valid', function() {
      compileDirective();
      expect(phoneInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the cmCondition is false', function() {
      compileDirective('cm-condition="false"');

      // Ensure that input would be invalid if cmCondition case was not executed
      scope.phoneModel = 'not a phone number';
      scope.$digest();
      expect(phoneInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains only numbers', function() {
      compileDirective();
      scope.phoneModel = '1234';
      scope.$digest();
      expect(phoneInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains a plus and then numbers', function() {
      compileDirective();
      scope.phoneModel = '+1234';
      scope.$digest();
      expect(phoneInput.$valid).toBe(true);
    });

    it('should consider the input to be invalid if the value contains numbers and then a plus', function() {
      compileDirective();
      scope.phoneModel = '1234+';
      scope.$digest();
      expect(phoneInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if the value contains characters', function() {
      compileDirective();
      scope.phoneModel = 'hi';
      scope.$digest();
      expect(phoneInput.$invalid).toBe(true);
    });

  });
});
