import{useState} from 'react'
import { FiMenu, FiBell, FiX } from "react-icons/fi";
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate=useNavigate();
    const handleLogout=async()=>
    {
       try {
         await signOut(auth);
         toast.success("logged out successfully !",
          {position:"top-center"},
         )
         navigate("/login");
       } catch (error) {
        console.error(error.message)
        toast.error("logout failed :"+error.message,
          {
            position:"top-right"
          }
        )
        
       }
    }

    const handleKitchen=()=>
    {
      navigate('/addKitchen');
    }
  return (
    <>
    <div className={`fixed inset-0 bg-opacity-50 z-40 ${sidebarOpen ? "block" : "hidden"}`} onClick={() => setSidebarOpen(false)}></div>
<div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-md z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform`}> 
  <div className="p-4 flex justify-between items-center border-b">
    <h2 className="text-lg font-bold">Menu</h2>
    <FiX className="text-xl cursor-pointer" onClick={() => setSidebarOpen(false)} />
  </div>
  <ul className="p-4 space-y-4">
    <li className="cursor-pointer">Reviews</li>
    <li className="cursor-pointer">Payment</li>
    <li onClick={handleKitchen} className="cursor-pointer"> HomeChef Service </li>
    <li  onClick={handleLogout} className="cursor-pointer ">Logout</li>
    <li className="cursor-pointer">Delete Account</li>
    <p className='text-center bottom-2 absolute text-gray-600 text-sm'>© 2025 Foody. All rights reserved.</p>
  </ul>
</div>


<nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
  <FiMenu className="text-xl cursor-pointer" onClick={() => setSidebarOpen(true)} />
  <h1 className="font-bold text-lg">FoodY</h1>
  <FiBell className="text-xl" />
</nav>
    
    
    </>
  )
}

export default Navbar