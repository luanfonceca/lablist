var app = angular.module('lablist.controllers', []);

app.controller('toDoListController', [
  '$scope', 'toDoListApiFactory', function($scope, toDoListApiFactory){
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