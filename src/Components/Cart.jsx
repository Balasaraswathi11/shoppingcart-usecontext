import React, { useContext, useState, useEffect } from 'react';
import Mycontext from './Mycontext';
import './Cart.css';

const Cart = () => {
  const { cart, setCart } = useContext(Mycontext);
  const [quantities, setQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);




  useEffect(() => {
    const initialQuantities = {};
    cart.forEach(product => {
      initialQuantities[product.id] = initialQuantities[product.id] || 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);




  useEffect(() => {
    const total = cart.reduce((sum, product) => {
      return sum + (product.price * (quantities[product.id] || 1));
    }, 0);
    setTotalAmount(total);
  }, [cart, quantities]);




  const updateQuantity = (product, quantity) => {
    setQuantities({
      ...quantities,
      [product.id]: quantity,
    });
  };



  // Remove a product from the cart
  const removeCartItem = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
    const { [product.id]: removedQuantity, ...restQuantities } = quantities;
    setQuantities(restQuantities);
  };


  return (<>
    <div className='cart-container container' style={{ marginTop: '40px' }}>
    
      <div className='cart-product p-2'>
        {cart.length === 0 ? (
          <p className='text-center'>your Cart is empty</p>
        ) :
       (
          cart.map((product) => (
            <div className="cartlist p-4 row" key={product.id}>
              <div className="cartimg col-md-2 ">
                <img src={product.image} alt="Product" className='imageofcart' />
              </div>

              <div className="productdetails  p-2 col-md-4 text-left ">
                <h5>{product.title}</h5>
                <p>{product.description}</p>
               
                </div>
                
                <div className='d-flex flex-column col-md-5 inbn container '>
               <div className='d-flex'> 
               
                  <input
                  className='inputboxcart'
                    type="number"
                    id={`quantity_${product.id}`}
                    value={quantities[product.id]}
                    onChange={(e) => updateQuantity(product, parseInt(e.target.value))}
                    min="1"
                    max="99"
                  />
                  <p> ${product.price}</p></div>
                 <div className='buttoncart'>
                   <a className='cartbtn' onClick={() => removeCartItem(product)}>Remove</a>
                   </div>
                </div>
            </div>
            
          ))
        )}
     

      </div>
     
    </div>
    
    {cart.length === 0 ?(null):(<><div className='totals container '>
     
     <div className='subtotal'>
       <div className='text-secondary'><b>SUBTOTAL:</b> </div>
       <div> ${totalAmount.toFixed(2)}</div>
       </div>

     

       <div className='subtotal '>
       <div className='text-secondary'><b>SHIPPING:</b></div>
       <div>FREE</div>
       </div>
       </div>
       

       <div className='total container '>
       <div>TOTAL:</div>
       <div className="text-end">  ${totalAmount.toFixed(2)}
               <p style={{color:" rgb(203, 147, 43)"}}>
                 Get daily cash with nepsola card
               </p>
       </div>
       </div>
</>)}
    
      
     
    </>);
};

export default Cart;
