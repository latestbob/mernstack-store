import React from 'react';
import './css/CartItem.css';

function CartItem(props){

    const {name,price,image,id,qty,onRemove} = props
    
    return (
        <>

            <tr className='carttr'>
                <td className="cart-column">
                    <div className="cartpix">
                        <img className='cart-img' src={image} />
                        <p className='cart-title'>{name}</p>
                    </div>
                </td>
                
                
                <td className="others">$ {price}</td>
                <td className="others">{qty}</td>
                <td className="others">$ {price * qty}</td>
                <td className="thers"><i onClick={() => onRemove(id)}  className='fa fa-trash text-danger'></i></td>

            </tr>

            
            
        </>
    );
}


export default CartItem;