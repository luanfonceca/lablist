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
      orderChanged: function (event) {
        var task = event.source.itemScope.modelValue;
        var position = event.dest.index;
        taskApiFactory.sortTaskByPosition(task, position);
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

    $scope.toggleTask = function(task){
      taskApiFactory.toggleTask(task);
    }
  }]
);

app.controller('createTaskController',
  ['$scope', '$stateParams', '$location', 'taskApiFactory',
  function($scope, $stateParams, $location, taskApiFactory){
    $scope.hasError = function(fieldName) {
      var field = $scope.taskForm[fieldName];
      return field.$invalid && field.$dirty ? 'has-error' : '';
    };

    $scope.todolistId = $stateParams.todolistId;
    $scope.create = function(task) {
      taskApiFactory.createTask(task, $scope.todolistId);
      $location.path(
        '#!/lists/' + $scope.todolistId + '/tasks/'
      );
    };
  }]
);

app.controller('updateTaskController',
  ['$scope', '$stateParams', '$location', 'taskApiFactory',
  function($scope, $stateParams, $location, taskApiFactory){
    $scope.hasError = function(fieldName) {
      var field = $scope.todolistForm[fieldName];
      return field.$invalid && field.$dirty ? 'has-error' : '';
    };

    $scope.task = null;
    getTaskById();
    function getTaskById(){
      taskApiFactory.getTaskById($stateParams.id).then(function(response){
        $scope.task = response.data;
      }, function (error){
        $scope.status = 'Unable to load task: ' + error.message;
      });
    }

    $scope.todolistId = $stateParams.todolistId;
    $scope.update = function(task) {
      taskApiFactory.updateTask(task);
      $location.path(
        '#!/lists/' + $scope.todolistId + '/tasks/'
      );
    };
  }]
);