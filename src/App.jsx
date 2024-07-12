import React, { useState } from 'react';
import Heaader from './Components/Heaader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './Components/Home'; 
import Cart from './Components/Cart';
import Titledescription from './Components/Titledescription'; // Import Titledescription component
import "./App.css";
import Mycontext from './Components/Mycontext';

const App = () => {
  const [cart, setCart] = useState([]);
  
  return (
    <>
    <Mycontext.Provider value={{cart,setCart}}>
      <BrowserRouter>
        <Heaader cart={cart} />
        
        <div className='container-fluid m-0 p-0'>
         
          <Routes>
     
            <Route path="/" element={
              <>
                <Titledescription />
                <Home  />
              </>
            } />
           
            <Route path="/Cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
      </Mycontext.Provider>
    </>
  );
}

export default App;
