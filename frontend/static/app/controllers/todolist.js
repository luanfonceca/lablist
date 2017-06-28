var app = angular.module('lablist.controllers.todolist', []);

app.controller('listToDoListController', [
  '$scope', 'toDoListApiFactory', 'SweetAlert',
  function($scope, toDoListApiFactory, SweetAlert){
    $scope.lists = [];

    getToDoListByIds();
    function getToDoListByIds(){
      toDoListApiFactory.getToDoListByIds().then(function(response){
        $scope.lists = response.data;
      }, function (error){
        $scope.status = 'Unable to load lists: ' + error.message;
      });
    }

    $scope.deleteToDoList = function(id){
      SweetAlert.swal({
        title: 'Are you sure?',
        text: 'Your will not be able to undo this action!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: true,
      }, function(isConfirm){
        if (isConfirm) {
          toDoListApiFactory.deleteToDoListById(id);
        }
      });
    }
  }]
);

app.controller('createToDoListController',
  ['$scope', '$location', '$state', 'toDoListApiFactory',
  function($scope, $location, $state, toDoListApiFactory){
    $scope.hasError = function(fieldName) {
      var field = $scope.todolistForm[fieldName];
      return field.$invalid && field.$dirty ? 'has-error' : '';
    };

    $scope.create = function(todolist) {
      toDoListApiFactory.createToDoList(
        todolist
      ).then(function(response) {
        $state.go('listToDoListRoute');
      });
    };
  }]
);

app.controller('updateToDoListController',
  ['$scope', '$state', '$stateParams', '$location', 'toDoListApiFactory',
  function($scope, $state, $stateParams, $location, toDoListApiFactory){
    $scope.hasError = function(fieldName) {
      var field = $scope.todolistForm[fieldName];
      return field.$invalid && field.$dirty ? 'has-error' : '';
    };

    $scope.todolist = null;

    getToDoListById();
    function getToDoListById(){
      toDoListApiFactory.getToDoListById($stateParams.id).then(function(response){
        $scope.todolist = response.data;
      }, function (error){
        $scope.status = 'Unable to load list: ' + error.message;
      });
    }

    $scope.update = function(todolist) {
      toDoListApiFactory.updateToDoList(
        todolist
      ).then(function(response) {
        $state.go('listToDoListRoute');
      });
    };
  }]
);