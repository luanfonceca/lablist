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

    $scope.taskSortOptions = {
      //restrict move across columns. move only within column.
      accept: function (sourceItemHandleScope, destSortableScope) {
       return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
      },
      itemMoved: function (event) {
        event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
      },
      orderChanged: function (event) {
      },
    };

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
