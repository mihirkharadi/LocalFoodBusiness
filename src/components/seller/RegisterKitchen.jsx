import { useState, useEffect } from "react";
import { auth,db } from "../../firebaseConfig";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import { toast } from "react-toastify";
import   MapComponent from "../../Access/Location"
import ProfileCard from "../../layouts/ProfileCard";
import Loading from "../../layouts/Loader";


export default function Profile() {
  
  const[locationData,setLocationData]=useState(null);
  const[kitchenData,setKitchenData]=useState("");
  const [isKitchen,setIsKitchen]=useState(true);
  const [loader,setLoader]=useState(false);

   const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    kitchenName:"",

    

    
  });

  const[updateData,setUpdateData]=useState(
    {
      fullName:"",
      phone:"",
      kitchenName:"",

    }
  )

const user = auth.currentUser;
const userId=auth.currentUser?.uid;

const handleLocationData=(data)=>
{
  setLocationData(data);
  console.log(data);
  
}

 
const handleChange = (e) => {
   const{name,value}=e.target;
  setUserData({ ...userData, [name]: value });
   };

  
  const fetchKitchenData=async()=>
  {

    try {
      
      const kitchenRef = doc(db, "kitchens", user.uid);
      const unsubscribe =  onSnapshot(kitchenRef,(kitchenSnap)=>
      {
        if (kitchenSnap.exists()) {
          setKitchenData(kitchenSnap.data());
          setUserData(kitchenSnap.data()); 
        } else {
          console.log("No kitchen found, consider adding one.");
        }
        setLoader(false);
      });
return()=>unsubscribe();
      
    } catch (error) {
      console.error("Error fetching kitchen:", error);
      setLoader(false);
    } 
  }

  useEffect(()=>
    {
      if(user)
      {
        fetchKitchenData(user.uid);
      }
 
    },[user])

  
  
const handleEdit=()=>
{
  setIsKitchen(false)
}
 
  const handleSave = async () => {

    try {
      setLoader(true);
      await setDoc(doc(db,"kitchens",user.uid),
      {
        id:userId,
        fullName:userData.fullName,
       kitchenName:userData.kitchenName,
        phone:userData.phone,
        address:locationData.address,
        latitude:locationData.latitude,
        longitude:locationData.longitude,
        rating:5,
      })
      setLoader(false);
      setIsKitchen(true);
    toast.success(" Welcome to homemade kitchen service ",{position:"top-right",autoClose:1000,
      hideProgressBar: true,
        
      style:
      {
        width: '150px',
        padding:"10px",
        fontSize:"14px",         
        minHeight: '40px',
        backgroundColor:"black",
        color:"white",
       
     
      }
    })

    } catch (error) {
      toast.error(`Error:${error.message}`,{position:"top-right",autoClose:2000})
    }
  }
  const handleUpdate = async () => {

    try {
      setLoader(true);
      await updateDoc(doc(db,"kitchens",user.uid),
      {
        id:userId,
        fullName:userData.fullName,
       kitchenName:userData.kitchenName,
        phone:userData.phone,
        address:locationData.address,
        latitude:locationData.latitude,
        longitude:locationData.longitude,
        
      })
      setLoader(false);
      setIsKitchen(true);
    toast.success(" Details Updated ",{position:"top-center",autoClose:1000,
      hideProgressBar: true,
        
      style:
      {
        marginTop:"20px",
        width: '200px',
        borderRadius:"10px",
        padding:"10px",
        fontSize:"13px",         
        minHeight: '40px',
        backgroundColor:"black",
        color:"white",
       
     
      }
    })

    } catch (error) {
      toast.error(`Error:${error.message}`,{position:"top-right",autoClose:2000})
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar/>

    {
      isKitchen ?(
      kitchenData?<> <div className="p-4 text-center items-center flex flex-col">
      <h2 className="text-2xl font-bold">Kitchen Profile</h2>
      
    
    </div>

    <div className="max-w-md  mx-auto bg-white p-4 m-5  rounded-lg shadow-lg">

    <ProfileCard/>
       <button
        onClick={handleEdit}
        className="w-full mt-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
       Edit Kitchen Data
      </button>
    
  </div>
  </>:
  
  <>
 
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

        <MapComponent sendLocation={handleLocationData}/>

        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
         {loader?<Loading/>:"Register Kitchen"}
        </button>
      
    </div>
  
    </>
      )
      :(
        <>
 
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

        <MapComponent sendLocation={handleLocationData}/>

        <button
          onClick={handleUpdate}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
        {loader?<Loading/>:"Update Kitchen details"} 
        </button>
      
    </div>
  
    </>
      )
    }
 

    <Footer/>
    </div>
    
  );
}
