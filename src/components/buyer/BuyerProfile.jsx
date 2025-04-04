import { useState, useEffect } from "react";
import { auth,db } from "../../firebaseConfig";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import BuyerNavbar from "../../layouts/BuyerNavbar";
import BuyerFooter from "../../layouts/BuyerFooter";
import { toast } from "react-toastify";


export default function BuyerProfile() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    
  });


  const [editMode, setEditMode] = useState(false);
  
  const user = auth.currentUser;

  

  
  const fetchUserData =  () => {
    if (!user) return;

    const userDoc = doc(db, "users", user.uid);
    const unsubscribe =  onSnapshot(userDoc,(snapshot)=>
    {
      if (snapshot.exists()) {
        setUserData(snapshot.data());
      }

    });

return ()=> unsubscribe();
    
    
  };
  
  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
    }
  }, [user]);
 
  const handleChange = (e) => {
    const{name,value}=e.target;
    setUserData({ ...userData, [name]: value });
   
    
  };

 
  const handleSave = async () => {

    try {
      
      await setDoc(doc(db,"users",user.uid),
      {
        fullName:userData.fullName,
        email:user.email,
        phone:userData.phone,
        address:userData.address,
      })
    toast.success("Profile updated successfully",{position:"top-right",autoClose:2000})

    } catch (error) {
      toast.error(`Error:${error.message}`,{position:"top-right",autoClose:2000})
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
    <BuyerNavbar/>
    <div className="p-4 text-center items-center flex flex-col">
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-gray-500">Update Your Details </p>
      
      </div>
    <div className="max-w-md  mx-auto bg-white p-4 m-5  rounded-lg shadow-lg">
      
    
      


     
      <input
        type="text"
        name="fullName"
        value={userData.fullName}
        onChange={handleChange}
        disabled={!editMode}
        className="w-full border rounded-md px-3 py-2 mb-3"
        placeholder="Full Name"
      />

      <input
        type="email"
        name="email"
        value={userData.email}
        disabled
        className="w-full border rounded-md px-3 py-2 mb-3 bg-gray-100"
        placeholder="Email"
      />

      <input
        type="tel"
        name="phone"
        value={userData.phone}
        onChange={handleChange}
        disabled={!editMode}
        className="w-full border rounded-md px-3 py-2 mb-3"
        placeholder="Phone Number"
      />

      <textarea
        name="address"
        value={userData.address}
        onChange={handleChange}
        disabled={!editMode}
        className="w-full border rounded-md px-3 py-2 mb-3"
        placeholder="Address"
      ></textarea>
        

     
      {editMode ? (
        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Edit Profile
        </button>
      )}
    </div>
   
    <BuyerFooter/>
    </div>
    
  );
}
