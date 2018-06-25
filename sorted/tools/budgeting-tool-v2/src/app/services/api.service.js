(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .service('Api', Api);

  /** @ngInject */
  function Api($log,
               $cookies,
               $q,
               $http,
               $uibModal,
               $location,
               BudgetCalculator,
               toastr) {

    var DOMAIN = setDomain();

    var hasAccessedTool = false;

    var budgetData;
    var lastEditedDate;
    var budgetId;
    var isNewBudget = true;

    function getLastEditDate () {
      return lastEditedDate;
    }

    function getIsNewBudget () {
      return isNewBudget;
    }

    function setIsNewBudget (isNew) {
      isNewBudget = isNew;
    }

    function getBudgetData () {
      return budgetData;
    }

    function setDomain()
    {
      var domain;
      console.log($location.host());
      switch($location.host()) {
        case 'localhost' :
          // domain = 'http://sorted.local/';
          domain = 'http://localhost/';
          break;

        // case '192.168.178.47' :
        //   domain = 'http://192.168.33.10/';
        //   break;

        default :
          domain = '';
          break;
      }

      return domain;
    }


    function loadBudget() {
      console.log('Api : loadBudget');
      var request = DOMAIN + 'api/v0.1/calculator/get/2';

      return $http.get(request).then(function (resp) {
        var budgetsArr = resp.data;

        console.log("HAS DATA", budgetsArr);
        if(budgetsArr.length > 0){
          try {

            // try to convert the old format to an obj
            budgetData = angular.copy(JSON.parse(budgetsArr[budgetsArr.length - 1].Data));
          }catch (e) {
            //we threw an error must be an object
            budgetData = angular.copy(budgetsArr[budgetsArr.length - 1].Data);
          }
          lastEditedDate = new Date.parse(budgetsArr[budgetsArr.length - 1].LastEdited)
          budgetId = budgetsArr[budgetsArr.length - 1].ID;
          isNewBudget = false;
          console.log(budgetsArr[budgetsArr.length - 1]);
          console.log(budgetData);
          console.log(lastEditedDate);
        }

        return budgetData;

      });

    }

    function saveBudget(parsedObj, forceSave) {

      if((getBudgetData() && getIsNewBudget())) {

        if(forceSave) {
          //console.log('Forced to save')
        } else {

          showWarning();
          return
        }

      }
      var request;
      if(getIsNewBudget() && getBudgetData()) {

        //console.log("is update");
        request = DOMAIN + 'api/v0.1/calculator/update/' + budgetId;

      }else if (getIsNewBudget()) {

        //console.log("is Save");
        request = DOMAIN + 'api/v0.1/calculator/save';


      } else {

        //console.log("is update");
        request = DOMAIN + 'api/v0.1/calculator/update/' + budgetId;

      }


      var cleanObj = angular.copy(parsedObj);

      var sendData = {
        Data: cleanObj,
        CalcID: 2
      };

      BudgetCalculator.current.changeSinceSave = false;


      $http.post(request,  sendData, {
        headers: {'Content-Type': 'application/json'}
      }).then(function (resp) {

        toastr.success('Budget saved successfully');

        isNewBudget = false;
        var budgetsArr = resp.data;
        if(budgetsArr.status == 'success'){
          budgetId = budgetsArr.data;
        }
        return true;
      }).catch(function (err) {
        toastr.error('Please check your login and try again', 'Budget not saved!');
        return false;
      });
    }

    function showWarning () {

      var modalInstance = $uibModal.open({
        templateUrl: 'app/components/modals/multiBudgetModal.html',
        controller: 'MultiBudgetModalController',
        controllerAs: '$ctrl',
        size: 'lg'
      });

    }

    function get_SiteData()
    {
      var request = DOMAIN+'themes/sorted/json/budget-tool-v2/budget-tool-data.json';

      return $http({
        url: request,
        headers: {'Content-Type': 'application/json'}});
    }



    var service = {
      get_SiteData : get_SiteData,
      getIsNewBudget: getIsNewBudget,
      getLastEditDate: getLastEditDate,
      setIsNewBudget: setIsNewBudget,
      saveBudget : saveBudget,
      loadBudget: loadBudget,
      getBudgetData: getBudgetData,
      hasAccessedTool: hasAccessedTool

    };

    return service;
  }
})();
