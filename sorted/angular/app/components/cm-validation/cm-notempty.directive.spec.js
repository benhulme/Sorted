'use strict';

describe('Directive: cmValidation - cmMoney', function() {

  var element;
  var scope;
  var $compile;
  var notemptyInput;

  function compileDirective(attrs) {
    scope.model = '';
    element = angular.element('<form name="testForm"><input name="notempty" type="text" ng-model="model" ' +
      'cm-notempty ' + attrs + '></input></form>');

    $compile(element)(scope);
    scope.$digest();

    notemptyInput = scope.testForm.notempty;
  }

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function(_$compile_, $rootScope) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('ctrl.$validators.notempty', function() {

    it('should consider the input to be valid if the cmCondition is false', function() {
      compileDirective('cm-condition="false"');

      // Ensure that input would be invalid if cmCondition case was not executed
      scope.testForm.notempty.$setViewValue(null);
      scope.$digest();
      expect(notemptyInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the element has not been touched', function() {
      compileDirective();
      scope.$digest();
      expect(notemptyInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value is at least one character', function() {
      compileDirective();
      scope.testForm.notempty.$setViewValue('1');
      scope.$digest();
      expect(notemptyInput.$valid).toBe(true);
    });

    it('should consider the input to be invalid if the value is null', function() {
      compileDirective();
      scope.testForm.notempty.$setViewValue(null);
      scope.$digest();
      expect(notemptyInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if the value is an empty string', function() {
      compileDirective();

      // Make element dirty
      scope.testForm.notempty.$setViewValue('dirty');
      scope.$digest();

      // Set it to an empty string now
      scope.testForm.notempty.$setViewValue('');
      scope.$digest();
      expect(notemptyInput.$invalid).toBe(true);
    });

  });
});
