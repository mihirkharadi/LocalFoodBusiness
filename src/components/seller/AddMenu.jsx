import { useState } from "react";

import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import CameraCapture from "../../Access/Camera";
import { setDoc ,doc , collection,addDoc} from "firebase/firestore";
import MapComponent from "../../Access/Location";
import { auth, db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import Loading from "../../layouts/Loader";

export default function FoodHub() {
  const [addMenu,setAddMenu]=useState(
   {
    itemName:"",
    description:"",
    price:"",
    category:"Dessert",
    image:null,
    currency:"INR",
   }
  )
  const[Loader,setLoader]=useState(false);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
     
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAddMenu((prevMenu) => ({ ...prevMenu, image: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setAddMenu((prevMenu) => ({ ...prevMenu, [name]: value }));
    }

    
  }
  
  


  const handleMenu=async( )=>
  {
    const kitchenId = auth.currentUser?.uid;
if (!kitchenId) {
  toast.error("User not authenticated", { position: "top-center", autoClose: 2000 });
  return;
}
setLoader(true);
        try {
          await addDoc(collection(db, "kitchens", kitchenId, "menu"), {
            itemName: addMenu.itemName,
            description: addMenu.description,
            price: addMenu.price,
            currency:addMenu.currency,
            category: addMenu.category,
            image: addMenu.image,
            kitchenId:kitchenId,
          });

          toast.success("Success",{position:"top-center",autoClose:2000});

          setAddMenu({
            itemName:"",
            description:"",
            price:"",
            currency:"",
            category:"",
            image:null,
          })
          
          
        } catch (error) {
          toast.error(`${error}`,{position:"top-center",autoClose:2000});
        }
        finally
        {
          setLoader(false);
        }
  }

  return (
 <>
 
    <div className="min-h-screen bg-[#FFA500] text-white">
    
   
    <Navbar/>
      
     
    <div className="max-w-3xl mx-3 sm:mx-auto bg-white p-6 rounded-xl shadow-lg mt-6 border border-gray-300 max-h-[78vh] overflow-y-auto no-scrollbar">
  {/* Header */}
  <div className="text-center mb-6">
    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">🍽 Add Menu</h2>
    <p className="text-gray-600 text-base sm:text-lg">Create and list your delicious dishes</p>
  </div>

  {/* Form Grid with Flex */}
  <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 ">

    {/* Item Name */}
    <div className="flex-1">
      <label htmlFor="itemName" className="block text-sm sm:text-lg font-semibold text-gray-800">Item Name</label>
      <input 
        type="text" 
        id="itemName" 
        name="itemName" 
        value={addMenu.itemName} 
        onChange={handleChange} 
        className="w-full mt-1 p-3 border border-gray-400 rounded-lg shadow-sm text-gray-700 text-base sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" 
        placeholder="Enter item name" 
      />
    </div>

    {/* Description */}
    <div className="flex-1">
      <label htmlFor="description" className="block text-sm sm:text-lg font-semibold text-gray-800">Description</label>
      <textarea 
        id="description" 
        name="description" 
        value={addMenu.description} 
        onChange={handleChange} 
        className="w-full mt-1 p-3 border border-gray-400 rounded-lg shadow-sm resize-none text-gray-700 text-base sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" 
        placeholder="Write a short description">
      </textarea>
    </div>

  </div>

  {/* Price & Category (using flex) */}
  <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 mt-6">

    {/* Price */}
    <div className="flex-1">
      <label htmlFor="price" className="block text-sm sm:text-lg font-semibold text-gray-800">Price</label>
      <div className="flex items-center border border-gray-400 rounded-lg mt-1 px-3 py-2 shadow-sm text-gray-700 focus-within:ring-2 focus-within:ring-blue-400">
        <input 
          id="price" 
          name="price" 
          type="number" 
          value={addMenu.price} 
          onChange={handleChange}  
          className="w-full outline-none text-base sm:text-lg appearance-none" 
          placeholder="Enter price" 
        />
        <select 
          name="currency" 
          value={addMenu.currency} 
          onChange={handleChange} 
          className="ml-2 bg-transparent text-base sm:text-lg font-semibold focus:outline-none">
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
      </div>
    </div>

    {/* Category */}
    <div className="flex-1">
      <label htmlFor="category" className="block text-sm sm:text-lg font-semibold text-gray-800">Category</label>
      <select 
        name="category" 
        value={addMenu.category} 
        onChange={handleChange} 
        className="w-full mt-1 p-3 border border-gray-400 rounded-lg shadow-sm text-base sm:text-lg text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none">
        <option value="Dessert">Dessert</option>
        <option value="Main Course">Main Course</option>
        <option value="Drinks">Drinks</option>
      </select>
    </div>

  </div>

  {/* Image Upload */}
  <div className="mt-6">
    <label htmlFor="image" className="block text-sm sm:text-lg font-semibold text-gray-800">Upload Image</label>
    <input 
      id="image" 
      name="image"  
      type="file"  
      onChange={handleChange} 
      className="w-full mt-1 p-3 border border-gray-400 rounded-lg shadow-sm file:bg-gray-200 file:border-none file:p-2 file:rounded-lg cursor-pointer text-base sm:text-lg text-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
    />
  </div>

  {/* Submit Button */}
  <div className="mt-6 flex justify-center">
    {Loader ? (
      <Loading />
    ) : (
      <button 
        onClick={handleMenu} 
        className="w-full sm:w-auto bg-blue-600 text-white text-base sm:text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">
         Add Menu Item
      </button>
    )}
  </div>

</div>



      
     
        <Footer/>
      
    </div>
  
    </>
  );
}