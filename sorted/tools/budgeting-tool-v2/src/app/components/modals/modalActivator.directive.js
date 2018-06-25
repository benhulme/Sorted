(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .directive('modalActivator', modalActivator);

  /** @ngInject */
  function modalActivator(ModalType,
                          $uibModal,
                          $rootScope) {
    var directive = {
      restrict: 'A',
      scope: {
        modalType: '@'
      },
      link: linkFunc,
      controller: ModalactivatorController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {

      var onAddSubCategory_clickHandler = function(ev)
      {
        debugger
        ev.preventDefault();

        var masterData;
        var subCatData;

        var masterElData = el.attr('data-mastercategory');
        var subCatElData = el.attr('data-subcategory');

        if(angular.isDefined(masterElData)) {
          masterData = {};
          var masterCategoryData = JSON.parse(masterElData);
          var masterCatId = parseInt(masterCategoryData['ID']);
          var masterCategoryIndex = parseInt(el.attr('data-mastercatindex'));

          masterData.masterCategoryID = masterCatId;
          masterData.masterCategoryIndex = masterCategoryIndex;
        }

        if(angular.isDefined(subCatElData)) {
          subCatData = {};
          subCatData = JSON.parse(subCatElData);
        }

        var categoryIndex;
        if(angular.isDefined(el.attr('data-catindex'))) {
          categoryIndex = parseInt(el.attr('data-catindex'));
        }

        var masterCategoryIndex;
        if(angular.isDefined(el.attr('data-mastercatindex'))) {
          masterCategoryIndex = parseInt(el.attr('data-mastercatindex'));
        }



        var modalInstance = $uibModal.open({
          templateUrl: 'app/components/modals/addEditSubCategoryModal.html',
          controller: 'AddEditSubCategoryController',
          controllerAs: '$ctrl',
          size: 'lg',
          resolve: {
            mastercategoryData: function () {
              return masterData;
            },
            subcategoryData: function () {
              return subCatData;
            },
            masterCategoryIndex: function () {
              return masterCategoryIndex;
            },
            categoryIndex: function () {
              return categoryIndex;
            }

          }
        });
      }

      var onDeleteSubCategory_clickHandler = function(ev)
      {
        ev.preventDefault();

        debugger

        var categoryData = JSON.parse(el.attr('data-subcategory'));
        var subCatId = parseInt(categoryData['ID']);
        var masterCatId = parseInt(categoryData['MasterCategoryID']);
        var categoryTitle = categoryData['Title'];
        var categoryIndex = parseInt(el.attr('data-catindex'));
        var masterCategoryIndex = parseInt(el.attr('data-mastercatindex'));

        var modalInstance = $uibModal.open({
          templateUrl: 'app/components/modals/deleteSubCategoryModal.html',
          controller: 'DeleteSubCategoryController',
          controllerAs: '$ctrl',
          size: 'md',
          resolve: {
            categoryData: function () {
              return {
                masterCategoryID : masterCatId,
                subCategoryId : subCatId,
                categoryTitle : categoryTitle,
                categoryIndex : categoryIndex,
                masterCategoryIndex : masterCategoryIndex
              };
            }
          }
        });
      }

      var onEditBudget_clickHandler = function(ev)
      {
        ev.preventDefault();

        var modalInstance = $uibModal.open({
          templateUrl: 'app/components/modals/editBudgetModal.html',
          controller: 'EditBudgetModalController',
          controllerAs: '$ctrl',
          size: 'lg'

        });

        modalInstance.result.then(function(){
          //console.log('close');
         }, function(){
          console.log('dismiss');
          $rootScope.$broadcast('resetBudget');
         });
      }



      var onEditMasterCat_clickHandler = function(ev)
      {
        ev.preventDefault();

        var categoryData = JSON.parse(el.attr('data-mastercategory'));

        var modalInstance = $uibModal.open({
          templateUrl: 'app/components/modals/editMasterCatModal.html',
          controller: 'EditMasterCatModalController',
          controllerAs: '$ctrl',
          size: 'md',
          resolve: {
            categoryData: function () {
              return {
                categoryData : categoryData,

              };
            }
          }

        });
      }


      var onDeleteMasterCat_clickHandler = function(ev)
      {
        ev.preventDefault();

        debugger
        var categoryData = JSON.parse(el.attr('data-mastercategory'));

        var modalInstance = $uibModal.open({
          templateUrl: 'app/components/modals/deleteMasterCategoryModal.html',
          controller: 'DeleteMasterCategoryController',
          controllerAs: '$ctrl',
          size: 'md',
          resolve: {
            categoryData: function () {
              return {
                categoryData : categoryData,

              };
            }
          }

        });
      }

      function addListeners()
      {
        switch(scope.modalType)
        {
          case ModalType.EDIT_BUDGET :
            el.addClass('pointer');
            el.on('click', onEditBudget_clickHandler);
            break;

          case ModalType.DELETE_SUBCATEGORY :
            el.addClass('pointer');
            el.on('click', onDeleteSubCategory_clickHandler);
            break;

          case ModalType.ADD_SUBCATEGORY :
            el.addClass('pointer');
            el.on('click', onAddSubCategory_clickHandler);
            break;

          case ModalType.EDIT_MASTER_CATEGORY:
            el.addClass('pointer');
            el.on('click', onEditMasterCat_clickHandler);
            break;

          case ModalType.DELETE_MASTER_CATEGORY:
            el.addClass('pointer');
            el.on('click', onDeleteMasterCat_clickHandler);
            break;
        }
      }

      function activate()
      {
        addListeners();
      }

      activate();

      scope.$on('$destroy', function () {

      });
    }



    /** @ngInject */
    function ModalactivatorController($scope) {
      var vm = this;
    }

  }

})();
