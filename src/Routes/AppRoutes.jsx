import { Route,Routes } from "react-router-dom";
import MainPage from '../pages/MainPage.jsx'
import MyOrder from "../components/seller/MyOrder.jsx"
import AddMenu from "../components/seller/AddMenu.jsx"
import Dashboard from "../components/seller/Dashboard.jsx"
import SignupPage from '../pages/SignUpPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import Profile from "../components/seller/Profile.jsx"
import RegisterKitchen from "../components/seller/RegisterKitchen.jsx"
import FeedbackManagement from "../components/seller/Feedback.jsx";
import BuyerDashboard from "../components/buyer/BuyerDashboard.jsx";
import BuyerProfile from "../components/buyer/BuyerProfile.jsx"
import Menu from "../components/buyer/Menu.jsx";
import Cart from "../components/buyer/Cart.jsx";
import Payment from "../components/buyer/Payment.jsx"
import OrdersPage from "../components/buyer/Order.jsx";
import Chat from "../components/seller/Chat.jsx";
import BuyerChat from "../components/buyer/Chat.jsx";
import FavMenu from "../components/buyer/Favourite.jsx";
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
            <Route path="/feedback" element={<FeedbackManagement/>}/>
            <Route path="/buyerDashboard" element={<BuyerDashboard/>}/>
            <Route path="/buyerProfile" element={<BuyerProfile/>}/>
            <Route path="/menu/:kitchenId" element={<Menu/>}/>
            <Route path="/cart" element={<Cart/>} />
            <Route path="/payment" element={<Payment/>} />
            <Route path="/order" element={<OrdersPage/>} />
            <Route path="/fav" element={<FavMenu/>}/>
            <Route path="/chat/:kitchenId/:buyerId/:chatId/:buyerName/:kitchenName" element={<Chat/>} />
            <Route path="/buyerChat/:kitchenId/:buyerId/:chatId/:buyerName/:kitchenName" element={<BuyerChat/>} />
        </Routes>
    )
}