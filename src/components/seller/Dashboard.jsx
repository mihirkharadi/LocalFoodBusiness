import Navbar from "../../layouts/Navbar";

import { useState } from "react";

import Footer from "../../layouts/Footer";
const foodItems = [
  { name: "Margherita Pizza", desc: "Fresh tomatoes, mozzarella", img: "src/assets/Margherita.webp" },
  { name: "Classic Burger", desc: " lettuce, cheese", img: "src/assets/burger.jpg" },
  { name: "Margherita Pizza", desc: "Fresh tomatoes, mozzarella", img: "src/assets/Margherita.webp" },
  { name: "Margherita Pizza", desc: "Fresh tomatoes, mozzarella", img: "src/assets/Margherita.webp" },
  { name: "Margherita Pizza", desc: "Fresh tomatoes, mozzarella", img: "src/assets/Margherita.webp" },
];

export default function FoodHub() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
   
  return (
    <div className="min-h-screen bg-gray-100">
    
    <Navbar/>
      
    
      <div className="p-4 text-center items-center flex flex-col">
        <h2 className="text-2xl font-bold">Today's Menu</h2>
        <p className="text-gray-500">Fresh and delicious dishes for today</p>
      
      </div>
      
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  place-items-center gap-4 m-2 w-auto  max-h-[70vh] overflow-y-auto no-scrollbar">
        {foodItems.map((food, index) => (
          <div key={index} className="bg-white p-2 rounded-lg shadow-md w-2xs">
            <img src={food.img} alt={food.name} className="w-2xs rounded-lg " />
            <h3 className="font-semibold mt-2">{food.name}</h3>
            <p className="text-gray-500 text-sm">{food.desc}</p>
          </div>
        ))}
      </div>
      
   <Footer/>
     
    </div>
  );
}
