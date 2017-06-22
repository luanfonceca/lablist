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

app.controller('updateToDoListController',
  ['$scope', '$stateParams', '$location', 'toDoListApiFactory',
  function($scope, $stateParams, $location, toDoListApiFactory){
    $scope.hasError = function(fieldName) {
      var field = $scope.todolistForm[fieldName];
      return field.$invalid && field.$dirty ? 'has-error' : '';
    };

    $scope.todolist = null;

    getToDoList();
    function getToDoList(){
      toDoListApiFactory.getToDoList($stateParams.id).then(function(response){
        $scope.todolist = response.data;
      }, function (error){
        $scope.status = 'Unable to load list: ' + error.message;
      });
    }

    $scope.update = function(todolist) {
      toDoListApiFactory.updateToDoList(todolist);
      $location.path('#!/lists/');
    };
  }]
);