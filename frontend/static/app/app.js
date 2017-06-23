var app = angular.module('lablist', [
  // External libs
  'ui.router',
  'oitozero.ngSweetAlert',
  'as.sortable',

  // ToDoList
  'lablist.controllers.todolist',
  'lablist.services.todolist',

  // ToDoList
  'lablist.controllers.task',
  'lablist.services.task',
]);

app.config(function($stateProvider, $urlRouterProvider){
  // ToDoList routes
  $stateProvider.state('listToDoListRoute', {
    url: '/lists/',
    templateUrl: '/static/app/templates/todolist/list.html',
    controller: 'listToDoListController'
  });
  $stateProvider.state('createToDoListRoute', {
    url: '/lists/create/',
    templateUrl: '/static/app/templates/todolist/create.html',
    controller: 'createToDoListController'
  });
  $stateProvider.state('updateToDoListRoute', {
    url: '/lists/update/:id/',
    templateUrl: '/static/app/templates/todolist/update.html',
    controller: 'updateToDoListController'
  });

  // Task routes
  $stateProvider.state('listTaskRoute', {
    url: '/lists/:todolistId/tasks/',
    templateUrl: '/static/app/templates/task/list.html',
    controller: 'listTaskController',
  });

  $urlRouterProvider.otherwise('/lists/');
});