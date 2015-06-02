var app = angular.module('ContactsApp', ['ngRoute', 'ngResource']);

app.factory('Contacts', function ($resource) {
  return $resource('/api/contacts/:id', { id: '@id' }, {
    'update': { method: 'PUT' }
  });
});
