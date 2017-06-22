var app = angular.module('lablist', [
  // External libs
  'ui.router',
  'oitozero.ngSweetAlert',

  // LabList
  'lablist.controllers',
  'lablist.services',
]);

app.config(function($stateProvider, $urlRouterProvider){
  // ToDoList routes
  $stateProvider.state('listToDoList', {
    url: '/lists/',
    templateUrl: '/static/app/templates/todolist/list.html',
    controller: 'listToDoListController'
  });
  $stateProvider.state('createToDoList', {
    url: '/lists/create/',
    templateUrl: '/static/app/templates/todolist/create.html',
    controller: 'createToDoListController'
  });
  $stateProvider.state('updateToDoList', {
    url: '/lists/update/:id/',
    templateUrl: '/static/app/templates/todolist/update.html',
    controller: 'updateToDoListController'
  });

  $urlRouterProvider.otherwise('/lists/');
});