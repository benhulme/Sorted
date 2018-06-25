(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .directive('preventInputZoom', preventInputZoom);

  /** @ngInject */
  function preventInputZoom() {
    var directive = {
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr) {

      function on_focusHandler(ev)
      {
        this.className += ' font-prevent-zoom';
        this.classList.remove('font-prevent-zoom');
      }

      el.on('focus', on_focusHandler);

      scope.$on('$destroy', function () {

      });
    }

  }

})();
