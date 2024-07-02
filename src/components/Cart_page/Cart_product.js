import React from 'react'
import { Link } from 'react-router-dom'

const Cart_product = ({prod_name , imgUrl , price , rentavailibility, delivery, _id }) => {
  return (
    <>
        <div className='product-img'>
                    <img src={imgUrl} alt='no img'></img>
                </div>
                <div className='cart-prod-title'>
                    <h2>{prod_name}</h2>
                    <p>Delivery by {delivery}</p>
                </div>
                <div className='rent-availibility'>
                    <button> {rentavailibility}</button>
                </div>
                <div className='cart-price'>
                     rs {price}
                </div>
                <div className='cart-remove'>
                    remove icon
                </div>
                <Link to={`/product/${_id}`} className="product-link">
              <div className="view-prod"> View Product
               </div>
      </Link>
    </>
  )
}

export default Cart_product