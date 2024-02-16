import { createContext } from "react";

// crear el contexto con un array vacío 
export const CartContext = createContext([])

export const CartProvider = ({children}) => {
    return <CartContext.Provider value={[]}>{children}</CartContext.Provider>;
}

