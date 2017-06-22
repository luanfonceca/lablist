var app = angular.module('lablist', [
  'ui.router',
  'lablist.controllers',
  'lablist.services',
]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('list', {
    url: '/lists/',
    templateUrl: '/static/app/templates/todolist/list.html',
    controller: 'listToDoListController'
  });
  $stateProvider.state('create', {
    url: '/lists/create/',
    templateUrl: '/static/app/templates/todolist/create.html',
    controller: 'createToDoListController'
  });

  $urlRouterProvider.otherwise('/lists/');
});