var app = angular.module('lablist.services', []);

app.factory('toDoListApiFactory', ['$http', function($http){
  var urlBase = '/api/lists/';
  var toDoListApiFactory = {};

  toDoListApiFactory.getToDoListByIds = function(){
    return $http.get(urlBase);
  };

  toDoListApiFactory.createToDoList = function(todolist){
    return $http.post(urlBase, todolist);
  };

  toDoListApiFactory.getToDoListById = function(id){
    var url = urlBase + id + '/';
    return $http.get(url);
  };

  toDoListApiFactory.updateToDoList = function(todolist){
    var url = urlBase + todolist.id + '/';
    return $http.patch(url, todolist);
  };

  toDoListApiFactory.deleteToDoListById = function(id){
    var url = urlBase + id + '/';
    return $http.delete(url);
  };

  return toDoListApiFactory;
}]);