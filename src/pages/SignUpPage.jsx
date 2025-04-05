import React, { useState } from "react";
import { auth,db } from "../firebaseConfig";
import { setDoc,doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignupForm = () => {

  
  const [agree, setAgree] = useState(false);
  const[data,setData]=useState(
    {
      email:"",
      password:"",
      fullName:"",
     role:"",
    }
  )
  const navigate=useNavigate();
  const handleChange=(e)=>
  {
    const{name,value}=e.target;
    setData({...data,[name]:value});
  }

  const handleSignup = async (e) => {
    e.preventDefault();

   


    try {
      if (!data.email || !data.password || !data.fullName) return toast.error("All fields are required!", { position: "top-left",
        autoClose:2000 ,
        style:{width:"200px",height:"50px",fontSize:"12px"}});


      if (!agree) return toast.error("You must agree to the Terms & Conditions", { position: "top-left",
        autoClose:2000 ,
        style:{width:"200px",height:"50px",fontSize:"12px"}});
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const token = await userCredential.user.getIdToken(); 
        const user=auth.currentUser;
        await sendEmailVerification(user);
     if(user)
     {
      await setDoc(doc(db,"users",user.uid ) ,
    {
      email:user.email,
      fullName:data.fullName,
      role:data.role,
    });
     }
      toast.success('User Registered Successfully pls verify your email',
        {
          position:'top-center',
        }
      )
      
      navigate('/login')
    } 
    
    
    catch (error) {
            console.error("Error:", error.message);
           toast.error(`${error.message}`,
             {
                  position:"top-left",
                  autoClose:3000
              }
           )
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFA500] px-4">
    <div className="w-full max-w-sm p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center">Create Account</h2>
      <p className="text-center text-gray-500 mb-4">
        Join FoodHub to start ordering or selling delicious meals
      </p>
  
      <form className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          onChange={handleChange}
          value={data.fullName}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
  
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={data.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
  
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={data.password}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
  
        {/* Role Selection */}
        <div className="flex items-center space-x-4 text-sm">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="buyer"
              onChange={handleChange}
              className="accent-blue-500"
            />
            <span>Buyer</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="seller"
              onChange={handleChange}
              className="accent-blue-500"
            />
            <span>Seller</span>
          </label>
        </div>
  
        {/* Terms and Conditions */}
        {/* <div className="flex items-start space-x-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            required
            className="accent-blue-500 mt-1"
          />
          <p className="text-gray-600">
            I agree to the{" "}
            <span className="font-semibold text-black">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="font-semibold text-black">Privacy Policy</span>
          </p>
        </div> */}
  
        {/* Submit Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-black text-white p-2 rounded hover:opacity-90 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default SignupForm;
