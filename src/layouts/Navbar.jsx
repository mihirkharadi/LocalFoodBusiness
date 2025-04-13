import{useState} from 'react'
import { FiMenu, FiBell, FiX  ,FiSearch, FiSave, FiFeather, FiHeart} from "react-icons/fi";
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
         localStorage.removeItem('userId');
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
    const handleFeedback=()=>
    {
      navigate('/feedback')
    }
  return (
    <>
   
<div className={`fixed inset-0 bg-opacity-50 z-40 ${sidebarOpen ? "block" : "hidden"} dark:bg-gray-700`} onClick={() => setSidebarOpen(false)}></div>
<div className={`fixed left-0 top-0 h-full w-64 shadow-md z-50 bg-white dark:bg-gray-800 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform`}>
  <div className="p-4 flex justify-between items-center border-b">
    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Menu</h2>
    <FiX className="text-xl cursor-pointer text-gray-900 dark:text-white" onClick={() => setSidebarOpen(false)} />
  </div>
  <ul className="p-4 space-y-4">
    <li onClick={handleFeedback} className="cursor-pointer text-gray-900 dark:text-white hover:text-yellow-300 dark:hover:text-yellow-300 transition">Feedback</li>
    <li onClick={handleKitchen} className="cursor-pointer text-gray-900 dark:text-white hover:text-yellow-300 dark:hover:text-yellow-300 transition">HomeChef Service</li>
    <li onClick={handleLogout} className="cursor-pointer text-gray-900 dark:text-white hover:text-yellow-300 dark:hover:text-yellow-300 transition">Logout</li>
   
    <p className="text-center absolute bottom-2 text-gray-600 dark:text-gray-400 text-sm">© 2025 Foody. All rights reserved.</p>
  </ul>
</div>


<nav className=" flex  items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 text-white shadow-md z-10">
  <FiMenu className="text-xl cursor-pointer" onClick={() => setSidebarOpen(true)} />
  <h1 className="font-bold text-lg text-gray-700 dark:text-white">FoodY</h1>
  <div className="flex gap-2">
    
   
  </div>
</nav>
    
    
    </>
  )
}

export default Navbar