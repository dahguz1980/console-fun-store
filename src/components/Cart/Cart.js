import React, { useContext } from 'react'
import { CartContext } from '../CartProvider/CartProvider'

const Cart = () => {

 const cartContext = useContext(CartContext)

  return (
    <div>
     { cartContext.forEach((item) => {
        
     })}
    </div>
  )
}

export default Cart
