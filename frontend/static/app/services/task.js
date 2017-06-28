var app = angular.module('lablist.services.task', []);

app.factory('taskApiFactory', ['$http', function($http){
  var urlBase = '/api/tasks/';

  return {
    getTasksByToDoListId: function(toDolistId){
      return $http.get(urlBase, {todolist_id: toDolistId}).then(function(response){
        return response;
      });
    },
    createTask: function(task, toDolistId){
      task.todolist = toDolistId;
      return $http.post(urlBase, task).then(function(response){
        return response;
      });
    },
    getTaskById: function(id){
      var url = urlBase + id + '/';
      return $http.get(url).then(function(response){
        return response;
      });
    },
    updateTask: function(task){
      var url = urlBase + task.id + '/';
      return $http.patch(url, task).then(function(response){
        return response;
      });
    },
    deleteTaskById: function(id){
      var url = urlBase + id + '/';
      return $http.delete(url).then(function(response){
        return response;
      });
    },
    sortTaskByPosition: function(task, position){
      var url = urlBase + task.id + '/sort/';
      return $http.patch(url, {'order': position}).then(function(response){
        return response;
      });
    },
    toggleTask: function(task){
      var url = urlBase + task.id + '/toggle/';
      return $http.patch(url, task).then(function(response){
        return response;
      });
    }
  };
}]);