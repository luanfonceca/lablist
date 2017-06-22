var app = angular.module('lablist', [
  'ui.router',
  'lablist.controllers',
  'lablist.services',
]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('list', {
    url: '/',
    templateUrl: '/static/app/templates/todolist/list.html',
    controller: 'toDoListController'
  });

  $urlRouterProvider.otherwise('/');
});