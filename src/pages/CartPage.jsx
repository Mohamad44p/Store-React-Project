import React from 'react';
import Cart from '../components/Cart';
import '../Styles/Header.css';
const CartPage = () => {
  return (
    <div>
      <div className='HomePage-Title'><h1 className='title-HomePage'>My Bag</h1></div>
      <Cart />
    </div>
  );
};

export default CartPage;
