import { useState, useEffect } from "react";
import { auth,db } from "../../firebaseConfig";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import { toast } from "react-toastify";
import   MapComponent from "../../Access/Location"

export default function Profile() {
  const[locationData,setLocationData]=useState(null);

   const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    address: "",
    kitchenName:"",

    
  });

   
   

  
  const user = auth.currentUser;

const handleLocationData=(data)=>
{
  setLocationData(data);
  
  

  
}

 
  const handleChange = (e) => {
    const{name,value}=e.target;
    setUserData({ ...userData, [name]: value });
   
    
  };

 
  const handleSave = async () => {

    try {
      
      await addDoc(collection(db,"kitchens"),
      {
        fullName:userData.fullName,
       kitchenName:userData.kitchenName,
        phone:userData.phone,
        address:locationData.address,
        latitude:locationData.latitude,
        longitude:locationData.longitude,
      })
    toast.success(" Welcome to homemade kitchen service ",{position:"top-right",autoClose:2000})

    } catch (error) {
      toast.error(`Error:${error.message}`,{position:"top-right",autoClose:2000})
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar/>
    <div className="p-4 text-center items-center flex flex-col">
        <h2 className="text-2xl font-bold">Kitchen Profile</h2>
        <p className="text-gray-500">Add Your Details </p>
      
      </div>
    <div className="max-w-md  mx-auto bg-white p-4 m-5  rounded-lg shadow-lg">
      
    
      


     
      <input
        type="text"
        name="fullName"
        value={userData.fullName}
        onChange={handleChange}
      
        className="w-full border rounded-md px-3 py-2 mb-3"
        placeholder="Full Name"
      />

      <input
        type="text"
        name="kitchenName"
        onChange={handleChange}
        value={userData.kitchenName}
       
        className="w-full border rounded-md px-3 py-2 mb-3 "
        placeholder="Kitchen name"
      />

      <input
        type="tel"
        name="phone"
        value={userData.phone}
        onChange={handleChange}
        
        
        className="w-full border rounded-md px-3 py-2 mb-3"
        placeholder="Phone Number"
      />

      {/* <textarea
        name="address"
        value={userData.address}
        onChange={handleChange}
       
        className="w-full border rounded-md px-3 py-2 mb-3"
        placeholder="Address"
      ></textarea> */}
        <MapComponent sendLocation={handleLocationData}/>

        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
         Register Kitchen
        </button>
      
  
    </div>
   
    <Footer/>
    </div>
    
  );
}
