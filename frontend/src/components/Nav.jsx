import { React, useContext } from 'react';
import './css/Nav.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/cartContext';



function Navbar(){

 const{itemsCount} = useContext(CartContext);

    return (
        <>
            <nav className="navbar navbg px-5 fixed-top">
                <div className='container'>
                    <Link to='/' className="navbar-brand logo">EdTech Store</Link>
                    <div class="form-inline">

                    

                        <Link to='/cart' className="add-to-cart">
                            <span className="item-count">{itemsCount}</span>
                            <i className="fa fa-shopping-cart  cart-icon" ></i>
                        </Link>
                        
                    </div>

                </div>
            </nav>
        </>
    );
}

export default Navbar;