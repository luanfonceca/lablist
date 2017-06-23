var app = angular.module('lablist.controllers.task', []);

app.controller('listTaskController', [
  '$scope', '$stateParams', 'toDoListApiFactory', 'taskApiFactory', 'SweetAlert',
  function($scope, $stateParams, toDoListApiFactory, taskApiFactory, SweetAlert){
    $scope.todolist = null;
    $scope.tasks = [];

    getToDoListById();
    function getToDoListById(){
      toDoListApiFactory.getToDoListById(
        $stateParams.todolistId
      ).then(function(response){
        $scope.todolist = response.data;
        $scope.tasks = $scope.todolist.tasks;
      }, function (error){
        $scope.status = 'Unable to load list: ' + error.message;
      });
    }

    $scope.deleteTask = function(id){
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
          taskApiFactory.deleteTaskById(id);
        }
      });
    }
  }]
);
