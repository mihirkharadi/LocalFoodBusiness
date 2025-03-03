import { Route,Routes } from "react-router-dom";
import MainPage from '../pages/MainPage.jsx'
import MyOrder from "../components/seller/MyOrder.jsx"
import AddMenu from "../components/seller/AddMenu.jsx"
import Dashboard from "../components/seller/Dashboard.jsx"
import SignupPage from '../pages/SignUpPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import Profile from "../components/seller/Profile.jsx"
import RegisterKitchen from "../components/seller/RegisterKitchen.jsx"

export  const AppRoutes=()=>
{
    return(

        <Routes>
           <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/sellerDashboard" element={<Dashboard/>}/>
            <Route path="/myOrder" element={<MyOrder/>}/>
            <Route path="/addMenu" element={<AddMenu/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/addKitchen" element={<RegisterKitchen/>}/>


        </Routes>
    )
}