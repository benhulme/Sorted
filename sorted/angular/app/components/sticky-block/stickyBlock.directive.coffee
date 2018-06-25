'use strict'

angular.module('sorted')
  .directive 'stickyBlock', ()->{
    restrict: 'A',
    link: (scope,element)->
      topOff = element.offset().top - 97
      if window.outerWidth > 1024
        botOff = 800
        element.affix({
          offset: {
            top: topOff,
            bottom: botOff
          }
        })

      return

  }
