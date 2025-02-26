import React from 'react'
import {  FiHome, FiList, FiShoppingBag, FiUser  } from "react-icons/fi";
const Footer = () => {
  return (
    <>
    
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-3">
        <FiHome className="text-xl text-black" />
        <FiList className="text-xl text-gray-500" />
        <FiShoppingBag className="text-xl text-gray-500" />
        <FiUser className="text-xl text-gray-500" />
      </div>
    
    
    </>
  )
}

export default Footer