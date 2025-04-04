import React from 'react'
import { useNavigate } from 'react-router-dom';
import {  FiHome, FiShoppingBag,   } from "react-icons/fi";
import { FaUtensils ,FaShoppingBag,FaHome,FaUser} from 'react-icons/fa';

const Footer = () => {


  const navigate=useNavigate();
const handleMenu=()=>
{
  navigate('/addMenu')
}

const handleHome=()=>
{
  navigate('/sellerDashboard')
}
const handleOrder=()=>
{
  navigate('/myOrder')
}
 
const handleProfile=()=>
{
  navigate("/profile")
}
  return (
    <>
    
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex justify-around py-3">
      {/* Home Button */}
      <button onClick={handleHome} className="flex flex-col items-center text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition">
        <FaHome className="text-xl text-gray-500 dark:text-white" />
        <span className="text-sm">Home</span>
      </button>
      
      {/* Menu Button */}
      <button onClick={handleMenu} className="flex flex-col items-center text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition">
        <FaUtensils className="text-xl text-gray-500 dark:text-white" />
        <span className="text-sm">Menu</span>
      </button>
      
      {/* Orders Button */}
      <button onClick={handleOrder} className="flex flex-col items-center text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition">
        <FaShoppingBag className="text-xl text-gray-500 dark:text-white" />
        <span className="text-sm">Orders</span>
      </button>

      {/* Profile Button */}
      <button onClick={handleProfile} className="flex flex-col items-center text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 transition">
        <FaUser className="text-xl text-gray-500 dark:text-white" />
        <span className="text-sm">Profile</span>
      </button>
    </div>
    
    </>
  )
}

export default Footer