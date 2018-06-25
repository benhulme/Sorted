'use strict'

angular.module 'sorted'
  .filter 'toTrusted', ['$sce', ($sce)->
    (text)->
      $sce.trustAsHtml(text);
  ]
