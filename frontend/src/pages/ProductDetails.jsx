import React from 'react';
import './ProductDetails.css';
import { useState, useEffect , useContext} from 'react';

import { getSpecificeProduct, addToCart, getCartItems } from '../services/apiService';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import spinner from './loading.gif';
import { CartContext } from '../contexts/cartContext';
import { toast } from 'react-toastify';


function ProductDetails() {

    const location = useLocation();
    const id = location.state?.product._id;
    const [singleProduct, setSingleProduct] = useState({});
    const [loading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const {setItemCount} = useContext(CartContext);


    useEffect(() => {
        async function getSpecific(id) {
            setIsLoading(true);
            try {
                const product = await getSpecificeProduct(id);
                setSingleProduct(product);

                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                toast.error(`${error.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            }
        }

        getSpecific(id);
    }, [id]);




    const handleAddClick = (e) => {
        e.preventDefault();

        setQuantity(quantity + 1);
    };

    const handleSubClick = (e) => {
        e.preventDefault();

        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };


    const handleAddToCart = () => {

        if (singleProduct) {
            const item = { id: singleProduct._id, name: singleProduct.name, description: singleProduct.description, image: singleProduct.productImage, price:singleProduct.price};
            const qty = quantity;
            addToCart(item, qty);

            const cartItems = getCartItems();

            setItemCount(cartItems.length);
        }
    };





    if (loading) {
        return (
            <div className="loading">
                <img src={spinner} className='spinner' />
            </div>
        );
    }


    return (
        <>
            {
                singleProduct &&

                <section className='main row'>

                    <div className="col-md-6">

                        <div className='image-container'>
                            <img className='product-image' src={singleProduct.productImage} />
                        </div>
                    </div>

                    <div className="col-md-6">

                        <div className='details'>
                            <h1 className="product-name">{singleProduct.name} </h1>
                            <h3 className='product-price'>${singleProduct.price}</h3>

                            <div className='quantity-container py-4'>

                                <div onClick={handleSubClick} class="sub rounded">-</div>
                                <div class="quantity">{quantity}</div>
                                <div onClick={handleAddClick} class="add rounded">+</div>

                            </div>

                            <hr />

                            <div className='descrpition-container'>
                                <p className="description">{singleProduct.description}</p>
                            </div>


                            <div className="addcart-container mt-5">
                                <button onClick={handleAddToCart} className='btn addtocart'>Add To Cart</button>
                            </div>


                        </div>
                    </div>


                </section>
            }
        </>
    );
}

export default ProductDetails;