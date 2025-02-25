import { FiMenu, FiBell, FiHome, FiList, FiShoppingBag, FiUser ,FiX} from "react-icons/fi";
import { useState } from "react";
const foodItems = [
  { name: "Margherita Pizza", desc: "Fresh tomatoes, mozzarella", img: "src/assets/Margherita.webp" },
  { name: "Classic Burger", desc: " lettuce, cheese", img: "src/assets/burger.jpg" },
];

export default function FoodHub() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
   
  return (
    <div className="min-h-screen bg-gray-100">
    
    <div className={`fixed inset-0 bg-opacity-50 z-40 ${sidebarOpen ? "block" : "hidden"}`} onClick={() => setSidebarOpen(false)}></div>
      <div className={`fixed left-0 top-0 h-full w-64 bg-white  shadow-md z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform`}> 
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <FiX className="text-xl cursor-pointer" onClick={() => setSidebarOpen(false)} />
        </div>
        <ul className="p-4 space-y-4">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Menu</li>
          <li className="cursor-pointer">Orders</li>
          <li className="cursor-pointer">Profile</li>
        </ul>
      </div>
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
        <FiMenu className="text-xl cursor-pointer" onClick={() => setSidebarOpen(true)} />
        <h1 className="font-bold text-lg">FoodHub</h1>
        <FiBell className="text-xl" />
      </nav>
      
    
      <div className="p-4 text-center items-center flex flex-col">
        <h2 className="text-2xl font-bold">Today's Menu</h2>
        <p className="text-gray-500">Fresh and delicious dishes for today</p>
        {/* <img src="src/assets/foodmix.webp" alt="Today's menu" className="w-2xl h-50 rounded-lg my-4 " /> */}
      </div>
      
     
      <div className="grid grid-cols-4 gap-4 p-4">
        {foodItems.map((food, index) => (
          <div key={index} className="bg-white p-2 rounded-lg shadow-md w-2xs">
            <img src={food.img} alt={food.name} className="w-3xs rounded-lg " />
            <h3 className="font-semibold mt-2">{food.name}</h3>
            <p className="text-gray-500 text-sm">{food.desc}</p>
          </div>
        ))}
      </div>
      
   
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-3">
        <FiHome className="text-xl text-black" />
        <FiList className="text-xl text-gray-500" />
        <FiShoppingBag className="text-xl text-gray-500" />
        <FiUser className="text-xl text-gray-500" />
      </div>
    </div>
  );
}
