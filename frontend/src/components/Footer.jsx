import React from 'react';
import './css/Footer.css';
import { Link } from 'react-router-dom';

function Footer(){
    return (
        <>

            <section className='footer mt-5 row'>

                <div className='col-md-4'>
                     <Link to='/' className="navbar-brand logo">EdTech Store</Link>
                </div>

                <div className="col-md-4">
                    <p className='footerpara text-center'>At EdiTech Store, we bring you the latest tech innovations and must-have gadgets at exceptional values</p>
                </div>

                <div className='col-md-4 text-right'>
                    <p className='contact'>Contact Us</p>

                    <p className='email'>store@edtech.com</p>
                </div>





            </section>
        </>
    );
}

export default Footer;