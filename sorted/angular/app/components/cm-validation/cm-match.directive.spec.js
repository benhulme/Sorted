'use strict';

describe('Directive: cmValidation - cmMatch', function() {

  var element;
  var scope;
  var $compile;
  var matchInput;

  function compileDirective(attrs) {
    scope.model = '';
    scope.modelToMatch = '';
    element = angular.element('<form name="testForm"><input name="inputToMatch" type="text" ng-model="modelToMatch">' +
      '</input><input name="match" type="text" ng-model="model" cm-match="inputToMatch" ' + attrs + '></input></form>');

    $compile(element)(scope);
    scope.$digest();

    matchInput = scope.testForm.match;
  }

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function(_$compile_, $rootScope) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('ctrl.$validators.match', function() {

    it('should consider an empty model to be valid', function() {
      compileDirective();
      expect(matchInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the cmCondition is false', function() {
      compileDirective('cm-condition="false"');

      // Ensure that input would be invalid if cmCondition case was not executed
      scope.model = 'not matching';
      scope.$digest();
      expect(matchInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value matches the corresponding field to match', function() {
      compileDirective();
      scope.modelToMatch = 'match this';
      scope.model = 'match this';
      scope.$digest();
      expect(matchInput.$valid).toBe(true);
    });

    it('should consider the input to be invalid if the value does not match the corresponding field to match',
    function() {
      compileDirective();
      scope.modelToMatch = 'match this';
      scope.model = 'no way';
      scope.$digest();
      expect(matchInput.$invalid).toBe(true);
    });

  });
});
