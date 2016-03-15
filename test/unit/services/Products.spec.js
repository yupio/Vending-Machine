'use strict';

describe('Factory: Products', function () {
  var Products;
  var $http;
  var $httpBackend;
  var $q;
  var $rootScope;
  var _;
  var items;
  var formattedItems;
  var productsUpdated;

  beforeEach(angular.mock.module('vendingMachine'));

  beforeEach(inject(function ($injector) {
    Products = $injector.get('Products');
    $q = $injector.get('$q');
    $http = $injector.get('$http');
    _ = $injector.get('_');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
  }));

  beforeEach(function() {
    items = [
      {
        'name': 'Pepsi',
        'price': 0.75,
        'quantity': 6
      },
      {
        'name': 'Fanta',
        'price': 0.75,
        'quantity': 10
      }
    ];

    formattedItems = [
      {
        'name': 'Pepsi',
        'price': 0.75,
        'quantity': 6,
        'id': 100
      },
      {
        'name': 'Fanta',
        'price': 0.75,
        'quantity': 10,
        'id': 101
      }
    ];

    productsUpdated = 'productsUpdated';
    spyOn($rootScope, '$broadcast');
  });

  describe('fetch', function () {
    var response;
    beforeEach(function () {
      response = { items: items };
      $httpBackend.expectGET('../assets/items.json')
        .respond(200, response);
    });

    it('returns products', function () {
      var resolveSpy = jasmine.createSpy('resolveSpy');
      Products.fetch().then(resolveSpy);
      $httpBackend.flush();
      expect(resolveSpy).toHaveBeenCalledWith(response.items);
    });
  });

  describe('loadProducts', function () {
    describe('each product quantity is less or equal to 10', function () {
      beforeEach(function () {
        var deferred = $q.defer();
        deferred.resolve(items);
        spyOn(Products, 'fetch').and.returnValue(deferred.promise);
      });

      it('set products', function () {
        Products.loadProducts();
        $rootScope.$apply();
        expect(Products.products[1].quantity)
          .toBe(10);
        expect(Products.products.length).toBe(2);
      });

      it('set id', function () {
        Products.loadProducts();
        $rootScope.$apply();
        expect(Products.products[1].id)
          .toBe(101);
      });

      it('broadcast update', function () {
        Products.loadProducts();
        $rootScope.$apply();
        expect($rootScope.$broadcast)
          .toHaveBeenCalledWith(productsUpdated);
      });
    });

    describe('some product quantities are more than 10', function () {
      beforeEach(function () {
        var deferred = $q.defer();
        items[0].quantity = 18;
        deferred.resolve(items);
        spyOn(Products, 'fetch').and.returnValue(deferred.promise);
      });

      it('set products', function () {
        Products.loadProducts();
        $rootScope.$apply();
        expect(Products.products[1].quantity).toBe(8);
        expect(Products.products.length).toBe(3);
      });

      it('set id', function () {
        Products.loadProducts();
        $rootScope.$apply();
        expect(Products.products[2].id)
          .toBe(102);
      });

    });
  });

  describe('updateProduct', function () {
    var product;

 
    beforeEach(function () {
      Products.products = formattedItems;
    });

    describe('Product exists', function () {

     beforeEach(function () {
        product = {
          'name': 'Pepsi',
          'price': 0.75,
          'quantity': 5,
          'id': 100
        };
      });

      it('updates a product', function () {
        Products.updateProduct(product);
        expect(Products.products[0].quantity)
          .toBe(5);
      });

      it('broadcast update', function () {
        Products.updateProduct(product);
        expect($rootScope.$broadcast)
          .toHaveBeenCalledWith(productsUpdated);
      });

    });

    describe('Product does not exists', function () {
      beforeEach(function () {
        product = {
          'name': 'Pepsi',
          'price': 0.75,
          'quantity': 5,
          'id': 202
        };
      });

      it('does not broadcast', function () {
        Products.updateProduct(product);
        expect($rootScope.$broadcast)
          .not.toHaveBeenCalled();
      });
    });
  });

  describe('getProductById', function () {
    beforeEach(function () {
      Products.products = formattedItems;
    });

    it('returns a product', function () {
      var product = Products.getProductById(101);
      expect(product.name).toBe('Fanta');
    });
  });   

  describe('getProducts', function () {
    beforeEach(function () {
      Products.products = formattedItems;
    });

    it('returns all products', function () {
      var products = Products.getProducts();
      expect(products).toBe(formattedItems);
    });
  });  

  describe('setSelectedProduct', function () {
    beforeEach(function () {
      Products.products = formattedItems;
    });

    it('sets and gets selectedProductId', function () {
      Products.setSelectedProduct(101);
      expect(Products.getSelectedProduct().name).toBe('Fanta');
    });
  });  

});
