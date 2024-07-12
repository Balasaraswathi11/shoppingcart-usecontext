import React, { useContext, useState } from 'react'
import data from "../assets/product.json";
import "./Home.css"
import Product from './Product';





const Home = () => {
    
  console.log(data)
    const [product]=useState(data)
  return (<>
  <div className='container   '>
 
    <div className="product-container  ">
    { product.map((product)=>(
        <Product key={product.id}
         product={product} 
         />
     ))}
   
    </div>
    </div>
    </> )
}

export default Home