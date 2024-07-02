import React, { useContext } from 'react';
import Cart_product from './Cart_product';
import { CartContext } from './CartProvider';
import "./Cart.css"
import Header from "../Home_page/Header.1";

const ContextCart = () => {
  const { item , totalAmount } = useContext(CartContext);

  return (
    <div>
        <Header/>
      <div className='cart-section'>
        <div className='cont-shopping'>
          back arrow
          <h3>continue shopping</h3>
        </div>
      </div>
      <section className='main-cart-sec'>
        <h1>Shopping cart</h1>
        <p>You have <span className='total-items-count'>{item.length}</span> items in shopping cart</p>
        <div className='cart-items'>
          <div className='cart-items-container'>
            <div className='items-info'>
              {item.length > 0 ? item.map((currItem) => (
                <Cart_product key={currItem._id} {...currItem} />
              )) : <p>Your cart is empty</p>}
            </div>
          </div>
        </div>
        <div className='item-total'>
          <h3>Total Amount: {totalAmount}</h3>
          <button>Checkout</button>
        </div>
      </section>
    </div>
  );
};

export default ContextCart;
