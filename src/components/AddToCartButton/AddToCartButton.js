import React, { useContext } from 'react'
import { CartContext } from '../CartProvider/CartProvider';

const AddToCartButton = ({product, qty}) => {

  const cartContext = useContext(CartContext);

  const addToCart = () => {
    
    const productInCart = cartContext.find((p) => (p.product.sku === product.sku))

    // validar si el producto esta en el carrito, suma la cantidad nueva seleccionada
    if (productInCart) {
        productInCart.qty+=qty;
    } else {
        cartContext.push({product: product, qty: qty})
    }
  }

  return (
    <>
      <button className="bg-dark_blue text-light_blue w-24 rounded-sm h-8" onClick={addToCart}>Agregar</button>
    </>
  )
}

export default AddToCartButton
