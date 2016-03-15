'use strict';

describe('Controller: ProductsController', function() {
  var controller;
  var _;
  var Products;

  beforeEach(angular.mock.module('vendingMachine'));

  beforeEach(inject(function($injector, $rootScope, $controller) {
    _ = $injector.get('_');
    Products = $injector.get('Products');
    controller = $controller('ProductsController');
  }));

  it('is an object', function () {
    expect(angular.isObject(controller)).toBe(true);
  });

  it('init', function() {
    spyOn(Products, 'loadProducts');
    controller.init();
    expect(Products.loadProducts).toHaveBeenCalled();
  });

  it('update product items', function() {
    spyOn(Products, 'getProducts');
    controller.updateProducts();
    expect(Products.getProducts).toHaveBeenCalled();
  });

});