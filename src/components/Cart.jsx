import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

import '../Styles/Cart.css'
const Cart = () => {

  const cartItems = useSelector((state) => state.cart.items);

  if (cartItems.length === 0) {
    return (
      <div className="container-cart-empty">
      <div class="terminal-loader">
      <div class="terminal-header">
        <div class="terminal-title">Status</div>
        <div class="terminal-controls">
          <div class="control close"></div>
          <div class="control minimize"></div>
          <div class="control maximize"></div>
        </div>
      </div>
      <div class="text">
        Your Bag is Empty... <br/>
        Looks like you haven't added anything to your bag yet.
        </div>
    </div>
    </div>
    );
  }

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Cart;
