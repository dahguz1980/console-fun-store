import { createContext, useState } from "react";
import toastify from "toastify-js";

// crear el contexto con un array vacío 
export const CartContext = createContext([])

export const CartProvider = ({children}) => {

    const [cartItems, setCartItems] = useState([]);
    const [totalProducs, setTotalProducts] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const addToCart = (item, qty) => {
        
        const productInCart = cartItems.find((p) => (p.product.id === item.id))

        // validar si el producto esta en el carrito, suma la cantidad nueva seleccionada
        if (productInCart) {
            productInCart.qty+=qty;        
        } else {
            setCartItems([...cartItems, {'product': item, 'qty': qty}]);
        }

        setTotalProducts(totalProducs+qty)
        setTotalPrice(totalPrice + (item.price*qty))

        toastify({

            text: "Producto Agregado al Carro",
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            duration: 3000,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            }).showToast();
    };


    return <CartContext.Provider value={{cartItems, totalProducs, totalPrice, addToCart}}>{children}</CartContext.Provider>;
}

