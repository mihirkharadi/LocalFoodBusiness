import { useState, useEffect } from "react";
import { auth,db } from "../../firebaseConfig";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import { toast } from "react-toastify";


export default function Profile() {
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
return ()=>unsubscribe();

    
    
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
    <>
    <Navbar/>
    
    <div className=" max-w-md mx-auto my-5 bg-white p-6  shadow-lg  border-gray-200 dark:border-gray-700 relative overflow-hidden ">
  {/* Profile Picture */}
  <div className="flex justify-center mb-4">
    <div className="w-20 h-20 bg-gray-300  rounded-full flex items-center justify-center text-gray-500 text-3xl font-bold">
      {userData.fullName ? userData.fullName.charAt(0) : "U"}
    </div>
  </div>

  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-4">
    {userData.fullName || "User Name"}
  </h2>

  <div className="space-y-3">
    {/* Full Name Input */}
    <div className="relative">
      <input
        type="text"
        name="fullName"
        value={userData.fullName}
        onChange={handleChange}
        disabled={!editMode}
        className={`w-full rounded-full px-4 py-2 border focus:outline-none ${
          editMode ? "bg-white border-gray-300 focus:ring-2 focus:ring-blue-400" : "bg-gray-100 border-gray-200"
        }  dark:border-gray-600 `}
        placeholder="Full Name"
      />
    </div>

    {/* Email (Disabled) */}
    <div className="relative">
      <input
        type="email"
        name="email"
        value={userData.email}
        disabled
        className="w-full rounded-full px-4 py-2 border bg-gray-100 border-gray-200  dark:border-gray-600 "
        placeholder="Email"
      />
    </div>

    {/* Phone Number Input */}
    <div className="relative">
      <input
        type="tel"
        name="phone"
        value={userData.phone}
        onChange={handleChange}
        disabled={!editMode}
        className={`w-full rounded-full px-4 py-2 border focus:outline-none ${
          editMode ? "bg-white border-gray-300 focus:ring-2 focus:ring-blue-400" : "bg-gray-100 border-gray-200"
        }  dark:border-gray-600`}
        placeholder="Phone Number"
      />
    </div>

    {/* Address Input */}
    <div className="relative">
      <textarea
        name="address"
        value={userData.address}
        onChange={handleChange}
        disabled={!editMode}
        className={`w-full rounded-2xl px-4 py-2 border resize-none focus:outline-none ${
          editMode ? "bg-white border-gray-300 focus:ring-2 focus:ring-blue-400" : "bg-gray-100 border-gray-200"
        }  dark:border-gray-600 `}
        placeholder="Address"
      ></textarea>
    </div>
  </div>

  {/* Action Button */}
  <div className="mt-5">
    {editMode ? (
      <button
        onClick={handleSave}
        className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition font-medium"
      >
        Save Changes
      </button>
    ) : (
      <button
        onClick={() => setEditMode(true)}
        className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition font-medium"
      >
        Edit Profile
      </button>
    )}
  </div>
</div>


   
    <Footer/>
    </>
    
  );
}
