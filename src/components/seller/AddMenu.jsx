import { useState } from "react";

import Navbar from "./Navbar";
import Footer from './Footer'
export default function FoodHub() {
  
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Dessert");
  const [image, setImage] = useState(null);

  return (
 <>
 
    <div className="min-h-screen bg-gray-100">
    
    <Navbar/>
    
      
      <div className="  p-4  ">
        <h2 className=" w-auto text-center text-xl  font-bold mb-1">Add New Menu Item</h2>
        <div className="bg-white w-2xl p-4 rounded-lg shadow-md mt-4 ">
          <label htmlFor="itemName" className="  block font-semibold ">Item Name</label>
          <input type="text" id="itemName"  value={itemName} onChange={(e) => setItemName(e.target.value)} className=" itemName w-2xs p-2 border rounded-lg mt-1" placeholder="Enter item name" />
          
          <label className="block font-semibold mt-4">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-2xs p-2 border rounded-lg mt-1" placeholder="Enter item description"></textarea>
          
          <label className="block font-semibold mt-4">Price</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-2xs p-2 border rounded-lg mt-1" placeholder="Enter price" />
          
          <label className="block font-semibold mt-4">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-2xs p-2 border rounded-lg mt-1">
            <option value="Dessert">Dessert</option>
            <option value="Main Course">Main Course</option>
            <option value="Drinks">Drinks</option>
          </select>
          
          <label className="block font-semibold mt-4">Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-2xs p-2 block border rounded-lg mt-1" />
          
          <button className="w-2xs bg-black text-white p-2 rounded-lg mt-4">Add Menu Item</button>
        </div>
      </div>
      
     
      <Footer/>
      
    </div>
    </>
  );
}