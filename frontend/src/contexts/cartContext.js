import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({}); //create context



export const CartContextProvider = function ({ children }) {

    // const [deliverprice, setDeliveryPrice] = useState(1500);
    const[itemsCount, setItemCount] = useState(0);
    
   
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length > 0) {
            setItemCount(cart.length);
        }
    }, []); 
    


   const value = {
        itemsCount,
        setItemCount,
    }

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}