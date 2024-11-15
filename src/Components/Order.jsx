import { useLocation } from 'react-router-dom';

const Order = () => {
  // Access the passed state using useLocation
  const location = useLocation();
  const { user, cartItems, deliveryStatus } = location.state || {};  // Destructure the data

  return (
    <div className="order-container container">
      <h2 className="text-center py-3 ">Ordered Items</h2>
      {/* Ordered Items Section */}
      
      <div className="order-items d-flex flex-column justify-content-center align-content-center ">
        {cartItems?.map((item) => (
          <div key={item.id} className="order-item d-flex align-content-center border border-black mb-5  gap-5 ">
            <div className="imgg"><img src={item.image} alt={item.title} className="order-item-img img  " /></div>
            
            <div className="order-item-details d-flex justify-content-center flex-column align-content-center p-2">
              <p><strong>{item.title}</strong></p>
               <p><strong>Description:  </strong>{item.description}</p>
              <p><strong>Quantity:</strong> {item.quantity || 1}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <p><strong className='mr-2'>Delivery Status: </strong>{deliveryStatus}</p>
            </div>
          </div>
        ))}
      </div>



    
      

     
    </div>
  );
};

export default Order;