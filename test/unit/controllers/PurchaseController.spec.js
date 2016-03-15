'use strict';

describe('Controller: PurchaseController', function() {
  var controller;
  var Products;
  var $timeout;
  var mockProduct;

  beforeEach(angular.mock.module('vendingMachine'));

  beforeEach(inject(function($injector, $rootScope, $controller) {
    Products = $injector.get('Products');
    $timeout = $injector.get('$timeout');
    controller = $controller('PurchaseController');
  }));

  beforeEach(function() {
    spyOn(Products, 'setSelectedProduct');
    spyOn(Products, 'updateProduct');
    mockProduct = {
      'name': 'Fanta',
      'price': 0.75,
      'quantity': 10,
      'id': 101
    };

  });

  it('is an object', function () {
    expect(angular.isObject(controller)).toBe(true);
  });

  describe('resetFields', function() {
    it('calls resetTimeout', function () {
      spyOn(controller, 'resetTimeout');
      controller.resetFields();
      expect(controller.resetTimeout).toHaveBeenCalled();
    });

    it('calls setSelectedProduct', function () {
      controller.resetFields();
      expect(Products.setSelectedProduct).toHaveBeenCalled();
    });

    it('reset values', function () {
      controller.selectedProductId = 101;
      controller.selectedProduct = {};
      controller.change = 10;
      controller.payment = 15;
      controller.alert = 'alert message';
      controller.success = true; 

      controller.resetFields();
      expect(controller.selectedProductId).toBe(null);
      expect(controller.selectedProduct).toBe(null);
      expect(controller.change).toBe(0);
      expect(controller.payment).toBe(0);
      expect(controller.alert).toBe(null);
      expect(controller.success).toBe(false);
    });
  });

  describe('select', function() {
    beforeEach(function(){
      spyOn(Products, 'selectedProductId');
      spyOn(controller, 'resetTimeout');
    });

    describe('selected product exists', function() {
      beforeEach(function(){
         controller.selectedProductId = 101;
        spyOn(Products, 'getSelectedProduct').and.returnValue(mockProduct);
      });

      it('resets values', function () {
        controller.select();
        expect(controller.alert).toBe(null);
        expect(controller.success).toBe(false);
        expect(controller.change).toBe(0);
      });

      it('calls setSelectedProductId', function () {
        controller.select();
        expect(Products.setSelectedProduct).toHaveBeenCalledWith(101);
      });

      it('calls setSelectedProductId', function () {
        controller.select();
        expect(Products.getSelectedProduct).toHaveBeenCalled();
      });
    });

    describe('selected product does not exists', function() {
      beforeEach(function(){
        spyOn(Products, 'getSelectedProduct').and.returnValue(undefined);
      });

      it('alert', function () {
        controller.selectedProductId = 20;
        controller.select();
        expect(controller.alert).toBe('Wrong ID, please try again.');
      });
    });

    describe('selected product is out of stock', function() {
      beforeEach(function(){
        var updatedMockProduct = angular.extend(mockProduct, {quantity: 0});
        spyOn(Products, 'getSelectedProduct').and.returnValue(updatedMockProduct);
      });

      it('alert', function () {
        controller.selectedProductId = 101;
        controller.select();
        expect(controller.alert).toBe('Out Of Stock');
      });
    });
  });

  describe('process', function() {
    describe('does not call updateProduct', function() {
      it('when no payment', function () {
        controller.payment = 0;
        controller.selectedProduct = {id: 101};
        controller.process();
        expect(Products.updateProduct).not.toHaveBeenCalled();
      });

      it('when no selectedProduct', function () {
        controller.payment = 5;
        controller.selectedProduct = null;
        controller.process();
        expect(Products.updateProduct).not.toHaveBeenCalled();
      });

      it('when payment less than the price', function () {
        controller.payment = 0.5;
        controller.selectedProduct = mockProduct;
        controller.process();
        expect(Products.updateProduct).not.toHaveBeenCalled();
      });
    });

    describe('has selectedProduct and payment', function() {
      var updatedMockProduct;

      beforeEach(function() {
        controller.payment = 5;
        controller.selectedProduct = mockProduct;
        controller.alert = 'alert message';
        controller.success = false;
        updatedMockProduct = angular.extend(mockProduct, {quantity: 9});
        spyOn(controller, 'logPurchase');
        spyOn(controller, 'calculateChange').and.returnValue(3.25);
        spyOn(controller, 'resetFields');
      });

      it('calls updateProduct', function () {
        controller.process();
        expect(Products.updateProduct).toHaveBeenCalledWith(updatedMockProduct);
      });

      it('resets alert', function () {
        controller.process();
        expect(controller.alert).toBe(null);
      });

      it('resets showProduct and showChange in dispenser', function () {
        controller.showProduct = false;
        controller.showChange = false;
        controller.process();
        expect(controller.showProduct).toBe(true);
        expect(controller.showChange).toBe(true);
      });

      it('calls calculate change', function () {
        controller.process();
        expect(controller.calculateChange).toHaveBeenCalledWith(0.75, 5);
      });

      it('calls log', function () {
        controller.process();
        expect(controller.logPurchase).toHaveBeenCalledWith(updatedMockProduct, 5, 3.25);
      });

      it('set success', function () {
        controller.process();
        expect(controller.success).toBe(true);
      });

      it('set payment to zero', function () {
        controller.process();
        expect(controller.payment).toBe(0);
      });

      it('calls resetFields after timeout', function () {
        controller.process();
        $timeout.flush();
        expect(controller.resetFields).toHaveBeenCalled();
      });
    });
  });

  it('cancel timeout', function () {
    controller.timeout = {};
    spyOn($timeout, 'cancel');
    controller.resetTimeout();
    expect($timeout.cancel).toHaveBeenCalledWith({});
  });

  it('calculateChange', function () {
    var change = controller.calculateChange(2, 10);
    expect(change).toBe(8);
  });

  describe('pickupProduct', function() {
    beforeEach(function() {
      spyOn(controller, 'resetFields');
    });

    it('hides product in dispenser', function () {
      controller.showProduct = true;
      controller.pickupProduct();
      expect(controller.showProduct).toBe(false);
    });

    it('calls resetFields when there is no change', function () {
      controller.showProduct = true;
      controller.change = 0;
      controller.pickupProduct();
      expect(controller.resetFields).toHaveBeenCalled();
    });

    it('calls resetFields when showChange is false', function () {
      controller.showProduct = true;
      controller.change = 10;
      controller.showChange = false;
      controller.pickupProduct();
      expect(controller.resetFields).toHaveBeenCalled();
    });

    it('does not call resetFields when change is not picked up', function () {
      controller.showProduct = true;
      controller.change = 10;
      controller.showChange = true;
      controller.pickupProduct();
      expect(controller.resetFields).not.toHaveBeenCalled();
    });
  });

  describe('pickupChange', function() {
    beforeEach(function() {
      spyOn(controller, 'resetFields');
    });

    it('hides change in dispenser', function () {
      controller.showChange = true;
      controller.pickupChange();
      expect(controller.showChange).toBe(false);
    });

    it('calls resetFields when showProduct is false', function () {
      controller.showChange = false;
      controller.pickupChange();
      expect(controller.showChange).toBe(false);
    });

    it('calls resetFields when showProduct is false', function () {
      controller.showChange = true;
      controller.showProduct = false;
      controller.pickupChange();
      expect(controller.resetFields).toHaveBeenCalled();
    });

    it('does not call resetFields when showProduct is true', function () {
      controller.showChange = true;
      controller.showProduct = true;
      controller.pickupChange();
      expect(controller.resetFields).not.toHaveBeenCalled();
    });
  });
});