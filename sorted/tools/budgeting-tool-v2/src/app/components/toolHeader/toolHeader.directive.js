(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .directive('toolHeader', toolHeader);

  /** @ngInject */
  function toolHeader(siteConfig) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/toolHeader/toolHeader.html',
      scope: {
        data:'=',
        profiledata : '=',
        budgetdata : '=',
        breadcrumbs: '=',
        imagepath: '='
      },
      controller: ToolheaderController,
      controllerAs: 'vm'
    };

    return directive;

    /** @ngInject */
    function ToolheaderController($uibModal,
                                  BudgetCalculator,
                                  profileApi,
                                  $scope,
                                  $rootScope,
                                  Api) {
      var vm = this;

      vm.TOOL_ASSETS = siteConfig.TOOL_ASSETS;
      vm.Api = Api;
      vm.profileApi = profileApi;
      vm.imagepath;

      $rootScope.$watch('userLogged', function () {
        if ($rootScope.userLogged) {
          // see if the user is logged in
          profileApi.isLoggedIn().then(function(response)
          {

            // se the users profile image
            if(profileApi.getProfile()) {
              // set the image of the logged in user //TODO: this needs to handle users with no images
              console.log('set user image', profileApi.getProfile().Image.Filename);
              if(profileApi.getProfile().Image.ID != 0 ) {

                vm.imagepath = './' + profileApi.getProfile().Image.Filename;


              }


            }
        })

        }
      });

      $scope.$watch('imagepath', function(newValue) {
        if (!newValue) return;
        vm.imagepath = newValue;
      });


      vm.onSave_clickHandler = function(ev)
      {
        ev.preventDefault();
        var parseObj = BudgetCalculator.current.parseForUpload();

        Api.saveBudget(parseObj);

      }


      vm.isLoggedIn = function () {
         if (vm.profileApi.getProfile()) {
           return true;
         }else {
           return false;
         }
     }

    }
  }

})();
