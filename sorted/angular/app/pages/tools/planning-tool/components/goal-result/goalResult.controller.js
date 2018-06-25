/**
 * Created by stanislavk on 9/08/2016.
 */
(function () {
  'use strict';

  angular.module('sorted')
    .controller('PlanningResultsController', ['$scope',  'planningData', '$uibModal', 'siteConfig' ,'profileApi', '$rootScope', function($scope, planningData, $modal, siteConfig ,profileApi,$rootScope) {

      var saving = false;
      $scope.goals = planningData.goals;
      //hardcoded share data as it's not comming in from page api properly
      $scope.data = {'Link':'/tools/goal-planner/welcome','Title':'Goal Planner','ThumbnailImage':{'Filename':'assets/Uploads/goal-planner.png'}};

      console.log($scope.data);

      var resolveSave = function() {
        var modalInstance = $modal.open({
          templateUrl: siteConfig.APP_PATH+"app/pages/tools/planning-tool/components/save-resolve/saveResolve.html",
          controller: 'ModalInstanceSaveResolve'
        });
        return modalInstance.result;
      };


      var save = function(){
        resolveSave().then(function(){
          if($rootScope.userLogged && planningData.id){
            planningData.update($scope.goals, planningData.id);
          }else{
            planningData.save($scope.goals);
          }
          saving = false;
        });
      };

      $scope.saveGoals = function(){
        saving = true;
        profileApi.isLoggedIn().then(function(data){
          if(data){
            save();
          }else{
            $('#login-modal').modal('show');
          }
        });
      };



      $scope.short = $scope.goals.short;
      $scope.medium = $scope.goals.medium;
      $scope.long = $scope.goals.long;
      $scope.shortBase = {
        "BaseName": "short",
        "Title": "My short-term goals (0-3 years)",
        "Copy": "Smaller, short-term goals are quick wins. They can help us get ahead and move us towards the bigger goals for the long term.",
        "Placeholder": "Add your short-term goals to see them here",
        "Links":[
          {
            "icon": "themes/sorted/assets/images/filters/all-tools.svg",
            "title": "Tools to try",
            "links": [
              {
                "title": "Budgeting tool",
                "url": "tools/budgeting-tool/welcome"
              },
              {
                "title": "Savings calculator",
                "url": "tools/savings-calculator"
              },
              {
                "title": "Debt calculator",
                "url": "tools/debt-calculator"
              }
            ]
          },
          {
            "icon": "themes/sorted/assets/images/filters/filters-latest.svg",
            "title": "Guides to read",
            "links": [
              {
                "title": "Budget – don’t fudge it",
                "url": "guides/budget-dont-fudge-it"
              },
              {
                "title": "Saving – paying ourselves first",
                "url": "guides/saving-paying-ourselves-first"
              },
              {
                "title": "Get out of debt fast",
                "url": "guides/get-out-of-debt-fast"
              }
            ]
          }
        ]

      };
      $scope.mediumBase = {
        "BaseName": "medium",
        "Title": "My medium-term goals (4-9 years)",
        "Copy": "Medium-term goals are a bit further off, but we also have more time to work up to them gradually, reducing our need for debt.",
        "Placeholder": "Add your medium-term goals to see them here",
        "Links":[
          {
            "icon": "themes/sorted/assets/images/filters/all-tools.svg",
            "title": "Tools to try",
            "links": [
              {
                "title": "Savings calculator",
                "url": "tools/savings-calculator"
              },
              {
                "title": "Net worth calculator ",
                "url": "tools/net-worth-calculator"
              },
              {
                "title": "Mortgage calculator ",
                "url": "tools/mortgage-calculator"
              }
            ]
          },
          {
            "icon": "themes/sorted/assets/images/filters/filters-latest.svg",
            "title": "Guides to read",
            "links": [
              {
                "title": "Buying a first home",
                "url": "guides/buying-a-first-home"
              },
              {
                "title": "Managing a mortgage",
                "url": "guides/managing-a-mortgage"
              },
              {
                "title": "Assets – protecting what’s important",
                "url": "guides/asset-protection"
              }
            ]
          }
        ]
      };
      $scope.longBase = {
        "BaseName": "long",
        "Title": "My long-term goals (10+ years)",
        "Copy": "The earlier we start saving and investing for long-term goals, the better. Time is on our side, and it’s surprising how much we can achieve in the long run.",
        "Placeholder": "Add your long-term goals to see them here",
        "Links":[
          {
            "icon": "themes/sorted/assets/images/filters/all-tools.svg",
            "title": "Tools to try",
            "links": [
              {
                "title": "Retirement planner",
                "url": "tools/retirement-planner"
              },
              {
                "title": "KiwiSaver savings calculator",
                "url": "tools/kiwisaver-savings-calculator"
              },
              {
                "title": "Investor kickstarter",
                "url": "tools/investor-kickstarter"
              }
            ]
          },
          {
            "icon": "themes/sorted/assets/images/filters/filters-latest.svg",
            "title": "Guides to read",
            "links": [
              {
                "title": "Planning for retirement",
                "url": "guides/planning-for-retirement"
              },
              {
                "title": "Investing questions",
                "url": "guides/investing-questions"
              },
              {
                "title": "KiwiSaver – looking after it",
                "url": "guides/kiwisaver-looking-after-it"
              }
            ]
          }
        ]
      };
    }]);

}());
