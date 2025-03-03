import React from 'react'
import { useNavigate } from 'react-router-dom';
import {  FiHome, FiList, FiShoppingBag, FiUser  } from "react-icons/fi";

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
    
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around  py-3">
     
  
     
     
     <FiHome onClick={handleHome} className="text-xl text-gray-500 "  />
     <FiList onClick={handleMenu} className="text-xl text-gray-500" />
     <FiShoppingBag  onClick={handleOrder} className="text-xl text-gray-500" />
    <FiUser onClick={handleProfile} className="text-xl text-gray-500" />
      </div>
    
    
    </>
  )
}

export default Footer