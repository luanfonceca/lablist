var app = angular.module('lablist.controllers.task', []);

app.controller('listTaskController',
  ['$scope', '$rootScope', '$state', '$stateParams',
   'toDoListApiFactory', 'taskApiFactory', 'SweetAlert',
   'Socialshare',
  function($scope, $rootScope, $state, $stateParams,
    toDoListApiFactory, taskApiFactory, SweetAlert, Socialshare){
    $scope.todolist = null;
    $scope.tasks = [];

    getToDoListById();
    function getToDoListById(){
      toDoListApiFactory.getToDoListById(
        $stateParams.todolistId, $rootScope.request_headers
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
        taskApiFactory.sortTaskByPosition(
          task, position, $rootScope.request_headers
        );
      },
    };

    $scope.deleteTask = function(task){
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
          taskApiFactory.deleteTask(
            task, $rootScope.request_headers
          ).then(function(response){
            var index = $scope.tasks.indexOf(task);
            $scope.tasks.splice(index, 1);
          });
        }
      });
    }

    $scope.toggleTask = function(task){
      taskApiFactory.toggleTask(
        task, $rootScope.request_headers
      );
    }

    $scope.shareTask = function(todolist, task){
      if (!task.is_done) {
        return false;
      }

      Socialshare.share({
        'provider': 'facebook',
        'attrs': {
          'socialshareUrl': 'http://lablist.herokuapp.com',
        }
      });
    }
  }]
);

app.controller('createTaskController',
  ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'taskApiFactory',
  function($scope, $rootScope, $state, $stateParams, $location, taskApiFactory){
    $scope.hasError = function(fieldName) {
      var field = $scope.taskForm[fieldName];
      return field.$invalid && field.$dirty ? 'has-error' : '';
    };

    $scope.todolistId = $stateParams.todolistId;
    $scope.create = function(task) {
      taskApiFactory.createTask(
        task, $scope.todolistId, $rootScope.request_headers
      ).then(function(response) {
        $state.go(
          'listTaskRoute', {todolistId: $scope.todolistId}
        );
      });
    };
  }]
);

app.controller('updateTaskController',
  ['$scope', '$rootScope', '$state', '$stateParams', 'taskApiFactory',
  function($scope, $rootScope, $state, $stateParams, taskApiFactory){
    $scope.hasError = function(fieldName) {
      var field = $scope.taskForm[fieldName];
      return field.$invalid && field.$dirty ? 'has-error' : '';
    };

    $scope.task = null;
    getTaskById();
    function getTaskById(){
      taskApiFactory.getTaskById(
        $stateParams.id, $rootScope.request_headers
      ).then(function(response){
        $scope.task = response.data;
      }, function (error){
        $scope.status = 'Unable to load task: ' + error.message;
      });
    }

    $scope.todolistId = $stateParams.todolistId;
    $scope.update = function(task) {
      taskApiFactory.updateTask(
        task, $rootScope.request_headers
      ).then(function(response) {
        $state.go(
          'listTaskRoute', {todolistId: $scope.todolistId}
        );
      });
    };
  }]
);