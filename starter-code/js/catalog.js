/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //Complete //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var item = document.createElement('option');
    item.textContent = Product.allProducts[i].name;
    item.value = Product.allProducts[i].name;
    selectElement.appendChild(item);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(e) {

  //Complete // TODO: Prevent the page from reloading
  e.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
  var reset = document.getElementById('quantity');
  reset.reset();
}

//Complete // TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  //Complete // TODO: suss out the item picked from the select list
  var element = document.getElementById('items');
  var item = element.options[element.selectedIndex].value;
  //Complete // TODO: get the quantity
  var quantity = document.getElementById('quantity').value;
  //Complete // TODO: using those, add one item to the Cart
  cart.addItem(item, quantity);
}

var counter = document.getElementById('itemCount');
counter.textContent = 0;
//Complete // TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var counter = document.getElementById('itemCount');
  counter.textContent = parseInt(counter.textContent) + parseInt(document.getElementById('quantity').value);
}

//Complete // TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
var element = document.getElementById('cartContents');
var ul = document.createElement('ul');
element.appendChild(ul);
function updateCartPreview() {
  //Complete // TODO: Get the item and quantity from the form
  var cartItem = document.getElementById('items');
  var item = cartItem.options[cartItem.selectedIndex].value;
  var quantity = document.getElementById('quantity').value;
  //Complete // TODO: Add a new element to the cartContents div with that information
  var li = document.createElement('li');
  li.textContent = `${item} ${quantity}`;
  ul.appendChild(li);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();

var cartLoad = JSON.parse(localStorage.getItem('cartItems'));
if(cartLoad) {
  var sum = 0;
  for(var i = 0; i < cartLoad.length; i++) {
    var li = document.createElement('li');
    li.textContent = `${cartLoad[i].product} ${cartLoad[i].quantity}`;
    ul.appendChild(li);
    sum += parseInt(cartLoad[i].quantity);
  }
  counter.textContent = sum;
}
