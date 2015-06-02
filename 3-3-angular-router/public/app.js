var app = angular.module('ContactsApp', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/contacts', {
      controller: 'ListController',
      templateUrl: 'views/list.html'
    })
    .when('/contacts/new', {
      controller: 'NewController',
      templateUrl: 'views/new.html'
    })
    .when('/contacts/:id', {
      controller: 'SingleController',
      templateUrl: 'views/single.html'
    })
    .otherwise({
      redirectTo: '/contacts' 
    });

    $locationProvider.html5Mode(true);
});

app.factory('Contacts', function ($resource) {
  return $resource('/api/contacts/:id', { id: '@id' }, {
    'update': { method: 'PUT' }
  });
});
