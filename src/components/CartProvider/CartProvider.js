import { createContext, useEffect, useState } from "react";
import toastify from "toastify-js";

// crear el contexto con un array vacío 
export const CartContext = createContext([])

export const CartProvider = ({children}) => {

    const [cartItems, setCartItems] = useState ( () => {
        // Recuperar el carrito del localStorage
        const savedCart = localStorage.getItem('console-fun-cart');
        return savedCart ? JSON.parse(savedCart).items : [];
    })
    const [totalProducs, setTotalProducts] = useState( () => {
        const savedCart = localStorage.getItem('console-fun-cart');
        return savedCart ? JSON.parse(savedCart).total_products : 0;
    })
    const [totalPrice, setTotalPrice] = useState( () => {
        const savedCart = localStorage.getItem('console-fun-cart');
        return savedCart ? JSON.parse(savedCart).total_price : 0;
    })

    // actualiza la información del carrito en el local Storage
    useEffect(() => {
        const cart = JSON.stringify({'total_products': totalProducs, 'total_price': totalPrice, items: cartItems})
        localStorage.setItem("console-fun-cart", cart)
    }, [totalProducs, totalPrice, cartItems])

    const addToCart = (item, qty) => {
        
        const productInCart = cartItems.find((p) => (p.product.id === item.id))

        // validar si el producto esta en el carrito, suma la cantidad nueva seleccionada
        if (productInCart) {
            productInCart.qty+=qty;        
        } else {
            setCartItems([...cartItems, {'product': item, 'qty': qty}]);            
        }

        // total de products comprados
        setTotalProducts(totalProducs+qty)
        //total de la compra
        setTotalPrice(totalPrice + (item.price*qty))
        //asigna al local Storage
       
        
        // se muestra notificación de que todo se agrego correctamente
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

    const removeToCart = (item) => {
        
        const productInCart = cartItems.find((p) => (p.product.id === item.id))

        // validar si el producto esta en el carrito, suma la cantidad nueva seleccionada
        if (productInCart) {
            // restar del total el producto a eliminar
            setTotalProducts(totalProducs-productInCart.qty)
            // restar del total de la compra el producto eliminado
            setTotalPrice(totalPrice - (productInCart.product.price*productInCart.qty))
            // filtra todos los productos distintos al que deseo eliminar
            const updatedCart = cartItems.filter(p => p.product.id !== productInCart.product.id);
            // agrego los productos filtrados al carrito
            setCartItems(updatedCart);
        }
            
        // se muestra notificación de que todo se agrego correctamente
        toastify({

            text: "Producto Elimado del Carro",
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            duration: 3000,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            }).showToast();
    };

    const clearCart = () => {
        setTotalProducts(0)
        setTotalPrice(0)
        setCartItems([]);
      };


    return <CartContext.Provider value={{cartItems, totalProducs, totalPrice, addToCart, removeToCart,clearCart}}>{children}</CartContext.Provider>;
}

