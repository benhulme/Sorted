(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .controller('AddEditSubCategoryController', AddEditSubCategoryController);

  /** @ngInject */
  function AddEditSubCategoryController(profileApi,
                                    siteConfig,
                                    SiteData,
                                    Api,
                                    $timeout,
                                    $scope,
                                    $rootScope,
                                    $uibModalInstance,
                                    Upload,
                                    budgetingToolConfig,
                                    mastercategoryData,
                                    BudgetCalculator,
                                    subcategoryData,
                                    masterCategoryIndex,
                                    categoryIndex) {

    var vm = this;

    vm.title = 'Add Category';

    vm.profileApi = profileApi;

    vm.mastercategoryData = mastercategoryData;
    vm.categoryIndex = categoryIndex;
    vm.masterCategoryIndex = masterCategoryIndex;

    vm.initialPeriod = budgetingToolConfig.BUDGET_PERIODS[budgetingToolConfig.DEFAULT_BUDGET_PERIOD];
    vm.budgetPeriods = budgetingToolConfig.BUDGET_PERIODS;
    vm.budget = '0.0';

    vm.uploadProgress = 0;
    vm.isUploading = false;

    vm.period = angular.copy(vm.initialPeriod);

    vm.isEdit = false;
    vm.newCategory = {
      Title : ''
    };

    vm.isLoggedIn = false;

    profileApi.isLoggedIn().then(function (resp) {
      vm.isLoggedIn = resp
    });


    // if sub category data is passed we are an edit not create
    if(subcategoryData) {

      console.log(subcategoryData);
      vm.title = 'Edit Category';
      vm.initialPeriod = subcategoryData.Period;
      vm.budget = subcategoryData.ValueFormattedString;
      vm.newCategory.Title = subcategoryData.Title;
      vm.newCategory.File = subcategoryData.Image;
      vm.subcategoryData = subcategoryData;
      vm.isEdit = true;
    }

    // Category image upload
    var _fileToUpload;

    $scope.$watch('$ctrl.files', function () {
      $scope.upload(vm.files);
    });
    $scope.$watch('$ctrl.file', function () {
      if ($scope.file != null) {
        vm.files = [vm.file];
      }
    });

    $scope.upload = function (file) {

      var url = vm.profileApi.getUploadURL();
      console.log(url);

      if (file) {

          if (!file.$error) {
            Upload.upload({
              url: url,
              data: {
                Image: file
              }
            }).then(function (resp) {


              vm.isUploading = false;
              vm.newCategory.File = '.' + resp.data.data.imageURL;

              $timeout(function() {

                vm.isUploading = false;
                vm.newCategory.File = '.' + resp.data.data.imageURL;

              });
            }, null, function (evt) {
              vm.isUploading = true;
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('P');
              console.log(progressPercentage);
              console.log(evt);
              vm.uploadProgress = progressPercentage;
              // $scope.log = 'progress: ' + progressPercentage +
              //   '% ' + evt.config.data.file.name + '\n' +
              //   $scope.log;
            });
          }

      }
    };

    vm.onSetPeriod_clickHandler = function(ev, period)
    {
      var tempPeriod = angular.copy(period);

      vm.period = tempPeriod;
    }

    //
    // $scope.upload = function (file) {
    //
    //   console.log('UPLOAD')
    //   console.log(file);
    //
    //   if (file) {
    //     if (!file.$error) {
    //
    //       _fileToUpload = file;
    //
    //       if(file.type.match('image')) {
    //
    //         console.log('file is image')
    //
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //           $timeout(function()
    //           {
    //             vm.newCategory.File = e.target.result;
    //           },1);
    //
    //         }
    //         reader.readAsDataURL(file);
    //
    //         vm.profileApi.uploadBudgetImage(_fileToUpload).then(function (e) {
    //           console.log('---------------------')
    //           console.log(e);
    //         })
    //       }
    //     }
    //   }
    // }

    vm.createCategory = function()
    {
      var obj = angular.copy(vm.newCategory);

      var numValid = 0;
      var maxValid = 1;

      if(obj.Title.length >= 0) {
        numValid++;
      }

      if(numValid == maxValid) {
        BudgetCalculator.current.addNewSubCategoryToMasterCategory(
          mastercategoryData['masterCategoryIndex'],
          mastercategoryData['masterCategoryID'], obj.Title,
          BudgetCalculator.current.strDollarsToCents(vm.budget),
          vm.period,
          vm.newCategory.File
        );

        $rootScope.$broadcast('chartRefresh');


        $uibModalInstance.close();
      }
    }


    vm.updateCategory = function () {
      $uibModalInstance.close();

      var obj = angular.copy(vm.newCategory);


      BudgetCalculator.current.updateSubCategoryByIndex(
        masterCategoryIndex,
        categoryIndex,
        obj.Title,
        BudgetCalculator.current.strDollarsToCents(vm.budget),
        vm.period,
        vm.newCategory.File
      )
      $rootScope.$broadcast('chartRefresh');

    }

    vm.onCategoryName_keyUpHandler = function(ev)
    {
      if (ev.defaultPrevented) {
        return; // Should do nothing if the default action has been cancelled
      }
      var key;
      var handled = false;
      if (ev.key !== undefined) {
        // Handle the event with KeyboardEvent.key and set handled true.
        key = ev.which;
      } else if (ev.keyIdentifier !== undefined) {
        // Handle the event with KeyboardEvent.keyIdentifier and set handled true.
        key = ev.keyIdentifier;
      } else if (ev.keyCode !== undefined) {
        // Handle the event with KeyboardEvent.keyCode and set handled true.
        key = ev.keyCode;
      }

      if (handled) {
        // Suppress "double action" if event handled
        ev.preventDefault();
      }


      if(key == 13) { // On tapping Enter key

        if(vm.isEdit) {
          vm.updateCategory();
        }else {
          vm.createCategory();
        }
      }
    }

    vm.onOk_clickHandler = function(ev)
    {

      ev.preventDefault();

      // if we are editing then save else create new
      if(vm.isEdit) {
        vm.updateCategory();
      } else {

        vm.createCategory();
      }
    }

    vm.onCancel_clickHandler = function(ev)
    {
      ev.preventDefault();

      $uibModalInstance.close();
    }

    activate();

    function activate() {
      console.log('AddSubCategoryController : activate');
    }
  }
})();
