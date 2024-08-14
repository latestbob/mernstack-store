import { React, useState, useContext, useEffect } from 'react';
import './Cart.css';
import CartItem from '../components/CartItem';

import { getCartItems} from '../services/apiService';
import { Link , useLocation, useNavigate } from 'react-router-dom';
import spinner from './loading.gif';

import { CartContext } from '../contexts/cartContext';
import axios from 'axios';


function Checkout(){

const [cartItems, setCartItems] = useState(getCartItems());

const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


const {setItemCount} = useContext(CartContext);

const location = useLocation();
const navigate = useNavigate();
const items = location.state?.items;
const total = location.state?.total;

// form inputs

const[name,setName] = useState("");
const[email, setEmail] = useState("");
const[phone, setPhone] = useState("");
const[address, setAddress] = useState("");
const[errors, setError] = useState({});
const [isLoading, setLoading] = useState(false);


useEffect(() => {
    // Update item count whenever cartItems change
  
  }, []);

  const validate = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
        newErrors.name = "Name can only contain letters and spaces";
      }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } 
    else if (!/^\+?[1-9]\d{0,2}\s?\d{3}\s?\d{3,4}\s?\d{4}$/.test(phone.trim())) {
        newErrors.phone = "Invalid phone number format";
      }
  

    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (validate()) {
    //   console.log('Form submitted successfully', { name, email, phone, address });
      try {
        const res = await axios.post('http://localhost:5000/api/order/create', {
          name,
          email,
          phone,
          address,
          amount:totalAmount,
          cartItems:items

        });

        if(res.status===200){
         setItemCount(0);

         localStorage.removeItem('cart');

         setLoading(false)

         navigate('/order-complete', { state: { isCheckOut: true } });

        }
        else{
          console.error('Form submission failed', res.status);
          setLoading(false)
        }
      } catch (error) {
        console.error('Error submitting form', error);
        setLoading(false)
      }
    }
  };


  if(isLoading){
    <div className="loading">
              <img src={spinner} className='spinner' />
        </div>
  }



    return (
        <>

          
            <div className="mainsection">


                <div className='row'>


                    <div className="col-md-8">

                        <div className="cart-display">
                        <h3 className="text-center intro py-3">Checkout to secure order</h3>


                        <form>
                            <div className="form-group">
                                <label htmlFor="" className="label">Name</label>
                                <input onChange={function(e){
                                    setName(e.target.value)
                                }}  type="text" className="form-control"required />

                                {errors.name && <p className='inputerror'>{errors.name}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="" className="label">Email</label>
                                <input onChange={function(e){
                                    setEmail(e.target.value)
                                }} type="email" className="form-control"required />

                                {errors.email && <p className='inputerror'>{errors.email}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="" className="label">Phone</label>
                                <input onChange={function(e){
                                    setPhone(e.target.value)
                                }} type="tel" className="form-control"placeholder='e.g., +234 902 317 2944' required />
                                 {errors.phone && <p className='inputerror'>{errors.phone}</p>}
                            </div>


                            <div className="form-group">
                                <label htmlFor="" className="label">Shipping Address</label>
                                <textarea onChange={function(e){
                                    setAddress(e.target.value)
                                }} className='form-control'></textarea>

                                {errors.address && <p className='inputerror'>{errors.address}</p>}
                            </div>


                            <div className="check-container">
                                <button onClick={handleSubmit} className="btn addtocart w-100">Complete Order</button>
                            </div>
                        </form>




                        

                        
                       
                            
                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className='cartsummary'>
                            <h3 className='summmary py-3'>Cart Summary</h3>

                            <h4 className="sum">Items in cart - <span className='font-weight-bold'>{items.length}</span></h4>

                            <h4 className="sum">Total Amount - <span className='font-weight-bold'>$ {total}</span></h4>


                            <div className="addcart-container text-center mt-5">
                                <Link to='/' className='btn continue-two'>Continue Shopping</Link>
                            </div>



                            





                        </div>
                        
                    </div>
                </div>




            </div>
        
        </>
    );
}


export default Checkout;