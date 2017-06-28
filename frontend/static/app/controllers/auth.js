var app = angular.module('lablist.controllers.auth', []);

app.controller('loginController', [
  '$scope', '$rootScope', '$state', 'FacebookFactory', 'authApiFactory',
  function($scope, $rootScope, $state, FacebookFactory, authApiFactory){
    $scope.login = function(){
      FacebookFactory.login().then(function(response){
        var data = {
          grant_type: 'convert_token',
          client_id: '6z70ludoXQFAIGnr5pCZZxsPcawaYgRoDofPwLJs',
          client_secret: 'DW0RyZDu8OeSoEBP7yYseahwrkUDIei7VPDc25aNP6iv7D0QHWFGdvDTdjXbp96Z2taWqmpMNZJawf0qnMAkcZKpQpolbTEcXQ5vjIPX9Kq1wiqmk1i3gd5M5VCreawl',
          backend: 'facebook',
          token: response.authResponse.accessToken,
        }
        authApiFactory.login(data).then(function(response) {
          $rootScope.request_headers = {
            headers: {
              Authorization: 'Bearer ' + response.data.access_token,
            }
          };
          $state.go('listToDoListRoute');
        }, function(response) {
          console.log('There was an error', response);
        });
      });
    }
  }
]);
