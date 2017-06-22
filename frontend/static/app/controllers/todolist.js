var app = angular.module('lablist.controllers', []);

app.controller('listToDoListController', [
  '$scope', 'toDoListApiFactory',
  function($scope, toDoListApiFactory){
    $scope.lists = [];

    getToDoLists();
    function getToDoLists(){
      toDoListApiFactory.getToDoLists().then(function(response){
        $scope.lists = response.data;
      }, function (error){
        $scope.status = 'Unable to load lists: ' + error.message;
      });
    }
  }]
);

app.controller('createToDoListController',
  ['$scope', '$location', 'toDoListApiFactory',
  function($scope, $location, toDoListApiFactory){
    $scope.hasError = function(fieldName) {
      var field = $scope.todolistForm[fieldName];
      return field.$invalid && field.$dirty ? 'has-error' : '';
    };

    $scope.create = function(todolist) {
      toDoListApiFactory.createToDoList(todolist);
      $location.path('#!/lists/');
    };
  }]
);