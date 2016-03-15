angular.module('vendingMachine').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/home.html',
    "<h1 class=\"productHeader\">Vending Machine</h1><div class=\"container\"><div class=\"row\"><div class=\"col-sm-8\"> <div vm-products class=\"vmProducts\"></div></div><div class=\"col-sm-4\"><div vm-purchase-form class=\"vmPurchaseForm\"></div></div></div></div>"
  );


  $templateCache.put('partials/products.html',
    "<div ng-repeat=\"item in productsCtrl.items\" class=\"product\"><div class=\"productId\">{{item.id}}</div><div class=\"productName\">{{item.name}}</div><div class=\"productPrice\">{{item.price | currency}}</div><div ng-if=\"item.quantity &gt; 0\" class=\"productQuantity\">{{item.quantity}} remaining</div><div ng-if=\"item.quantity === 0\" class=\"outOfStock\">Out of Stock</div></div>"
  );


  $templateCache.put('partials/purchaseForm.html',
    "<div class=\"panel panel-default\"><div class=\"panel-heading\">Vending Machine</div><div class=\"panel-body form-inline\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"form-group\"><label>Item ID</label><input type=\"number\" ng-model=\"purchaseCtrl.selectedProductId\"></div></div></div><div class=\"row\"><div class=\"col-sm-12\"><button ng-click=\"purchaseCtrl.select()\" class=\"btn btn-primary btn--comfy\">Select</button><button ng-click=\"purchaseCtrl.resetFields()\" class=\"btn btn-link btn--comfy\">Reset</button></div></div><div class=\"row\"><div class=\"col-sm-12\"><div class=\"form-group\"><label>Payment</label><input ng-model=\"purchaseCtrl.payment\" type=\"text\" format=\"currency\" maxlength=\"4\"></div></div></div><div class=\"row\"><div class=\"col-sm-12\"><button ng-click=\"purchaseCtrl.process()\" ng-disabled=\"!purchaseCtrl.selectedProduct.price           || !purchaseCtrl.selectedProduct.quantity           || purchaseCtrl.success           || purchaseCtrl.selectedProduct.price &gt; purchaseCtrl.payment\" class=\"btn btn-primary btn-lg btn-block btn--comfyTop\">Pay</button></div></div></div><div class=\"panel-footer\"><div>Your Selection<div ng-if=\"purchaseCtrl.selectedProduct\" class=\"name\">Product:  {{purchaseCtrl.selectedProduct.name}}  </div><div ng-if=\"purchaseCtrl.selectedProduct\" class=\"price\">Price: {{purchaseCtrl.selectedProduct.price | currency}}</div><div ng-if=\"purchaseCtrl.change\" class=\"change\">Change: {{purchaseCtrl.change | currency}}</div><div ng-if=\"purchaseCtrl.alert\" class=\"alert bg-danger\">{{purchaseCtrl.alert}}\n" +
    "\n" +
    "\n" +
    "</div></div></div></div><div ng-if=\"purchaseCtrl.success\" class=\"panel panel-default\"><div class=\"panel-body\"><p>Thank you! Please take your item.</p><div ng-if=\"purchaseCtrl.selectedProduct &amp;&amp; purchaseCtrl.success &amp;&amp; purchaseCtrl.showProduct\" ng-click=\"purchaseCtrl.pickupProduct()\" class=\"dispenser dispenser__product btn btn-danger btn--comfy\">{{purchaseCtrl.selectedProduct.name}}  </div><div ng-if=\"purchaseCtrl.change &amp;&amp; purchaseCtrl.success &amp;&amp; purchaseCtrl.showChange \" ng-click=\"purchaseCtrl.pickupChange()\" class=\"dispenser dispenser__change btn btn-success btn--comfy\">{{purchaseCtrl.change | currency}} </div></div></div>"
  );

}]);
