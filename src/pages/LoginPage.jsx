import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {auth,db,provider} from '../firebaseConfig'
import { sendPasswordResetEmail,signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loader from "../layouts/Loader"





export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false);
const navigate=useNavigate();

const handleLogin=async()=>
{
  try 
  {
    if(!email && !password)
    {
      toast.error("Please enter your credentials!", { position: "top-right",style:{width:"200px",height:"50px",
        fontSize:"12px"
      } ,autoClose:2000});
      return;
    }

    setLoading(true);
    const userCredential=await signInWithEmailAndPassword(auth,email,password);
    setLoading(false);
    const user=userCredential.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
      const { role } = userDoc.data();
      if(!user.emailVerified)
        {
          toast.error("Please verify your email before logging in!", { position: "top-right",style:{width:"200px",height:"50px",
            fontSize:"12px"
          } });
          return;
        }
        else
        {
          toast.success('User logged in Successfully',
            {
              position:'top-center',
              autoClose:2000
            }
          )
     navigate(role === "seller" ? "/sellerDashboard" : "/buyerDashboard");

        }
    } else {
      console.log("User data not found.");
    }

   
   
   
  } catch (error) {
    console.error(error.message);
    toast.error(' Something went wrong try again later',
            {
              position:'top-center',
            }
          )
  }
}

const handleForgot=async()=>
{

if(!email)
{
  toast.error("Please enter your email",{position:"top-right"});
  return;
}

  try {
    

    await sendPasswordResetEmail(auth,email);
    toast.success("Password reset email sent! check your inbox",{position:"top-right"});
  } catch (error) {
    toast.error("Error:"+error.message,{
      position:"top-right",

    })
  }
}

const handleGoogle=async()=>
{
 try {
  setLoading(true);
      const result= await signInWithPopup(auth,provider);
      setLoading(false);
      const user=result.user;

      // ? check if user already has role in db 

      const userRef=doc(db,"users",user.uid);
      const isUser=await getDoc(userRef);

      if(isUser.exists() && isUser.data().role)
      {
        const existingRole=isUser.data().role;
        toast.success(`Welcome back ${isUser.data().fullName}!`,
          {
            position:"bottom-right",
            autoClose:1000,
          }
        );


        navigate(existingRole==="seller"?"/sellerDashboard" :"/sellerDashboard");
        return;
      }



      // * if role not present then toast msg for selection

      toast.info(
        <div>

            <p>Select your role :</p>
            <button className="bg-green-400 px-2 py-1 rounded mr-2"
                        onClick={()=>saveRole(user,"buyer")}>
              Buyer
            </button>
            <button className="bg-red-400 px-2 py-1 rounded mr-2"
                        onClick={()=>saveRole(user,"seller")}>
              Seller
            </button>

        </div>,
        {autoClose:false,
          position:"top-center",
        }
      )



await setDoc(userRef,
{
  email:user.email,
  fullName:user.displayName,

},{merge:true}
);


 } catch (error) {
  toast.error(" Google Sign-in Error",{position:"top-right" ,autoClose:2000})
  throw error;
 }
}



const saveRole=async(user,role)=>
{
  const userRef=doc(db,"users",user.uid);

  await setDoc(userRef,{role:role},{merge:true})


  toast.success(`Logged in successfully as ${role}`, {
    position: "top-right",
    autoClose: 2000,
  });

  navigate(role === "seller" ? "/sellerDashboard" : "/profile");
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
          <div onClick={handleForgot} className="text-right text-sm text-gray-500 cursor-pointer">Forgot Password?</div>

          {
            loading ? <Loader/> :<button onClick={handleLogin} className="w-full bg-black text-white p-2 rounded">Login</button>
          }
          
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <button onClick={handleGoogle} className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 p-2 rounded">
            <FcGoogle className="mr-2" /> Continue with Google
          </button>
        </div>
      </div>
      
    </div>
  );
}
