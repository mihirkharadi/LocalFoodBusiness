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
    <div className="grid place-items-center">
      <div className="w-[350px] h-[550px] bg-black rounded-3xl shadow-2xl border-8 border-black relative overflow-hidden">
     
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-3xl"></div>

  
        <div className="relative h-full w-full bg-white rounded-3xl overflow-hidden flex flex-col justify-center p-6">
      
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <p className="text-gray-500 text-center mt-1">
            Join FoodHub to start ordering or selling delicious meals
          </p>

          <form className="mt-4 space-y-4">

            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              placeholder="Full Name"
              onChange={handleChange}
              value={data.fullName}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              required
              value={data.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={data.password}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          
            <div className="flex items-center space-x-4">
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

           
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={agree}
                required
            
                onChange={() => setAgree(!agree)}
                className="accent-blue-500"
              />
              <p className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="font-semibold text-black">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="font-semibold text-black">Privacy Policy</span>
              </p>
            </div>

           
            <button
            
              onClick={handleSignup}
              className="w-full bg-black text-white font-semibold py-3 rounded-lg mt-2 shadow-md hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
