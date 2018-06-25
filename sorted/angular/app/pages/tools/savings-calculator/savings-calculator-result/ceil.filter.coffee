"use strict"

angular.module 'sorted'
  .filter 'ceil' , ()->
    (value)->
      Math.ceil(value)
