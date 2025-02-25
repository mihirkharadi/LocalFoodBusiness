import React from "react";

const FoodMarketplace = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-[320px] h-[640px] bg-black rounded-3xl shadow-2xl border-8 border-black relative overflow-hidden">
     
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-3xl"></div>

       
        <div className="relative h-full w-full bg-white rounded-3xl overflow-hidden">
      
          <img
            src='src/assets/burger.jpg'
            alt="Burger"
            className="w-full h-76 object-cover"
          />

       
          <div className="p-6 text-center">
            <h2 className="text-lg font-bold text-black">
              Join Our Food Marketplace
            </h2>
            <p className="text-gray-500 text-sm mt-4">
              Sellers showcase, buyers explore <br /> Local Food
            </p>
          </div>

      
          <div className="flex flex-col items-center gap-3 px-6">
            <button className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl shadow-md">
              Join us
            </button>
            <button className="w-full border border-gray-300 text-black font-semibold py-3 rounded-xl shadow-md">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodMarketplace;
