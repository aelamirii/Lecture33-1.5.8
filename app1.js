(function () {
'use strict';

angular.module('ShoppingListComponentApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
// .directive('shoppingList', ShoppingList)
.component('shoppingList', {
      templateUrl: 'shoppingList1.html',
      controller: ShoppingListComponentController,
      bindings: {
        listComponent: '<',
        titleConponent: '@',
        onRemove: '&'
      }
})
;


ShoppingListComponentController.$inject = ['$scope', '$element'];
function ShoppingListComponentController($scope, $element) {

  var $ctrl_temps = this;

  var totalItems ;

  $ctrl_temps.findcookies = function () {

    for (var i = 0; i < $ctrl_temps.listComponent.getItems.length; i++) {
      var name = $ctrl_temps.listComponent.getItems[i].name;
      if(name.toLowerCase().indexOf("cookies") !== -1)
      return true;
    }
    return false;
  };

  $ctrl_temps.remove = function (myindex) {
    $ctrl_temps.onRemove({ index_Key : myindex });
  };

$ctrl_temps.$onInit = function () {
  totalItems = 0;
};

$ctrl_temps.$onChanges = function (changeObj) {
  console.log("Changes are :", changeObj);
};



$ctrl_temps.$doCheck = function () {

// console.log("$ctrl_temps :", $ctrl_temps);
  if($ctrl_temps.listComponent.getItems.length !== totalItems)
  {
    console.log("Totla Items = ", totalItems);
    console.log("$ctrl_temps.listItems.getItems.length :", $ctrl_temps.listComponent.getItems.length);

  totalItems = $ctrl_temps.listComponent.getItems.length;

  if($ctrl_temps.findcookies())
  {
    console.log("Oh, cookies detected ");
    var WarningElement = $element.find('div.error');
    WarningElement.slideDown(800);
  }
  else {
    var WarningElement = $element.find('div.error');
    WarningElement.slideUp(800);
    console.log("No cookies existed ");
  }

  }

};






};



// function ShoppingList() {
//
//   var ddo = {
//     templateUrl: 'shoppingList1.html',
//     scope: {
//       listDirective: '<',
//       titleDirective: '@',
//       onRemove: '&'
//     },
//     controller: ShoppingListDirectiveController,
//     controllerAs: 'ListDirectiveController',
//     bindToController: true,
//     link: ShoppingListDirectiveLink,
//     transclude: true
//   };
//   return ddo;
// };




//
// function ShoppingListDirectiveLink(scope, element, attrs, controller) {
//
//   console.log("scope :", scope);
//   console.log("element :", element);
//   console.log("attrs :", attrs);
//   console.log("controller :", controller);
//
//   scope.$watch('ListDirectiveController.findcookies()', function (newValue, oldValue) {
//
//     console.log("Old Value :", oldValue);
//     console.log("New Value :", newValue);
//
//     if(newValue === true)
//     {
//       DisplayWarningcookies();
//     }
//     else {
//       RemoveWarningcookies()
//     }
//
//   });
//
//   function DisplayWarningcookies() {
//     // Using JkLite
//     // var WarningMessage = element.find("div");
//     // WarningMessage.css("display", "block");
//
//     // Using jQuery
//     var WarningMessage = element.find("div.error");
//     WarningMessage.slideDown(800);
//
//   };
//
//   function RemoveWarningcookies() {
//     // Using JkLite
//     // var WarningMessage = element.find("div");
//     // WarningMessage.css("display", "none");
//
//     // Using jQuery
//     var WarningMessage = element.find("div.error");
//     WarningMessage.slideUp(800);
//
//   };
//
// };
//
//
//
//
// function ShoppingListDirectiveController() {
//
//   var list_temps = this;
//
//   list_temps.findcookies = function () {
//
//     for (var i = 0; i < list_temps.listDirective.getItems.length; i++) {
//       var name = list_temps.listDirective.getItems[i].name;
//       if(name.toLowerCase().indexOf("cookies") !== -1)
//       return true;
//     }
//     return false;
//   };
//
// };



ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory();

  list.ItemName = "";
  list.ItemQuantity = "";

  list.getItems = ShoppingList.getItems();

  var Org_Title = "Shopping List 1 ";
  list.TitleController = Org_Title + "("+ list.getItems.length +")";

  list.addItem = function () {
    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity );
      list.TitleController = Org_Title + "("+ list.getItems.length +")";
    } catch (e) {
      list.errorMessage = e.message
    } finally {

    }
  };

  list.RemoveItem = function (indexItem) {
      console.log("this is :", this);
      list.LastRemoved = "Last item removed was :"+ list.getItems[indexItem].name;
      ShoppingList.RemoveItem(indexItem);
      list.errorMessage = "";
      this.TitleController = Org_Title + "("+ list.getItems.length +")";
  };

};



function ShoppingList_Service(maxItems) {

  var service = this;

  var Items = [];

  service.addItem = function (itemName, itemQuantity) {

    if( ( maxItems === undefined ) ||
        ( maxItems !== undefined && Items.length < maxItems )
    )
    {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      Items.push(item);
    }
    else {
      throw new Error("Max items ("+ Items.length +") was reached");
    }

  };

  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice( indexItem, 1 );
  };

};



function ShoppingListFactory() {

  var factory = function (maxItems) {
    return new ShoppingList_Service(maxItems);
  };
  return factory;
};



})();
