import React from "react";
import { useNavigate } from "react-router-dom";
const FoodMarketplace = () => {
const navigate=useNavigate();


const handleLogin=()=>
{
  navigate('/login')
  
}

const handleSignUp=()=>
{
  navigate("/signup")
}

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
    {/* Image Section */}
    <div className="w-full h-[50vh] md:h-screen md:w-1/2">
      <img
        src="src/assets/burger.jpg"
        alt="Burger"
        className="w-full h-full object-fit"
      />
    </div>
  
    {/* Content Section */}
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-10">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Join Our Food Marketplace
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-2">
          Sellers showcase, buyers explore <br />
          <span className="font-medium text-black">Local Food</span>
        </p>
  
        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={handleSignUp}
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl shadow hover:bg-red-600 transition"
          >
            Join Us
          </button>
          <button
            onClick={handleLogin}
            className="w-full border border-gray-300 text-black font-semibold py-3 rounded-xl shadow hover:bg-gray-100 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
  
  
  );
};

export default FoodMarketplace;
