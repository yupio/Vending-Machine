'use strict';

angular.module('vendingMachine').factory('Products', [
  '$http',
  '$rootScope',
  '_',
  function (
    $http, 
    $rootScope, 
    _
  ) {
    var Products = {
      maxPerSlot: 10,
      maxSlotCount: 100,
      startId: 100,
      products: [],
      selectedProductId: null,

      fetch: function () {
        return $http.get('../assets/items.json').
          then(function (response) {
            return response.data.items;
          });
      },

      loadProducts: function () {
        this.fetch().then(function(products) {
          var maxPerSlot = Products.maxPerSlot;
          var maxSlotCount = Products.maxSlotCount;
          var id = Products.startId;
          var total = 0;
          Products.products = [];

          angular.forEach(products, function(product) {
            var quantity = product.quantity;
            var tempProduct;
            //vending machine can hold up to 100 item types
            if(total >= maxSlotCount) {
              return;
            }

            //make sure only 10 products per slot
            if (quantity <= maxPerSlot) {
              product.id = id;
              Products.products.push(product);
              id++;
              total++;
            }
            else {
              var count = Math.ceil(quantity/maxPerSlot);

              while (count--) {
                tempProduct = angular.copy(product);

                if (count !== 0) {
                  quantity = quantity - maxPerSlot;
                  tempProduct.quantity = maxPerSlot;
                }
                else {
                  tempProduct.quantity  = quantity;
                }
                tempProduct.id = id;
                id++;
                total++;

                Products.products.push(tempProduct);
              }
            }
            
          });

          $rootScope.$broadcast('productsUpdated');
        });
      },


      getProducts: function () {
        return this.products;
      },

      updateProduct : function (product) {
        var _index = _.findIndex(this.products,{id: product.id});
        if(_index > -1) {
          this.products[_index] = product;
          $rootScope.$broadcast('productsUpdated');
        }
      },

      getProductById : function (id) {
        return _.findWhere(this.products,{id: id});
      },

      setSelectedProduct : function (id) {
        this.selectedProductId = id;
      },

      getSelectedProduct : function () {
        return this.getProductById(this.selectedProductId);
      }
    };
    return Products;
  }
]);
