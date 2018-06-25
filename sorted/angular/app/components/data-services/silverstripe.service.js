(function(){
  'use strict';

  angular.module('sorted')
    .service('silverStripeService', ['$http', 'apiEndpoints', function($http, apiEndpoints) {

      var textualMonths = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec',
      };

      function formatDate(dateString, textual) {

        if (textual === true) {
          var date = new Date(dateString.replace(' ', 'T'));
          return {
            time: date.getHours() + ':' + date.getMinutes() + ':' + date.getMilliseconds(),
            date: date.getDate(),
            month: textualMonths[date.getMonth()],
            year: date.getYear() - 100,
          };
        } else {
          return new Date(dateString);
        }

      }

      return {
        get: function(endpoint, endpointExtra, params) {
          var req = {};

          if (endpointExtra !== undefined && endpoint) {
            req = {
              method: 'GET',
              url: apiEndpoints[endpoint] + '/' + endpointExtra,
              params: params,
            };

          } else {
            req = {
              method: 'GET',
              url: apiEndpoints[endpoint],
              params: params,
            };
          }

          return $http(req);
        },
        formatDates: function(data, textual) {

          var formattedData = [];

          var dataFormatted = false;

          angular.forEach(data, function(item, index) {

            formattedData[index] = item;

            if (item.hasOwnProperty('Created')) {
              formattedData[index].Created = formatDate(item.Created, textual);
              dataFormatted = true;
            }

            if (item.hasOwnProperty('LastEdited')) {
              formattedData[index].LastEdited = formatDate(item.LastEdited, textual);
              dataFormatted = true;
            }

            if (item.hasOwnProperty('PublishDate')) {
              formattedData[index].PublishDate = formatDate(item.PublishDate, textual);
              dataFormatted = true;
            }



          });

          if (dataFormatted) {
            return formattedData;
          } else {
            return false;
          }

        }
      };
    }]);
}());
