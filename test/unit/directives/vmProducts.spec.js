'use strict';

describe('Directive: vmProducts', function () {
  var scope;
  var $compile;
  var controller;

  beforeEach(angular.mock.module('vendingMachine'));

  beforeEach(angular.mock.module(function ($controllerProvider) {
    $controllerProvider.register('ProductsController', function () {
      this.updateProducts = jasmine.createSpy();
    });
  }));

  beforeEach(inject(function($injector) {
    $compile = $injector.get('$compile');
    scope    = $injector.get('$rootScope').$new();
  }));
  describe('default', function() {
    var element;
    var template = [
      '<div vm-products="">',
      '</div>'
    ].join('');

    beforeEach(function () {
      element = $compile(template)(scope);
      scope.$apply();
      controller = element.controller('vmProducts');
    });

    afterEach(function () {
      scope.$destroy();
    });

    it('calls updateProduct on prouductsUpdated', function () {
      scope.$broadcast('productsUpdated');
      expect(controller.updateProducts).toHaveBeenCalled();
    });
  });
});