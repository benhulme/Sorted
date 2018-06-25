'use strict'

angular.module 'sorted'
.directive 'saveTrigger',['Profile', (Profile)->{
  restricted: 'A',
  link: (scope,element)->
    throwLoginWindow = ->
      Profile.get(true).then (profile) ->
        if _.isEmpty(profile)
          angular.element('#login-modal').modal 'show'
        else
          angular.element('#save-as-modal').modal 'show'
        return

    element.click ()->
      if sessionStorage.getItem('userData') is null
        sessionStorage.setItem('triggerSave','true')
      throwLoginWindow();
      return


}]


