import React from 'react';
import './Home.css';
import Hero from '../components/Hero';
import ProductCard from '../components/productCard';

import { useState, useEffect } from 'react';

import { getProducts } from '../services/apiService';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import spinner from './loading.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home(){

const [products, setProducts] = useState([]);

const [isLoading, setLoading] = useState(false);






useEffect(() => {
    

    async function getAllProducts(){

        try {

          setLoading(true);
           const res = await getProducts();

            console.log(res);

             setProducts(res)

             setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(`${error.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setLoading(false);
        }
    }

    getAllProducts();
  }, []);


  const navigate = useNavigate();

  const handleProductClick = (item) => {
    navigate(`/product/${item._id}`, { state: { product: item } });
  };

 



    
    return (
        <>
            <Hero />


            <div className='text-center py-5'>
                <h3 className='explore'>Explore Our Products</h3>
            </div>


            {
              isLoading ? <div className="loading">
              <img src={spinner} className='spinner' />
          </div> :
           

            <div className='pflex row '>
                {products.map((item, index) => (
                 <div  className="col-md-3 col-sm-6  col-xs-6 mb-4 text-center" key={item._id}>
                 <ProductCard
                   name={item.name}
                   price={item.price}
                   image={item.productImage}
                   id={item._id}
                   onProductClick={() => handleProductClick(item)}
                 />
               </div>
                ))}
                
            </div>

        }
        
        </>
    );
}

export default Home;