var app = angular.module('lablist.services', []);

app.factory('toDoListApiFactory', ['$http', function($http){
  var urlBase = '/api/lists/';
  var toDoListApiFactory = {};

  toDoListApiFactory.getToDoLists = function (){
    return $http.get(urlBase);
  };

  return toDoListApiFactory;
}]);