var app = angular.module('lablist.services.task', []);

app.factory('taskApiFactory', ['$http', function($http){
  var urlBase = '/api/tasks/';
  var taskApiFactory = {};

  taskApiFactory.getTasksByToDoListId = function(toDolistId){
    return $http.get(urlBase, {todolist_id: toDolistId});
  };

  return taskApiFactory;
}]);