import React, { useContext } from 'react'
import { CartContext } from '../CartProvider/CartProvider';

const AddToCartButton = ({product, qty}) => {

  const {addToCart} = useContext(CartContext);

  return (
    <>
      <button className="bg-dark_blue text-light_blue w-24 rounded-sm h-8" onClick={() => addToCart(product, qty)}>Agregar</button>
    </>
  )
}

export default AddToCartButton
