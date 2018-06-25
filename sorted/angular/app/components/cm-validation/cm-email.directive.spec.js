'use strict';

describe('Directive: cmValidation - cmEmail', function() {

  var element;
  var scope;
  var $compile;
  var emailInput;

  function compileDirective(attrs) {
    scope.model = '';
    element = angular.element('<form name="testForm"><input name="email" type="text" ng-model="model" cm-email ' +
      attrs + '></input></form>');

    $compile(element)(scope);
    scope.$digest();

    emailInput = scope.testForm.email;
  }

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function(_$compile_, $rootScope) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('ctrl.$validators.email', function() {

    it('should consider an empty model to be valid', function() {
      compileDirective();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the cmCondition is false', function() {
      compileDirective('cm-condition="false"');

      // Ensure that input would be invalid if cmCondition case was not executed
      scope.model = 'not$email!';
      scope.$digest();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the username part contains lowercase letters', function() {
      compileDirective();
      scope.model = 'abcd@test.com';
      scope.$digest();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the username part contains uppercase letters', function() {
      compileDirective();
      scope.model = 'ABCD@test.com';
      scope.$digest();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the username part contains numbers', function() {
      compileDirective();
      scope.model = '1234@test.com';
      scope.$digest();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the username part contains a . symbol', function() {
      compileDirective();
      scope.model = 'abc.d@test.com';
      scope.$digest();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the username part contains a + symbol', function() {
      compileDirective();
      scope.model = 'abc+d@test.com';
      scope.$digest();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the username part contains a _ symbol', function() {
      compileDirective();
      scope.model = 'abc_d@test.com';
      scope.$digest();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the username part contains a - symbol', function() {
      compileDirective();
      scope.model = 'abc-d@test.com';
      scope.$digest();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the domain part contains a _ symbol', function() {
      compileDirective();
      scope.model = 'abcd@te_st.com';
      scope.$digest();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the domain part contains a - symbol', function() {
      compileDirective();
      scope.model = 'abcd@te_st.com';
      scope.$digest();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if there are multiple domain parts separated by . characters',
    function() {
      compileDirective();
      scope.model = 'abcd@test.email.test.com';
      scope.$digest();
      expect(emailInput.$valid).toBe(true);
    });

    it('should consider the input to be invalid if it does not contain an @ symbol', function() {
      compileDirective();
      scope.model = 'test.com';
      scope.$digest();
      expect(emailInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if it does not contain a . symbol', function() {
      compileDirective();
      scope.model = 'test@test';
      scope.$digest();
      expect(emailInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if the username part contains whitespace', function() {
      compileDirective();
      scope.model = 'te st@test.com';
      scope.$digest();
      expect(emailInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if the domain part contains whitespace', function() {
      compileDirective();
      scope.model = 'test@tes t.com';
      scope.$digest();
      expect(emailInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if the username part contains a character that is not alphanumeric, ' +
      'or one of the following characters: _ . - +', function() {
      compileDirective();
      scope.model = 'te$t@test.com';
      scope.$digest();
      expect(emailInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if the domain part contains a character that is not alphanumeric, ' +
      'or one of the following characters: _ . -', function() {
      compileDirective();
      scope.model = 'test@test$.com';
      scope.$digest();
      expect(emailInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if the first domain part is longer than 66 alphabetic ' +
    'characters', function() {
      compileDirective();
      scope.model = 'test@testemailaddressisreallyreallyreallyreallyreallyreallyreallyreallylong.com';
      scope.$digest();
      expect(emailInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if the domain part finishes with with one character', function() {
      compileDirective();
      scope.model = 'test@test.c';
      scope.$digest();
      expect(emailInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if the domain part finishes with with more than six alphabetic ' +
    'characters', function() {
      compileDirective();
      scope.model = 'test@test.testtest';
      scope.$digest();
      expect(emailInput.$invalid).toBe(true);
    });

  });
});
