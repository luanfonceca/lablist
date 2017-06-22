var app = angular.module('lablist.services', []);

app.factory('toDoListApiFactory', ['$http', function($http){
  var urlBase = '/api/lists/';
  var toDoListApiFactory = {};

  toDoListApiFactory.getToDoLists = function (){
    return $http.get(urlBase);
  };

  toDoListApiFactory.createToDoList = function (todolist){
    return $http.post(urlBase, todolist);
  };

  return toDoListApiFactory;
}]);