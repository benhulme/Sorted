/**
 * Created by stanislavk on 17/08/2016.
 */
(function() {
  'use strict';

  angular.module('sorted')
    .factory('planningData', ['$http',  function ($http) {

        var tempItem = [],
            tempCategory = '',
            goalEditable = [],
            goals = {},
            _calcId = '12',
            title = "Goal Planner",
            _id = '';

        function getTitle(){
          return title;
        }
        function setTitle(data){
          title = data;
        }


        function getDefaultGoals(){
          return $http.get('/api/v0.1/goal/get');
        }

        function getUserGoals(){
          return $http.get('/api/v0.1/calculator/query?calcid='+_calcId).then(function(data){
            return data;
          },function(){
            return false;
          });
        }

        function save(data){
          var send = {
            "CalcID": _calcId,
            "Title": getTitle(),
            "Data": data
          };
          $http.post('/api/v0.1/rest/tool/'+_calcId, JSON.stringify(send));
        }



        function update(data,id){
          var send = {
            "CalcID": _calcId,
            "Title": getTitle(),
            "Data": data
          };
          $http.put('/api/v0.1/rest/tool/'+id, JSON.stringify(send));
        }


      return{
          id : _id,
          goals : goals,
          title : title,
          tempItem : tempItem,
          tempCategory : tempCategory,
          goalEditable : goalEditable,
          setTitle : setTitle,
          getUserGoals : getUserGoals,
          getDefaultGoals : getDefaultGoals,
          save : save,
          update: update
        };

      }]);

})();
