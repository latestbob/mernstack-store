import axios from 'axios';
import { useContext } from 'react';



const apiUrl = process.env.REACT_APP_API_URL;



// get all products
export async function getProducts(){

    try {
        const response = await axios.get(`${apiUrl}/products`);

        if(response.status !== 200){
            throw new Error('Unable to fetch products. Please try again later.');
        }
        console.log(response.data.products)
        return response.data.products;
    } catch (error) {
        throw new Error('Unable to fetch products. Please try again later.');
    }
}

// get specific product using the id
export async function getSpecificeProduct(id) {
    try {
      const response = await axios.get(`${apiUrl}/product/${id}`);
  
      if (response.status !== 200) {
        throw new Error("Unable to fetch product with id");
      }
  
      console.log(response.data.product);
      return response.data.product;
    } catch (error) {
      console.log(error);
      throw new Error('Unexpected error occurred, please try again later');
    }
  }


  // add project to cart

  export function addToCart(item,qty){

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // The item is found in the cart 
      cart[existingItemIndex].quantity += qty;
    } else {
      // The item is not in the cart 
      
    cart.push({...item, quantity:qty});
    }
    
    localStorage.setItem('cart',JSON.stringify(cart));

    
  }


  //get All Items in cart

  export function getCartItems(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    return cart;
  }


  export function removeItemFromCart(id) {
    const cart = getCartItems();
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem('cart',JSON.stringify(updatedCart));
  }


  

