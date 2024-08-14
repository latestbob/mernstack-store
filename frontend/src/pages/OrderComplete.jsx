import { React, useState, useEffect } from 'react';


import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


function OrderComplete(){




const location = useLocation();
const navigate = useNavigate();

const isCheckOut = location.state?.isCheckOut;
// const total = location.state?.total;

// form inputs




useEffect(() => {
    // Update item count whenever cartItems change

    if(!isCheckOut){
        navigate('/');
    }
  
  }, []);

  

    return (
        <>
            <div className="mainsection">


                <div className='row'>


                    <div className="col-md-6 m-auto">

                        <div className="cart-display">
                        <h3 className="text-center intro py-3">Order Successfully Placed</h3>

                        <div className='complete-check text-center py-3'>
                            <i className="fa fa-check-circle text-success icon"></i>
                        </div>

                        <p className="complete-para text-center ">Thank you for your purchase! Your order has been successfully placed and is being processed. We appreciate your business!</p>
                        
                       
                            
                        </div>

                    </div>

                  
                </div>




            </div>
        
        </>
    );
}


export default OrderComplete;