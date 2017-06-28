var app = angular.module('lablist.services.todolist', []);

app.factory('toDoListApiFactory', ['$http', function($http){
  var urlBase = '/api/lists/';
  return {
    getToDoListByIds: function(){
      return $http.get(urlBase).then(function(response){
        return response;
      });
    },
    createToDoList: function(todolist){
      return $http.post(urlBase, todolist).then(function(response){
        return response;
      });
    },
    getToDoListById: function(id){
      var url = urlBase + id + '/';
      return $http.get(url).then(function(response){
        return response;
      });
    },
    updateToDoList: function(todolist){
      var url = urlBase + todolist.id + '/';
      return $http.patch(url, todolist).then(function(response){
        return response;
      });
    },
    deleteToDoListById: function(id){
      var url = urlBase + id + '/';
      return $http.delete(url).then(function(response){
        return response;
      });
    }
  }
}]);