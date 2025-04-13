
import BuyerNavbar from "../../layouts/BuyerNavbar";
import Map from './Map'
import BuyerFooter from '../../layouts/BuyerFooter'
import { auth } from "../../firebaseConfig";


const  BuyerDashboard=()=> {


  
  return (
    <div className="bg-white min-h-screen">
      <BuyerNavbar/>
      <div className="relative">
        <img 
          src="/burger.jpg"
          alt="Local Flavors"
          className="w-full h-48 object-cover p-2 rounded-xl"
        />
        <div className="absolute bottom-0 left-0  bg-opacity-60 text-white p-4 w-full">
          <h2 className="text-lg font-bold">Local Flavors</h2>
          <p>Discover authentic tastes from our kitchen</p>
        </div>
      </div>



      <div className="p-2 z-2    ">
        
        <Map/>
        
      </div>
      
     <BuyerFooter/>

    </div>
  );
}


export default BuyerDashboard;