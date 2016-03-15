'use strict';

angular.module('vendingMachine', ['ngRoute', 'ui.bootstrap']);

// ## Source Requires
// Our components required files. Also note, that when you use a Yeoman
// subgenerator a `require` for the created file will be automatically appended
// here. It's best not to modify this file too much beyone this point because of
// that.
require('./config/routes');
require('./templates');
require('./controllers/HomeController.js');
require('./controllers/ProductsController.js');
require('./controllers/PurchaseController.js');


require('./directives/format.js');

require('./directives/vmProducts.js');
require('./directives/vmPurchaseForm.js');
require('./services/Products.js');
require('./services/underscore.js');