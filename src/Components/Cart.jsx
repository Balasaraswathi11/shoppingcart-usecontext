import React, { useContext, useState, useEffect } from 'react';
import Mycontext from './Mycontext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import axios from 'axios';

const Cart = () => {
  const { cart, setCart } = useContext(Mycontext);
  const [quantities, setQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isPayment, setIsPayment] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    paymentInfo: '',
  });

  const navigate = useNavigate(); 

 
  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((product) => {
      initialQuantities[product.id] = initialQuantities[product.id] || 1; 
    });
    setQuantities(initialQuantities);
  }, [cart]);

  // Calculate total amount whenever cart or quantities change
  useEffect(() => {
    const total = cart.reduce((sum, product) => {
      return sum + (product.price * (quantities[product.id] || 1));
    }, 0);
    setTotalAmount(total);
  }, [cart, quantities]);

  // Update the quantity for a product
  const updateQuantity = (product, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return;  
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

  // Function to handle checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    setIsCheckout(true); 
    openRazorpay();
  };

  // Function to handle Razorpay Payment
  const openRazorpay = async () => {
    try {
      if (isNaN(totalAmount) || totalAmount <= 0) {
        alert("Invalid total amount");
        return;
      }

      // Fetch the order from backend
      const response = await axios.post("https://shopping-cart-be.onrender.com/create-order", {
        amount: totalAmount,
        currency: "INR",
      });

      if (response.data.success) {
        const { order } = response.data;

        // Razorpay options
        const options = {
          key: "rzp_test_WcNf3ZIZKE7HoH",
          amount: order.amount, 
          currency: order.currency,
          name: "Shopsy",
          description: "Order Payment",
          image: "https://your-logo-url.com",
          order_id: order.id,
          handler: async (paymentResponse) => {
            console.log("Payment Response:", paymentResponse);
        
    
            const payload = {
              ...paymentResponse,
              amount: order.amount, 
              currency: order.currency, 
            };
        
            // Send the payload to the backend
            const verificationResponse = await axios.post(
              "https://shopping-cart-be.onrender.com/verify-payment",
              payload
            );
        
            console.log("Verification Response:", verificationResponse.data);
        
            if (verificationResponse.data.success) {
              alert("Payment Successful! Your order has been placed.");
              handlePayment();
            } else {
              alert("Payment Verification Failed.");
            }
          },
          prefill: {
            name: userDetails.name,
            email: userDetails.email,
            contact: userDetails.contact,
          },
          notes: {
            order_id: "order_" + new Date().getTime(),
          },
        };
        
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      console.error(error.message);
      alert("Error initializing payment.");
    }
  };

  const handlePayment = () => {
   
    const deliveryStatus = 'Your order is being processed';
    navigate('/order', {
      state: {
        user: userDetails,
        cartItems: cart,
        deliveryStatus: deliveryStatus,
      },
    });

    // Clear cart and reset states
    setCart([]);
    setIsCheckout(false);
    setIsPayment(false);
  };

  return (
    <div className="cart-container container" style={{ marginTop: '40px' }}>
      <div className="cart-product p-2">
        {cart.length === 0 ? (
          <p className="text-center">Your Cart is empty</p>
        ) : (
          cart.map((product) => (
            <div className="cartlist p-4 row" key={product.id}>
              <div className="cartimg col-md-2">
                <img src={product.image} alt="Product" className="imageofcart" />
              </div>

              <div className="productdetails p-2 col-md-4 text-left">
                <h5>{product.title}</h5>
                <p>{product.description}</p>
              </div>

              <div className="d-flex flex-column col-md-5 inbn container">
                <div className="d-flex">
                  <input
                    className="inputboxcart"
                    type="number"
                    id={`quantity_${product.id}`}
                    value={quantities[product.id] || 1}
                    onChange={(e) => updateQuantity(product, parseInt(e.target.value))}
                    min="1"
                    max="99"
                  />
                  <p>${product.price}</p>
                </div>
                <div className="buttoncart">
                  <a className="cartbtn" onClick={() => removeCartItem(product)}>
                    Remove
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <>
          <div className="totals container">
            <div className="subtotal">
              <div className="text-secondary">
                <b>SUBTOTAL:</b>
              </div>
              <div>${totalAmount.toFixed(2)}</div>
            </div>

            <div className="subtotal">
              <div className="text-secondary">
                <b>SHIPPING:</b>
              </div>
              <div>FREE</div>
            </div>
          </div>

          <div className="total container">
            <div>TOTAL:</div>
            <div className="text-end">${totalAmount.toFixed(2)}</div>
          </div>

          <div className="checkout-container d-flex justify-content-center align-content-center">
            {!isCheckout && (
              <button
                className="checkout-btn bg-success text-white px-2 py-2 mb-5"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
