var app = angular.module('lablist', [
  'ui.router',
]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('home', {
    url: '/',
    templateUrl: '/static/app/templates/home.html',
    controller: 'toDoListController'
  });
  $urlRouterProvider.otherwise('/');
});

app.controller('toDoListController', ['$scope', 'ToDoListApiFactory', function($scope, ToDoListApiFactory){
  $scope.lists = [];

  getToDoLists();
  function getToDoLists(){
    ToDoListApiFactory.getToDoLists().then(function(response){
      $scope.lists = response.data;
    }, function (error){
      $scope.status = 'Unable to load lists: ' + error.message;
    });
  }
}]);

app.factory('ToDoListApiFactory', ['$http', function($http){
  var urlBase = '/api/lists/';
  var ToDoListApiFactory = {};

  ToDoListApiFactory.getToDoLists = function (){
    return $http.get(urlBase);
  };

  return ToDoListApiFactory;
}]);