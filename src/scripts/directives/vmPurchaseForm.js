'use strict';

// # Chart sample
angular.module('vendingMachine').directive('vmPurchaseForm', [
  function () {
    return {
      replace: false,
      controller: 'PurchaseController',
      controllerAs: 'purchaseCtrl',
      templateUrl: 'partials/purchaseForm.html'
    };
  }
]);
