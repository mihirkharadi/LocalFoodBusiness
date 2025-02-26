import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {auth} from '../firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate();
const handleLogin=async()=>
{
  try 
  {
    
    await signInWithEmailAndPassword(auth,email,password);
    console.log("User logged in successfully");
    toast.success('User Registered Successfully',
            {
              position:'top-center',
            }
          )
    navigate('/sellerDashboard')
  } catch (error) {
    console.error(error.message);
    toast.error(' Something went wrong try again later',
            {
              position:'top-center',
            }
          )
  }
}


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <p className="text-center text-gray-500 mb-4">Welcome back to FoodHub</p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="text-right text-sm text-gray-500 cursor-pointer">Forgot Password?</div>
          <button onClick={handleLogin} className="w-full bg-black text-white p-2 rounded">Login</button>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 p-2 rounded">
            <FcGoogle className="mr-2" /> Continue with Google
          </button>
        </div>
      </div>
      
    </div>
  );
}
