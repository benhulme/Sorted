(function() {
  'use strict';
  angular.module('sorted')
    .directive('popover',  ['siteConfig', function(siteConfig) {
      return {
        //templateUrl: siteConfig.APP_PATH + 'app/components/popover/popover.html',
        restrict: 'E',
        scope: {
          data: '=',
        },
        link: function(scope, elm) {

          scope.attachTemplate(elm);

          scope.close = function() {
            elm.find('[   data-toggle="popover"  ]').popover('hide');

          };

          elm.on('click', '.popover-close', scope.close);

        },
        controller: ['$scope', '$compile', '$sce', '$templateRequest', '$analytics',
          function($scope, $compile, $sce, $templateRequest, $analytics) {   
              
              var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
//              var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
//              var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;   
              
            function requestSuccess(template) {
              $analytics.eventTrack('view', {
                category: 'glossary', action: 'view'
              });
              var compiledTemplate = $compile(angular.element('<div>').html(template))($scope);
              $scope.elm.find('[   data-toggle="popover"  ]').attr('data-template', compiledTemplate.html());
              $scope.elm.find('[   data-toggle="popover"  ]').popover()
                .on("click", function(ev)
                {
                  ev.preventDefault();
                  
//                  var $this = $(this);
                  
                  // jQuery/Bootstrap Popover don't work great in ng-SWITCHEs
                  // Apply the popover if not in Chrome. Default interaction works in Chrome
                  if(!isChrome) {
                        $(this).popover('show');
                    }
                    
                });
            }

            $scope.attachTemplate = function(elm) {
              $scope.elm = elm;
              var templateUrl = $sce.getTrustedResourceUrl(siteConfig.APP_PATH + 'app/components/popover/popover.html');
              $templateRequest(templateUrl).then(requestSuccess);
            };

          },
        ],
      };
    },
  ]);
    
    
     
    
}());
