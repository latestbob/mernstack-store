import { React, useState, useContext, useEffect } from 'react';
import './Cart.css';
import CartItem from '../components/CartItem';

import { getCartItems , removeItemFromCart} from '../services/apiService';
import { Link, useNavigate } from 'react-router-dom';


import { CartContext } from '../contexts/cartContext';


function Cart(){

const [cartItems, setCartItems] = useState(getCartItems());

const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

const {setItemCount} = useContext(CartContext);


useEffect(() => {
    // Update item count whenever cartItems change
  
  }, [cartItems]);

const handleRemoveItem = (id) => {
    removeItemFromCart(id);

    const updatedCart = getCartItems();
    setCartItems(getCartItems());

    setItemCount(updatedCart.length);
  };

  const navigate = useNavigate();


  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { items: cartItems, total: totalAmount } });
  };

  


    return (
        <>
            <div className="mainsection">


                <div className='row'>


                    <div className="col-md-8">

                        <div className="cart-display rounded">
                        <h3 className="text-center intro py-3">Your Shopping Cart - {cartItems && cartItems.length}</h3>


                        

                        <div className="table-responsive">
                <table className="table table-borderless table-striped">
                    <thead>
                        <tr>
                            <th className='display'>Product</th>
                            <th className='display'>Price</th>
                            <th className='display'>Quantity</th>
                            <th className='display'>Total</th>
                            <th className='display'>Remove</th>
                        </tr>
                    </thead>

                    <tbody>

                                                { 

                            cartItems.length > 0 ?
                                cartItems.map(item => (
                                
                                    <CartItem key={item._id} 
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    id={item.id}
                                    qty={item.quantity}
                                    onRemove={handleRemoveItem}
                                    />
                                ))

                                :
                                <p className='text-center font-weight-bold mt-5'>No Item in your cart</p>
                            }

                       
                    </tbody>
                </table>
            </div>


                      
                        

                        
                       
                            
                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className='cartsummary rounded'>
                            <h3 className='summmary py-3'>Cart Summary</h3>

                

                            <h4 className="sum">Total Amount - <span className='font-weight-bold'>$ {totalAmount}</span></h4>


                            <div className="addcart-container text-center mt-5">
                                <button onClick={handleProceedToCheckout} className='btn addtocart'>Proceed To Checkout</button>
                            </div>



                            <div className="addcart-container text-center mt-2">
                                <Link to="/"  className='btn continue'>Continue Shopping</Link>
                            </div>





                        </div>
                        
                    </div>
                </div>




            </div>
        
        </>
    );
}


export default Cart;