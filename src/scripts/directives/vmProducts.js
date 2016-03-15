'use strict';

// # Chart sample
angular.module('vendingMachine').directive('vmProducts', [
  function () {
    return {
      replace: false,
      controller: 'ProductsController',
      controllerAs: 'productsCtrl',
      templateUrl: 'partials/products.html',
      link: function(scope, element, attrs, ctrl) {
        scope.$on('productsUpdated', function () {
          ctrl.updateProducts();
        });    
      }
    };
  }
]);
