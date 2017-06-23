var app = angular.module('lablist.services.task', []);

app.factory('taskApiFactory', ['$http', function($http){
  var urlBase = '/api/tasks/';
  var taskApiFactory = {};

  taskApiFactory.getTasksByToDoListId = function(toDolistId){
    return $http.get(urlBase, {todolist_id: toDolistId});
  };

  taskApiFactory.createTask = function(task, toDolistId){
    task.todolist = toDolistId;
    return $http.post(urlBase, task);
  };

  taskApiFactory.getTaskById = function(id){
    var url = urlBase + id + '/';
    return $http.get(url);
  };

  taskApiFactory.updateTask = function(task){
    var url = urlBase + task.id + '/';
    return $http.patch(url, task);
  };

  taskApiFactory.deleteTaskById = function(id){
    var url = urlBase + id + '/';
    return $http.delete(url);
  };

  return taskApiFactory;
}]);