var app = angular.module('lablist.controllers.todolist', []);

app.controller('listToDoListController', [
  '$scope', '$rootScope', 'toDoListApiFactory', 'SweetAlert',
  function($scope, $rootScope, toDoListApiFactory, SweetAlert){
    $scope.lists = [];

    getToDoListByIds();
    function getToDoListByIds(){
      toDoListApiFactory.getToDoListByIds(
        $rootScope.request_headers
      ).then(function(response){
        $scope.lists = response.data;
      }, function (error){
        $scope.status = 'Unable to load lists: ' + error.message;
      });
    }

    $scope.deleteToDoList = function(list){
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
          toDoListApiFactory.deleteToDoListById(
            list.id, $rootScope.request_headers
          ).then(function(response){
            var index = $scope.lists.indexOf(list);
            $scope.lists.splice(index, 1);
          });
        }
      });
    }
  }]
);

app.controller('createToDoListController',
  ['$scope', '$rootScope', '$state', 'toDoListApiFactory',
  function($scope, $rootScope, $state, toDoListApiFactory){
    $scope.hasError = function(fieldName) {
      var field = $scope.todolistForm[fieldName];
      return field.$invalid && field.$dirty ? 'has-error' : '';
    };

    $scope.create = function(todolist) {
      toDoListApiFactory.createToDoList(
        todolist, $rootScope.request_headers
      ).then(function(response) {
        $state.go('listToDoListRoute');
      });
    };
  }]
);

app.controller('updateToDoListController',
  ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'toDoListApiFactory',
  function($scope, $rootScope, $state, $stateParams, $location, toDoListApiFactory){
    $scope.hasError = function(fieldName) {
      var field = $scope.todolistForm[fieldName];
      return field.$invalid && field.$dirty ? 'has-error' : '';
    };

    $scope.todolist = null;
    getToDoListById();
    function getToDoListById(){
      toDoListApiFactory.getToDoListById(
        $stateParams.id, $rootScope.request_headers
      ).then(function(response){
        $scope.todolist = response.data;
      }, function (error){
        $scope.status = 'Unable to load list: ' + error.message;
      });
    }

    $scope.update = function(todolist) {
      toDoListApiFactory.updateToDoList(
        todolist, $rootScope.request_headers
      ).then(function(response) {
        $state.go('listToDoListRoute');
      });
    };
  }]
);