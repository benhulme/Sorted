(function () {
  'use strict';

  // Share data between controllers. Inject the service, then: 
  //
  //   commonDataCache.set('key', val);
  //   commonDataCache.get('key');
  //
  // Returns null if the property doesn't exist.
  angular.module('sorted')
    .factory('commonDataCache', [function () {

      var _data = {};

      function set(key, val) {
        _data[key] = val;
      }

      function get(key) {
        return _data.hasOwnProperty(key)? _data[key] : null;
      }

      function clear() {
        _data = {};
      }

      return {
        set: set,
        get: get,
        clear: clear
      };

    }]);

})();
