var app = angular.module('lablist.services.todolist', []);

app.factory('toDoListApiFactory', ['$http', function($http){
  var urlBase = '/api/lists/';
  return {
    getToDoListByIds: function(data, headers){
      return $http.get(urlBase, data, headers).then(function(response){
        return response;
      });
    },
    createToDoList: function(todolist, headers){
      return $http.post(urlBase, todolist, headers).then(function(response){
        return response;
      });
    },
    getToDoListById: function(id, headers){
      var url = urlBase + id + '/';
      return $http.get(url, headers).then(function(response){
        return response;
      });
    },
    updateToDoList: function(todolist, headers){
      var url = urlBase + todolist.id + '/';
      return $http.patch(url, todolist, headers).then(function(response){
        return response;
      });
    },
    deleteToDoListById: function(id, headers){
      var url = urlBase + id + '/';
      return $http.delete(url, headers).then(function(response){
        return response;
      });
    }
  }
}]);