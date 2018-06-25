'use strict'

angular.module 'sorted'
  .directive 'socials', ['siteConfig','$location', (siteConfig,$location)->{
    restricted: 'E',
    templateUrl: "#{siteConfig.APP_PATH}app/components/socials/socials.html"
    scope: {
      data: '='
    }
    link: (scope)->
      scope.siteConfig = siteConfig
      scope.url = $location.absUrl()
      scope.$watch 'data', (data) ->
        if undefined == data.ThumbnailImage.Filename
          data.ThumbnailImage.Filename = data.CalcIcon.Filename
        scope.fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + 'https://' + $location.host() + data.Link
        return

      $('.fb-share').click (e) ->
        e.preventDefault()
        window.FB.ui({
          method: 'feed',
          name: scope.data.Title,
          link: scope.url,
          picture: 'https://'+$location.host()+'/'+scope.data.ThumbnailImage.Filename,
          caption: scope.url,
          description: scope.data.MetaDescription,
          message: ''
        })
        false

  }]
