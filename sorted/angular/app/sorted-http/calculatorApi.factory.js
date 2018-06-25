(function () {
    'use strict';

    angular.module('sorted.http')
        .factory('calculatorApi', [
            '$http',
            'siteConfig',
            function ($http, siteConfig) {
                var BASE_URL = siteConfig.API_PREFIX + '/calculator/';

                function get (calcId) {
                    return $http({
                        method: 'GET',
                        url: BASE_URL + 'query',
                        // NOTE: calcid query string parameter appears to be case-sensitive,
                        // must be lowercase
                        params: { calcid: calcId }
                    })
                        .then(function (calcs) {
                            if (calcs.data.length) {
                                // CalcID appears to be a LIKE search. We need an exact match, as it seems
                                // "9999" matches CalcID "999" :(
                                return _.find(calcs.data, { CalcID: calcId });
                            }
                            return null;
                        }, function () {
                            // No user. Unfortunately the API issues a 500 in this case.
                            return null;
                        });
                }

                // budget must contain at minimum:
                //   CalcId:  string (must be numeric)
                //   Data:    string (JSON)
                // Note that CalcID is not a unique specifier: two records will be created
                // with different IDs on subsequent POSTs with the same CalcID. Therefore,
                // we don't POST if a Calculator.ID exists (as opposed to Calculator.CalcID).
                function save (calcId, calcData) {
                    var method = 'POST';
                    var url = BASE_URL + 'save';

                    return $http({
                        method: method,
                        url: url,
                        data: {
                            CalcID: calcId,
                            Data: angular.toJson(calcData)
                        }
                    })
                        .then(function (response) {
                            return response;
                        });
                }

                // Update when we already have a calculator ID.
                // Note that in this case, calculator is the object as sent by the server.
                // Its `calculator.Data` is potentially out of date and must be overwritten.
                function update (calculator, budget) {
                    calculator.Data = angular.toJson(budget);
                    return $http({
                        method: 'PUT',
                        url: BASE_URL + 'update/' + calculator.ID,
                        data: calculator
                    })
                        .then(function (response) {
                            return response;
                        });
                }

                // Delete by ID, in case anyone wants to start again
                function del (calculator) {
                    return $http({
                        method: 'DELETE',
                        url: BASE_URL + 'delete/' + calculator.ID
                    })
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            return error;
                        });
                }

                return {
                    get: get,
                    save: save,
                    update: update,
                    del: del
                };
            }]);

})();
