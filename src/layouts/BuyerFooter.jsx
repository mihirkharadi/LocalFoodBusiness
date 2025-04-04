import React from 'react'
import { useNavigate } from 'react-router-dom';
import {  FiHome, FiShoppingBag,   } from "react-icons/fi";
import { FaUtensils ,FaShoppingCart,FaShoppingBag,FaHome,FaUser} from 'react-icons/fa';

const BuyerFooter = () => {


  const navigate=useNavigate();
const handleMenu=()=>
{
  navigate('/cart')
}

const handleDashboard=()=>
{
  navigate('/buyerDashboard')
}
const handleOrder=()=>
{
  navigate('/order')
}
 
const handleProfile=()=>
{
  navigate("/buyerProfile")
}
  return (
    <>
    
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex justify-around py-3">
     
    <button onClick={handleDashboard} className="flex flex-col items-center text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition">
    <FaHome  className="text-xl text-gray-500 dark:text-white"  />
              <span className="text-sm">Home</span>
            </button>
     
            <button onClick={handleMenu} className="flex flex-col items-center text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition">
              <FaShoppingCart  className="text-xl text-gray-500 dark:text-white" />
              <span className="text-sm">Cart</span>
            </button>
     
            <button  onClick={handleOrder} className="flex flex-col items-center text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition">
              <FaShoppingBag   className="text-xl text-gray-500 dark:text-white" />
              <span className="text-sm ">Orders</span>
            </button>
            <button  onClick={handleProfile} className="flex flex-col items-center text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition">
              <FaUser   className="text-xl text-gray-500 dark:text-white" />
              <span className="text-sm">Profile</span>
            </button>
    
  
      </div>
     
    
    </>
  )
}

export default BuyerFooter