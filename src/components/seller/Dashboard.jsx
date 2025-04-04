import Navbar from "../../layouts/Navbar";

import { useEffect, useState } from "react";

import Footer from "../../layouts/Footer";
import { db } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";


export default function FoodHub() {
    const [menuData, setMenuData] = useState(false);
    const[menuList,setMenuList]=useState([]);
   
const getMenuList=()=>
{
  const kitchenId=auth.currentUser?.uid;
  console.log("Kitchen ID:", kitchenId);
  if(!kitchenId) return ;
  

  try {
    
   const unsubscribe= onSnapshot(collection(db,"kitchens",kitchenId,"menu"),
  (snapshot)=>
  {
    const menuList = snapshot.docs.map(doc => ({
      id: doc.id,      
      ...doc.data()    
  
 
    
}));
setMenuData(menuList);
},(error)=>
{
  toast.error(`${error.message}`, { position: "top-center", autoClose: 2000 });
});
return ()=> unsubscribe();


        
  
 
  
  } catch (error) {
    toast.error(`${error}`,{position:"top-center" ,autoClose:2000 })
  }
}
useEffect(()=>
{
  getMenuList();

},[])

  return (
    <div className="min-h-screen bg-[#FFA500] text-white">


    <Navbar/>
      
    
    <div className="p-4 text-center">
  <h2 className="text-3xl font-bold text-white">Today's Menu</h2>
  <p className="text-white">Fresh and delicious dishes for today</p>
</div>

<div className="grid place-items-center gap-6 m-4 w-auto max-h-[65vh] overflow-y-auto no-scrollbar grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {menuData.length > 0 ? (
    menuData.map((cur) => (
      <div key={cur.id} className=" p-4 rounded-xl shadow-lg w-64 hover:shadow-2xl transition-shadow bg-[#FFFFFF]">
        <img src={cur.image} alt={cur.itemName} className="w-full h-40 object-cover rounded-lg" />
        <h3 className="font-semibold mt-3 text-lg text-gray-900">{cur.itemName}</h3>
        <p className="text-gray-600 text-sm mt-1">{cur.description}</p>
      </div>
    ))
  ) : (
    <p className="text-center text-white w-full">Add menu for today.</p>
  )}
</div>

      
   <Footer/>
     
    </div>
  );
}
