(function () {
  'use strict';

  angular.module('sorted')
    .factory('colourGenerator', ['budgetingToolConfig', function (budgetingToolConfig) {
      var _gradient = 0;
      var _baseColour = 0;

      // Returns a hex colour code faded to white by `fraction` percent
      // (that is, 0.25 would be closer to white than 0.75).
      function fadeColour(colour, fraction) {
        if (fraction >= 1) {
          return colour;
        }
        var components = colour.match(/[a-f\d]{2}/gi);
        return '#' + 
          _.map(components, function (n) { 
            var colourComponent = Math.floor(parseInt(n, 16) * fraction);
            var whiteComponent = Math.floor(255 * (1 - fraction));
            return (colourComponent + whiteComponent).toString(16);
          })
         .join('');
      }

      // RGBA from hex
      function hexToRgba (colour, opacity) {
        var components = colour.match(/[a-f\d]{2}/gi);
        return 'rgba(' + _.map(components, function (n) { 
            return parseInt(n, 16);
          })
          .join(',') + ',' + opacity + ')';
      }

      // Supply gradually fading variants of the defined app colours, then start
      // re-using them only when they run out.
      function getNextColour() {
        if (_baseColour >= budgetingToolConfig.COLOUR_SET.length) {
          _baseColour = 0;
          _gradient++;
        }
        if (_gradient >= budgetingToolConfig.COLOUR_GRADIENTS.length) {
          _gradient = 0;
        }
        return fadeColour(
          budgetingToolConfig.COLOUR_SET[_baseColour++],
          budgetingToolConfig.COLOUR_GRADIENTS[_gradient]
        );
      }

      // Use at beginning if no amounts are budgeted yet
      function getStartColour(colour) {
        return fadeColour(colour, 0.5);
      }

      return {
        getNextColour: getNextColour,
        getStartColour: getStartColour,
        hexToRgba: hexToRgba
      };
    }
  ]);

})();
