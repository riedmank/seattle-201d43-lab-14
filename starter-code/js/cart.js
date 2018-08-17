/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
// var table = document.getElementById('cart');
// table.addEventListener('click', removeItemFromCart);
var cart;

var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function loadCart() {
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var body = document.getElementsByTagName('tbody')[0];

  while (body.firstChild){
    body.removeChild(body.firstChild);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var body = document.getElementsByTagName('tbody')[0];
  // var table = document.getElementById('cart');
  // TODO: Iterate over the items in the cart
  cart.items.forEach(function(item){

    // TODO: Create a TR
    var tr = document.createElement('tr');

    // TODO: Create a TD for the delete link, quantity,  and the item
    // var itemName = document.createElement('td');
    var itemQuantity = document.createElement('td');
    var deleteItem = document.createElement('td');

    var itemImage = document.createElement('img');
    var path;

    // jury rigged filepath... UGH
    if (item.product.toLowerCase() === 'usb'){
      path = `assets/${item.product.toLowerCase()}.gif`;
    } else if (item.product.toLowerCase() === 'sweep') {
      path = `assets/${item.product.toLowerCase()}.png`;
    } else if (item.product.toLowerCase() === 'taun-taun') {
      path = 'assets/tauntaun.jpg';
    } else if (item.product.toLowerCase() === 'pet sweep') {
      path = 'assets/pet-sweep.jpg';
    } else {
      path = `assets/${item.product.toLowerCase()}.jpg`;
    }
    console.log(path);
    itemImage.src = path;
    itemImage.style.height = '40px';
    itemImage.style.width = '40px';
    var deleteButton = document.createElement('button');

    deleteButton.addEventListener('click', function(){
      removeItemFromCart(item);
    });
    deleteButton.textContent = 'X';

    // itemName.textContent = item.product;
    itemQuantity.textContent = item.quantity;
    deleteItem.appendChild(deleteButton);

    tr.appendChild(deleteItem);
    tr.appendChild(itemQuantity);
    tr.appendChild(itemImage);

    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    body.appendChild(tr);

  });


}

function removeItemFromCart(index) {
  cart.removeItem(index);
  // cart.items.splice(index,1);
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  clearCart();
  var newItems = JSON.stringify(cartItems);
  localStorage.setItem('cartItems', newItems);
  // TODO: Re-draw the cart table
  showCart();
}

// This will initialize the page and draw the cart on screen
renderCart();