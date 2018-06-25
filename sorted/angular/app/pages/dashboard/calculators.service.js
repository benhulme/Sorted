/**
 * Created by stanislavk on 4/03/2016.
 */
(function() {
  'use strict';

  angular.module('sorted')
    .service('userCalculators', [ '$http', 'silverStripeService',
      function ($http,silverStripeService) {

        var calculators = {};
        calculators.usedCalcId = [];

        function PromiseFail(response) {
          console.error('failure', response);
        }



          calculators.deleteById = function(id){
            return $http.delete('/api/v0.1/rest/tool/'+id);
          };

          calculators.getUsedCalculators  = function() {
            return silverStripeService.get('calculators').then(function(response){
              if (response.status === 200) {
                return response.data;

              } else {
                console.error('unexpected response status', response);
              }
            }, PromiseFail);
          };

          calculators.getBlankCalculators =  function() {
            return silverStripeService.get('toolsArticles').then(function(response){
              if (response.status === 200) {
                return response.data;
              } else {
                console.error('unexpected response status', response);
              }
            }, PromiseFail);
          };

          calculators.getUsedCalcIds = function(){
            return calculators.getUsedCalculators().then(function(data){
              var usedCalculators = data.data;
              calculators.usedCalcId = [];
              for(var i=0; i<usedCalculators.length; i++){
                calculators.usedCalcId.push(usedCalculators[i].CalcID);
              }
              return calculators.usedCalcId;
            });

          };

        return calculators;


      }]);

})();
