(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .directive('restrictCurrency', restrictCurrency);

  /** @ngInject */
  function restrictCurrency() {
    var directive = {
      restrict: 'A',
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr) {

      function on_keyPressHandler(ev)
      {

        if (ev.defaultPrevented) {
          return; // Should do nothing if the default action has been cancelled
        }
        var key;
        var handled = false;
        if (ev.key !== undefined) {
          // Handle the event with KeyboardEvent.key and set handled true.
          key = ev.which;
        } else if (ev.keyIdentifier !== undefined) {
          // Handle the event with KeyboardEvent.keyIdentifier and set handled true.
          key = ev.keyIdentifier;
        } else if (ev.keyCode !== undefined) {
          // Handle the event with KeyboardEvent.keyCode and set handled true.
          key = ev.keyCode;
        }

        if (handled) {
          // Suppress "double action" if event handled
          ev.preventDefault();
        }

        // console.log(key);

        if(key == 13) // On Enter key
        {
          ev.preventDefault();

          angular.element(ev.currentTarget).blur();  // Force focus out

          return;
        }

        if(key == 49 || key == 50 || key == 51 || key == 52 || key == 53 || key == 54 || key == 55 || key == 56 || key == 57 || key == 48 || key == 44 || key == 46 || key == 8 || key == 0) {

          // Allow 1,2,3,4,5,6,7,8,9,0,.,, DELETE, DELETE

        } else {
          ev.preventDefault();
          return;
        }
      }

      function on_keyUpHandler(ev)
      {
        // Don't allow too many characters after the decimal
        // var parseString = angular.element(ev.currentTarget).val();
        // if(parseString.split('.')[1] && (parseString.split('.')[1].length > 2)) {
        //   angular.element(ev.currentTarget).val(parseString.slice(0, -1));
        // }
      }

      function on_blurHandler(ev)
      {
        var str = this.value;
        // if(str.toString().length <= 0) {
        //   str = '0';
        // }
        // console.log(str)

        str = str.replace(/,/g, '');
        var strToFloat = parseFloat(str).toFixed(2);

        if(isNaN(strToFloat)) {
          this.value = '0.00';
        } else {
          this.value = strToFloat.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
          // this.value = strToFloat.toString();
        }

        var $input = $(this);
        $input.trigger('input');
        $input.trigger('change');
      }


      function on_focusHandler(ev)
      {
        var str = this.value;
        if((parseFloat(str) <= 0) || isNaN(parseFloat(str))) {
          this.value = '';
        }
      }

      el.on('keypress', on_keyPressHandler);
      el.on('keyup', on_keyUpHandler);
      el.on('blur', on_blurHandler);
      el.on('focus', on_focusHandler);

      scope.$on('$destroy', function () {

      });
    }

  }

})();
