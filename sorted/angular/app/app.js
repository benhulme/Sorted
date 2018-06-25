/* global $_gah2Anoh */
(function () {

  'use strict';

  angular.module('cmValidation', []);
  angular.module('budgetingTool', [
    'ng.deviceDetector',
    'ngResource',
    'kendo.directives',
    'sorted.config',
    'sorted.http'
  ]);
  angular.module('sorted.http', []);

  angular.module('sorted', [
      'ngRoute',
      'ngAnimate',
      'ngSanitize',
      'ngTouch',
      'sorted.config',
      'sorted.http',
      'cmValidation',
      'budgetingTool',
      'rzModule',
      'ui.bootstrap',
      'angularMoment',
      'kendo.directives',
      'ngBackbone',
      'ngLodash', // required for backbone remap of underscore => lodash
      'angulartics',
      'angulartics.google.tagmanager',
      'ngDragDrop'
    ])
    .config(['$routeProvider', '$httpProvider', '$locationProvider',
      function ($routeProvider, $httpProvider, $locationProvider) {
          $locationProvider.html5Mode(true);

        /*$routeProvider
          .otherwise({
            redirectTo: '/',
          });
          */

        $httpProvider
          .defaults.headers.common['X-Csrf-Token'] = $_gah2Anoh;
          
          
          // jQuery/Bootstrap Popover don't work great in ng-SWITCHEs
          // Apply the popover if not in Chrome. Default interaction works in Chrome
          var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
          if(!isChrome) {
               $('body').on('click', function (e) {
                    $('[data-toggle="popover"]').each(function () {
                        //the 'is' for buttons that trigger popups
                        //the 'has' for icons within a button that triggers a popup
                        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                            $(this).popover('hide');
                        }
                    });
                });
            }
          
          
      }])
    .controller('MetaController', ['$scope', '$rootScope', function($scope, $rootScope){
      $scope.metadata = {
        'title': 'Sorted.org.nz',
        'description': 'Sorted offers New Zealanders free, impartial information and calculators to help manage their money throughout life.  ',
        'thumbnail' : 'https://www.sorted.org.nz/themes/sorted/images/sorted-og-image-default.jpg'
      };

        $scope.title = function(name){
          return $scope.metadata.title + ' - ' + name;
        };


      // whenever a controller emits the newPageLoaded event, we update the app's metadata
      $rootScope.$on('newPageLoaded', function(event, metadata) {
        $scope.metadata = metadata;
      });
    }]);

}());
