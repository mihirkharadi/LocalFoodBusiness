import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MainPage from "./pages/MainPage.jsx"
import MyOrder from "./components/seller/MyOrder.jsx"
import AddMenu from "./components/seller/AddMenu.jsx"
import Dashboard from "./components/seller/Dashboard.jsx"
import SignupPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import {AppRoutes} from './Routes/AppRoutes.jsx'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
const App = () => {
  return (
    <Router>
<ToastContainer />
      <AppRoutes/>
    
    </Router>
  )
}

export default App