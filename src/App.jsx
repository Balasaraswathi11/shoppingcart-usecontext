import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';  // Import loadStripe
import { Elements } from '@stripe/react-stripe-js'; // Import Elements from Stripe
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './Components/Home'; 
import Cart from './Components/Cart';
import Titledescription from './Components/Titledescription';
import Mycontext from './Components/Mycontext';
import Heaader from './Components/Heaader'; // Fixed typo (Heaader -> Header)
import "./App.css";
import Order from './Components/Order';

// Initialize Stripe outside the component to avoid reloading on every render
const stripePromise = loadStripe('pk_test_51QLHL5AKopzsBiKWKzmPtTf7RC7trRaIpcpHU1Ohk6yzF5XPz8ZTime8sZBwsbrFiGy1YRfEu90NGWGK2nm2Ck8k00HrhyGCNp'); // Replace with your actual publishable key

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Mycontext.Provider value={{ cart, setCart }}>
        <BrowserRouter>
          <Heaader cart={cart} />
          
          <div className='container-fluid m-0 p-0'>
            <Elements stripe={stripePromise}>  {/* Wrap components using Stripe with Elements */}
              <Routes>
                <Route path="/" element={
                  <>
                    <Titledescription />
                    <Home />
                  </>
                } />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
              </Routes>
            </Elements>
          </div>
        </BrowserRouter>
      </Mycontext.Provider>
    </>
  );
}

export default App;
