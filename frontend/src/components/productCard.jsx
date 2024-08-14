import { React , useContext} from 'react';
import './css/ProductCard.css';
import { addToCart , getCartItems} from '../services/apiService';

import { CartContext } from '../contexts/cartContext';

function ProductCard(props) {

    const {name,price,image,id, onProductClick} = props

    const {setItemCount} = useContext(CartContext);


    const handleAddToCart = () => {

        const item = props;
        const qty = 1;
        addToCart(item, qty);

        const cartItems  = getCartItems();

        
        setItemCount(cartItems.length);
        //alert("item added to cart")
      };
    
    return (
        <>
            <div onClick={onProductClick} className='productcard  py-5 px-4 '>

            <img src={image} className='myimage' />

            </div>

           <div className=''>
                <p className='product-title'>{name}</p>
                <p className='price'>$ {price}</p>
                

                <button onClick={handleAddToCart} className='btn addtocart'>Add To Cart</button>
           </div>
        </>
       
    );
}

export default ProductCard;