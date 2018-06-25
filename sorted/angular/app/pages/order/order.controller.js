/**
 * Created by greg on 10/02/2016.
 */

(function () {
  'use strict';

  angular.module('sorted')
    .controller('OrderController', [
      '$scope', 'siteConfig', 'orderViewModel', '$http', '$log', function ($scope, siteConfig, orderViewModel, $http) {
        $scope.siteConfig = siteConfig;
        $scope.seminarSend = false;
        $scope.bookletSend = false;


        // Empty order model
        $scope.Order = _.merge({}, {Items: {}, User: {}, Organisation: {}, DeliverTo: {}, Seminar:{}});



        $scope.data = {
          organisationTypes: [
            {id: '1', name: 'Workplace'},
            {id: '2', name: 'School'},
            {id: '3', name: 'Community Group'},
            {id: '4', name: 'Both'},
            {id: '5', name: 'Other'}
          ],

          organisationSizes: [
            {id: '1', name: 'less than 10'},
            {id: '2', name: '10 to 30'},
            {id: '3', name: '30 to 50'},
            {id: '4', name: '50 to 100'},
            {id: '5', name: '100 to 500'},
            {id: '6', name: '500 to 1000'},
            {id: '7', name: 'more than 1000'},
          ]
        };
        $scope.data.Title = 'Order Sorted Collateral';

        // Set defaults
        //$scope.data.selectedOrganisationType = $scope.data.organisationTypes[0];
        //$scope.data.selectedOrganisationSize = $scope.data.organisationSizes[0];


        // load the Model
        // Categories, Booklets, Seminars, Posters
        orderViewModel.build()
          .then(function (model) {
            _.merge($scope.data, model);
          });

        $scope.getInput = function (form, item) {
          return form[item.ID];
        };

        $scope.getOrderItemCount = function () {
          return _.keys($scope.Order.Items).length;
        };

        //$scope.selectedOrders = function(list){
        //  return list.filter(function(item){
        //    return item.PDF.Checked;
        //  });
        //};

        function findObj(fromArray, id)
        {
          var returnObj;

          for(var i = 0; i < fromArray.length; i++) {
            var obj = fromArray[i];

            if(parseInt(obj.ID) === parseInt(id)) {
              returnObj = obj;

              break;
            }
          }
          return returnObj;
        }

        function buildSeminarObj(seminarObj, seminarsData)
        {
          var seminarData = [];
          for(var key in seminarObj.Seminar) {
            if(seminarObj.Seminar.hasOwnProperty(key))
            {
              var obj = {};
              if(seminarObj.Seminar[key]) {
                var itemObj = findObj(seminarsData, key);
                obj.ID = key;
                obj.Dl = itemObj.PDF.Filename;
                obj.Title = itemObj.Title;
                obj.ShortCopy = itemObj.ShortCopy;
                seminarData.push(obj);
              }
            }



          }

          return seminarData;
        }



        $scope.save = function(){

          // $log.debug($scope.Order);
          // $log.debug($scope.Order.Items);
          // $log.debug($scope.Order.Seminar);
          // $log.debug(_.keys($scope.Order.Seminar).length);
          // $log.debug((_.keys($scope.Order.Seminar).length > 0));


          if(angular.element('.orderForm').hasClass('ng-valid'))
          {
            // Do Booklets
            if(_.keys($scope.Order.Items).length > 0){
              $http.post('/api/v0.1/order/save', $scope.Order).then(function() {
                $scope.formSend = true;
              });
            }

            // Do Seminars
            if((_.keys($scope.Order.Seminar).length > 0)){
              // console.log('DO form send');

              var tempData = angular.copy($scope.Order);
              var siteData = angular.copy($scope.data);

              // console.log('tempData : User?');
              // console.log(tempData);

              var userData = tempData.User;

              var seminarData = buildSeminarObj(tempData, siteData.Seminars);
              var postData = {
                Seminar:seminarData,
                User: userData,
                raw: $scope.Order
              };
              // console.log('postData');
              // console.log(postData);

              $http.post('/api/v0.1/order/seminars', postData).then(function(response) {
                // console.log('Order : returned');
                if(response) {
                  // console.log(response);
                }
                $scope.formSend = true;
              }, function(error)
              {
                console.log(error);
              });
            }


              //
              //if($scope.selectedOrders($scope.data.Seminars).length > 0){
              //  var urls = [];
              //  for(var i = 0; i< $scope.selectedOrders($scope.data.Seminars).length; i++){
              //    urls.push({"url":$scope.selectedOrders($scope.data.Seminars)[i].PDF.Filename});
              //  }
              //  $http.post('', JSON.stringify(urls)).then(function(){
              //    $scope.seminarSend = true;
              //  });
              //}

          }
        };

      }
    ]);
}());
