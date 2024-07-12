import React, { useContext } from 'react';
import "./Product.css";
import Mycontext from './Mycontext';

const Product = ({ product }) => {
  const { cart, setCart } = useContext(Mycontext);

  const addcart = () => {
    setCart([...cart, product]);
  };

  const removecart = () => {
    setCart(cart.filter((c) => c.id !== product.id));
  };

  const isInCart = cart.some((c) => c.id === product.id);

  return (
    <div className="card">
      <img src={product.image} className="card-img-top img" alt="product" />
      <div className="card-body text-center">
        <h5 className="card-title fs-5">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">
          <b>Rating:</b> {product.rating.rate} ({product.rating.count}) <i className="fa fa-star text-warning"></i>
        </p>
        <p className="card-text"> Price: <b>{product.price}</b></p>
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
