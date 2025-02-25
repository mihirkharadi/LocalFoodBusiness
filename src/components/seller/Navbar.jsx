import{useState} from 'react'
import { FiMenu, FiBell, FiX } from "react-icons/fi";

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
    <div className={`fixed inset-0 bg-opacity-50 z-40 ${sidebarOpen ? "block" : "hidden"}`} onClick={() => setSidebarOpen(false)}></div>
<div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-md z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform`}> 
  <div className="p-4 flex justify-between items-center border-b">
    <h2 className="text-lg font-bold">Menu</h2>
    <FiX className="text-xl cursor-pointer" onClick={() => setSidebarOpen(false)} />
  </div>
  <ul className="p-4 space-y-4">
    <li className="cursor-pointer">Home</li>
    <li className="cursor-pointer">Menu</li>
    <li className="cursor-pointer">Orders</li>
    <li className="cursor-pointer">Profile</li>
  </ul>
</div>


<nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
  <FiMenu className="text-xl cursor-pointer" onClick={() => setSidebarOpen(true)} />
  <h1 className="font-bold text-lg">FoodHub</h1>
  <FiBell className="text-xl" />
</nav>
    
    
    </>
  )
}

export default Navbar