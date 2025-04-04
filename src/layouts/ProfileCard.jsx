
import { Star, Phone, MapPin } from "lucide-react";
import { getDoc,doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useState,useEffect } from "react";

const ProfileCard = () => {
 const[kitchenData,setKitchenData]=useState("");
 const user=auth.currentUser;
    useEffect(()=>
    {
      
      const fetchKitchenData=async()=>
      {
    
        if(!user) return;
    
       const kitchenData=  doc(db,"kitchens",user.uid) ;
       const getKitchenData= await getDoc(kitchenData);
    
    
       if( getKitchenData.exists())
       {
            setKitchenData(getKitchenData.data());
       }
      }
    
      fetchKitchenData();
    },[user])
  return (
    <div className="w-80 p-4 m-auto shadow-lg rounded-2xl bg-gray-200 border border-gray-200">
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-green-500 text-center">{kitchenData.kitchenName}</h2>
      <p className="text-lg text-black inline-block mr-2">Owner :</p>
        <span className="text-lg">{kitchenData.fullName}</span> 
      <div className="flex items-center gap-1 text-black">
        <Star className="w-5 h-5 text-pink-400" />
        <span className="text-lg font-semibold">{kitchenData.rating}/5</span>
      </div>
      <div className="flex items-center text-gray-700 gap-2">
        <Phone className="w-5 h-5 text-blue-500" />
        <span>{kitchenData.phone}</span>
      </div>
      <div className="flex items-center text-gray-700 gap-2">
        <MapPin className="w-5 h-5 text-red-400" />
        <span>{kitchenData.address}</span>
      </div>
    </div>
  </div>
  );
};

export default ProfileCard;
