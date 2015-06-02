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

app.controller('ListController', function ($scope, Contacts) {
  $scope.contacts = Contacts.query();
});

app.controller('SingleController', function ($scope, Contacts, $routeParams, $location) {

  var id = parseInt( $routeParams.id , 10);

  $scope.contact = Contacts.get({ id: id });

  $scope.update = function () {
    $scope.contact.$update(function (updatedRecord) {
      $scope.contact = updatedRecord;
    });
  };

  $scope.delete = function () {
    $scope.contact.$delete(); 
    $location.url('/contacts');
  };

});
