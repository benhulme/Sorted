"use strict"

angular.module 'sorted'
.filter 'toInt' , ()->
  (value)->
    parseInt(value) || 0
