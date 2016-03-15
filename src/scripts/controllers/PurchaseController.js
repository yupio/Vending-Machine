'use strict';

// # Purchase Controller

function PurchaseController (Products, $timeout) {  
  this.Products = Products;
  this.resetFields();
  this.$timeout = $timeout;
  this.debug = true;
 }

PurchaseController.prototype.resetFields = function () {
  this.resetTimeout();
  this.Products.setSelectedProduct(null);

  this.selectedProductId = null;
  this.selectedProduct = null;
  this.change = 0;
  this.payment = 0;
  this.alert = null;
  this.success = false; 
};

PurchaseController.prototype.select = function () {
  this.alert = null;
  this.change = 0;
  this.success = false;

  this.resetTimeout();

  this.Products.setSelectedProduct(this.selectedProductId);
  this.selectedProduct =  this.Products.getSelectedProduct();

  if(!this.selectedProduct) {
  	this.alert = 'Wrong ID, please try again.';
  }
  if(this.selectedProduct && !this.selectedProduct.quantity) {
  	this.alert = 'Out Of Stock';
  }
};

PurchaseController.prototype.process = function () {
  if(!this.selectedProduct || !this.payment) {
    return;
  }

  if(this.selectedProduct.price > this.payment) {
    return;
  }

  var that = this;
  this.alert = null; 
  this.selectedProduct.quantity--;
  this.Products.updateProduct(this.selectedProduct);
  this.change = this.calculateChange(this.selectedProduct.price, this.payment);

  this.logPurchase(this.selectedProduct, this.payment, this.change);

  this.showProduct = true;
  this.showChange = true;

  // If this is a real vending machine, we need to get a broadcast that says 
  // 'product dispensed', then show success.
  this.success = true;
  this.payment = 0;

  // Reset vending machine after 15 sec
  this.timeout = this.$timeout(function() {
  	that.resetFields();
  }, 15000);
};

PurchaseController.prototype.calculateChange = function (price, payment) {
  return payment - price;
};

PurchaseController.prototype.logPurchase = function (product, payment, change) {
  if(!this.debug) {
    return;
  }

  console.log('**** Product sold: ' + new Date());
  console.log('id: ' + product.id + ' | name: ' + product.name + ' | price: $' + product.price);
  console.log('paid: $' + payment + ' | change: $' + change);
};

PurchaseController.prototype.resetTimeout = function () {
  if(this.timeout) {
  	this.$timeout.cancel(this.timeout);
  }
};

PurchaseController.prototype.pickupProduct = function () {
  this.showProduct = false;
  if (!this.change || this.change && !this.showChange) {
    this.resetFields();
  }
};

PurchaseController.prototype.pickupChange = function () {
  this.showChange = false; 
  if (!this.showProduct) {
    this.resetFields();
  }
};

PurchaseController.$inject = ['Products','$timeout'];

angular.module('vendingMachine').controller('PurchaseController', PurchaseController);