(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .factory('SiteData', SiteData);

  /** @ngInject */
  function SiteData($log,
                    $http,
                    $location,
                    PagedataParser,
                    $q,
                    Api) {

    var siteData;

    /*
    * Get all the site data from an API. A specific page data can be returned in the object

      @param page:      String: The page key value from the API json

      @return Returns a promise
    * */
    function get(page)
    {
      var deferred = $q.defer();

      if(!siteData) {
        console.log('Get data');
        console.log('page = ' + page);

        Api.get_SiteData().then(function(response)
        {
          console.log(response)
          siteData = PagedataParser.fromDatabase(response.data);

          if(page) {
            deferred.resolve(siteData[page]);
          } else {
            deferred.resolve(siteData);
          }

        }, function(error)
        {
          // TODO: Something
          console.log(error);

          deferred.reject('Something bad happened');
        });
      } else {
        if(page) {
          deferred.resolve(siteData[page]);
        } else {
          deferred.resolve(siteData);
        }
      }

      return deferred.promise;
    }

    var factory = {
      get : get
    }

    return factory;
  }
})();
