var app = angular.module('lablist.services.task', []);

app.factory('taskApiFactory', ['$http', function($http){
  var urlBase = '/api/tasks/';

  return {
    getTasksByToDoListId: function(toDolistId, headers){
      data = {todolist_id: toDolistId};
      return $http.get(
        urlBase, data, headers
      ).then(function(response){
        return response;
      });
    },
    createTask: function(task, toDolistId, headers){
      task.todolist = toDolistId;
      return $http.post(urlBase, task, headers).then(function(response){
        return response;
      });
    },
    getTaskById: function(id, headers){
      var url = urlBase + id + '/';
      return $http.get(url, headers).then(function(response){
        return response;
      });
    },
    updateTask: function(task, headers){
      var url = urlBase + task.id + '/';
      return $http.patch(url, task, headers).then(function(response){
        return response;
      });
    },
    deleteTask: function(task, headers){
      var url = urlBase + task.id + '/';
      return $http.delete(url, headers).then(function(response){
        return response;
      });
    },
    sortTaskByPosition: function(task, position, headers){
      var url = urlBase + task.id + '/sort/';
      var data = {'order': position};
      return $http.patch(url, data, headers).then(function(response){
        return response;
      });
    },
    toggleTask: function(task, headers){
      var url = urlBase + task.id + '/toggle/';
      return $http.patch(url, task, headers).then(function(response){
        return response;
      });
    }
  };
}]);