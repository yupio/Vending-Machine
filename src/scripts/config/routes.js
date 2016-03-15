'use strict';

// # Routes

angular.module('vendingMachine').config([
  '$routeProvider',
  function(
    $routeProvider
  ) {
    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: 'views/home.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);
