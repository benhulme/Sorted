"use strict"

angular.module 'sorted'
.filter 'round' , ()->
  (value)->
    Math.round(value)
