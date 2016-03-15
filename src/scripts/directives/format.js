'use strict';

// # Format
angular.module('vendingMachine').directive('format', [
  '$filter',
  function ($filter) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        if (!ctrl) {
          return;
        }
          
        ctrl.$formatters.unshift(function (a) {
          return $filter(attrs.format)(ctrl.$modelValue);
        });

        element.bind('blur', function(event) {
          var plainNumber = element.val().replace(/[^\d|\-+|\.+]/g, '');
          element.val($filter(attrs.format)(plainNumber));
        });

        element.bind('focus', function(event) {
          if(ctrl.$modelValue === 0){
            element.val('');
          }
        });
      }
    };
  }
]);
