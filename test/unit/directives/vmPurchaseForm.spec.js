'use strict';
describe('Directive: vmPurchaseForm', function () {
  var scope;
  var $compile;

  beforeEach(angular.mock.module('vendingMachine'));

  beforeEach(inject(function($injector) {
    $compile = $injector.get('$compile');
    scope    = $injector.get('$rootScope').$new();
  }));

  describe('default', function() {
    var element;
    var controller;
    var template = [
      '<div vm-purchse-form="">',
      '</div>'
    ].join('');

    beforeEach(function() {
      element = $compile(template)(scope);
      scope.$apply();
      controller = element.controller('vmPurchaseForm');
    });

    afterEach(function () {
      scope.$destroy();
    });
  });
});