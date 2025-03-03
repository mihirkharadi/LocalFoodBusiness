import { useState } from "react";

import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import CameraCapture from "../../Access/Camera";
import { setDoc } from "firebase/firestore";
import MapComponent from "../../Access/Location";

export default function FoodHub() {
  
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Dessert");
  const [image, setImage] = useState(null);


  const handleMenu=async()=>
  {
        try {
          await setDoc(doc(db,"menu",))
          
        } catch (error) {
          
        }
  }

  return (
 <>
 
    <div className="min-h-screen bg-gray-100">
    
   
    <Navbar/>
      
     
    <div className="p-2 text-center items-center flex flex-col">
        <h2 className="text-2xl font-bold">Add Menu</h2>
        <p className="text-gray-500"> Add delicious dishes for today</p>
      
      </div>
        <div className="bg-white w-full max-h-[72vh] overflow-y-auto no-scrollbar p-3 rounded-lg shadow-md mt-2  grid place-items-center">
          <div>
          <label htmlFor="itemName" className="  block font-semibold ">Item Name</label>
          <input type="text" id="itemName"  value={itemName} onChange={(e) => setItemName(e.target.value)} className=" itemName w-2xs p-1 border rounded-lg " placeholder="Enter item name" />

          </div>
         
          <div>

          
          <label className="block font-semibold mt-4">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-2xs p-2 border rounded-lg mt-1" placeholder="Enter item description"></textarea>
          </div>

          <div>
          <label className="block font-semibold mt-4">Price</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-2xs p-2 border rounded-lg mt-1" placeholder="Enter price" />
          </div>

          <div>
          <label className="block font-semibold mt-4">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-2xs p-2 border rounded-lg mt-1">
            <option value="Dessert">Dessert</option>
            <option value="Main Course">Main Course</option>
            <option value="Drinks">Drinks</option>
          </select>
          </div>

          <div>

         
          <label className="block font-semibold mt-4">Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-2xs p-2 block border rounded-lg mt-1" />
          
          </div>
          {/* <CameraCapture/> */}
        
          <button  onClick={handleMenu} className="w-2xs bg-black text-white p-2 rounded-lg mt-4">Add Menu Item</button>
        </div>
     
      
     
        <Footer/>
      
    </div>
  
    </>
  );
}