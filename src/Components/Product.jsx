import React, { useContext, useState } from 'react';
import "./Product.css";
import Mycontext from './Mycontext';

const Product = ({ product }) => {
  const { cart, setCart } = useContext(Mycontext);
  const [showMore, setShowMore] = useState(false);
  const limit = 70; 


  //showmore toggle function
  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  //add to cart function
  const addcart = () => {
    setCart([...cart, product]);
  };
 //removecartfunction
  const removecart = () => {
    setCart(cart.filter((c) => c.id !== product.id));
  };

  const isInCart = cart.some((c) => c.id === product.id);

  return (

      <div className="d-flex flex-column containers px-2   ">
      <div className='d-flex justify-content-between img'>
      <img src={product.image} className="card-img-top " alt="product" />
      </div>
      
      <div className="card-body text-center ">
        <h5 className="card-title py-2 " style={{
          fontSize:"15px"
        }}>{product.title}</h5>
       
        <p className="card-text">
          <b>⭐</b> {product.rating.rate} ({product.rating.count}) <i className="fa fa-star text-warning"></i>
        </p>
        <p className="card-text"> Price: $ <b>{product.price}</b></p>
        {isInCart ? (
          <button className='btnremove' onClick={removecart}>Remove from cart</button>
        ) : (
          <button className='btnadd' onClick={addcart}>Add to cart</button>
        )}
      </div>
    </div>

    
  );
};

export default Product;
