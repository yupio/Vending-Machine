'use strict';

// # Products Controller

function ProductsController (Products, _) {  
  this.Products = Products;
  this._ = _;
  this.init();
}

ProductsController.prototype.init = function () {
  this.items = [];
  this.Products.loadProducts();
};

ProductsController.prototype.updateProducts = function () {
  this.items = this.Products.getProducts();
};

ProductsController.$inject = ['Products', '_'];

angular.module('vendingMachine').controller('ProductsController', ProductsController);
