import React, { useContext, useState, useEffect } from 'react';
import Mycontext from './Mycontext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

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

  const navigate = useNavigate();  // Initialize useNavigate

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

  const removeCartItem = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
    const { [product.id]: removedQuantity, ...restQuantities } = quantities;
    setQuantities(restQuantities);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsPayment(true); // Move to the payment phase
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert('Payment Successful! Your order has been placed.');
    
    // Set a delivery status
    const deliveryStatus = 'Your order is being processed';  // Modify as needed

    // Navigate to the order page and pass the necessary state
    navigate('/order', {
      state: {
        user: userDetails,   // User details from the checkout form
        cartItems: cart,     // Cart items
        deliveryStatus: deliveryStatus, // Delivery status
      },
    });

    setCart([]);  // Clear the cart after payment
    setIsCheckout(false);
    setIsPayment(false);
  };

  return (
    <>
      {/* Cart and Checkout Components */}
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
                      value={quantities[product.id]}
                      onChange={(e) => updateQuantity(product, parseInt(e.target.value))}
                      min="1"
                      max="99"
                    />
                    <p> ${product.price}</p>
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
      </div>

      {/* Proceed to Checkout Button */}
      {cart.length === 0 ? null : (
        <>
          <div className="totals container">
            <div className="subtotal">
              <div className="text-secondary">
                <b>SUBTOTAL:</b>
              </div>
              <div> ${totalAmount.toFixed(2)}</div>
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
            <div className="text-end">
              ${totalAmount.toFixed(2)}
              <p style={{ color: 'rgb(203, 147, 43)' }}>
                Get daily cash with nepsola card
              </p>
            </div>
          </div>

          <div className="checkout-container d-flex justify-content-center align-content-center">
            {!isCheckout && (
              <button
                className="checkout-btn bg-success text-white px-2 py-2 mb-5"
                onClick={() => setIsCheckout(true)}
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </>
      )}

      {/* Checkout Form */}
      {isCheckout && !isPayment && (
        <div className="checkout-form container d-flex justify-content-center">
          <div>
            <h2 className="text-center py-3">Checkout</h2>
            <form onSubmit={handleCheckout} className="d-flex flex-column mb-5">
              <div className="py-2">
                <label>Name:</label> <br />
                <input
                  type="text"
                  value={userDetails.name}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="py-2">
                <label>Address:</label> <br />
                <input
                  type="text"
                  value={userDetails.address}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="py-2">
                <label>Payment Info:</label> <br />
                <input
                  type="text"
                  value={userDetails.paymentInfo}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, paymentInfo: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" className="proceed-payment mt-4">
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Form */}
      {isPayment && (
        <div className="checkout-form payment-form container d-flex justify-content-center">
          <div>
            <h2 className="text-center py-3">Payment</h2>
            <form onSubmit={handlePayment} className="d-flex flex-column mb-5">
              <div className="py-2">
                <label>Credit/Debit Card:</label> <br />
                <input type="number" placeholder="Card Number" required />
              </div>
              <div className="py-2">
                <label>Expiry Date:</label> <br />
                <input type="number" placeholder="MM/YY" required />
              </div>
              <div className="py-2">
                <label>CVV:</label> <br />
                <input type="number" placeholder="CVV" required />
              </div>
              <button type="submit" className="submit-payment mt-4">
                Submit Payment
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
