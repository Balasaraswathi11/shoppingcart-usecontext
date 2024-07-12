import React, { useContext, useState } from 'react';
import "./Product.css";
import Mycontext from './Mycontext';

const Product = ({ product }) => {
  const { cart, setCart } = useContext(Mycontext);
  const [showMore, setShowMore] = useState(false);
  const limit = 100; 


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
    <div className="card">
      <img src={product.image} className="card-img-top img" alt="product" />
      <div className="card-body text-center">
        <h5 className="card-title fs-5">{product.name}</h5>
        <p className="card-text">
          {showMore ? product.description : `${product.description.slice(0, limit)}${product.description.length > limit ? '...' : ''}`}
          {product.description.length > limit && (
            <a onClick={handleToggleShowMore} className="show-more">
              {showMore ? 'Show Less' : 'Show More'}
            </a>
          )}
        </p>
        <p className="card-text">
          <b>Rating:</b> {product.rating.rate} ({product.rating.count}) <i className="fa fa-star text-warning"></i>
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
