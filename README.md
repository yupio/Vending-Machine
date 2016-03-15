#Vending Machine

Design and write JavaScript code for a vending machine interaction scenario.

##Requirements

1.     The vending machine stores items in slots - snacks and drinks.
2.     The vendor can add items to the vending machine.
3.     The items have a price.
4.     The vending machine allows customers to insert a dollar amount and pick a number to select an item in the vending machine.
5.     The vending machine dispenses the purchased item and returns change at the end of the transaction.


When the program starts, the vendor will load some items into the vending machine. Items are loaded in a sequence. The vending machine can store 100 types of items, with 10 of each item per slot. Once the loading is completed, the customer can buy some items.

##Input

items.json

Contains item information (item name, cost). This represents the items the vendor is adding to the machine. 10 of each item type should be loaded into each slot in the vending machine and each item type should be assigned a number used to select the item.

Sample model for an item:

```
{
 "name": "Pepsi",
 "price": 0.75,
 "quantity": 20
}
```

##UI Requirements

Build a single page UI with Angular that displays the items currently in stock, allows the user to enter a dollar amount, choose an item by number, and then receive change if necessary. The UI should also notify users when an item is out of stock.


##Extra credit

Provide unit tests for the code you write.
