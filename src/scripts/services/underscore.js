'use strict';

angular.module('vendingMachine').service('_', [
  '$window',
  function(
    $window
  ) {
    return $window._;
  }
]);