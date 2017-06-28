var app = angular.module('lablist.services.auth', []);

app.factory('FacebookFactory',
  ['$q', '$window', '$rootScope',
  function($q, $window, $rootScope) {
    var resolve = function(errval, retval, deferred) {
      $rootScope.$apply(function() {
        if (errval) {
          deferred.reject(errval);
        } else {
          retval.connected = true;
          deferred.resolve(retval);
        }
      });
    }

    return {
      login: function(){
        var deferred = $q.defer();
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            deferred.resolve(response);
          } else {
            FB.login(function(response){
              if(response.authResponse){
                resolve(null, response, deferred);
              } else {
                resolve(response.error, null, deferred);
              }
            });
          }
        });
        return deferred.promise;
      },
    };
  }
]);

app.factory('authApiFactory', ['$http', '$rootScope', function($http, $rootScope){
  var urlBase = '/api/auth/';
  return {
    login: function(data){
      url = urlBase + 'convert-token/';
      return $http.post(url, data).then(function(response){
        return response;
      });
    },
    isLoggedIn: function(){
      hasToken = null;
      request_headers = $rootScope.request_headers;
      if (request_headers && request_headers.headers) {
        hasToken = request_headers.headers.access_token != undefined;
      }
      return hasToken;
    }
  };
}]);
