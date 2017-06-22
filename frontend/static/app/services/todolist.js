var app = angular.module('lablist.services', []);

app.factory('toDoListApiFactory', ['$http', function($http){
  var urlBase = '/api/lists/';
  var toDoListApiFactory = {};

  toDoListApiFactory.getToDoLists = function(){
    return $http.get(urlBase);
  };

  toDoListApiFactory.createToDoList = function(todolist){
    return $http.post(urlBase, todolist);
  };

  toDoListApiFactory.getToDoList = function(id){
    var url = urlBase + id + '/';
    return $http.get(url);
  };

  toDoListApiFactory.updateToDoList = function(todolist){
    var url = urlBase + todolist.id + '/';
    return $http.patch(url, todolist);
  };

  return toDoListApiFactory;
}]);