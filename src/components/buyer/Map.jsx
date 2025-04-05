import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import {  addDoc,query,where, onSnapshot, collection, getDocs,doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "leaflet/dist/leaflet.css";
import {  LocateFixed,Clock,   } from "lucide-react"; 
import Loading from "../../layouts/Loader";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { auth } from "../../firebaseConfig";


import { useNavigate } from "react-router-dom";
export default function MapComponent() {
  
     const [userLocation, setUserLocation] = useState(null);
     const [restaurants, setRestaurants] = useState([]);
const[menuData,setMenuData]=useState([]);
     const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
     const[loading,setLoading]=useState(false);
     const[isKitchenToggle,setIsKitchenToggle]=useState(false);
  
const navigate=useNavigate();
     //Formula for 1km radius
      const getDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
      };

      const userId = auth.currentUser?.uid;
  // Fetch restaurants from Firebase Firestore
     useEffect(() => {
    const fetchRestaurants = async () => {
     
      const querySnapshot = await getDocs(collection(db, "kitchens"));
      const restaurantData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(restaurantData);

     
      
      
    };

    fetchRestaurants();
    
    
       }, []);

     

  // Filter restaurants within 1 km
     useEffect(() => {
    if (userLocation) {
      const nearby = restaurants.filter((restaurant) =>
        getDistance(userLocation, [restaurant.latitude, restaurant.longitude]) <= 1
      );
      setNearbyRestaurants(nearby);
    }
     }, [userLocation, restaurants]);

  // Get user's location using browser's geolocation
   // Get User's Location
   const getUserLocation = async () => {
    try {
      setLoading(true);

      const storedLocation=localStorage.getItem('userLocation');

      if(storedLocation)
      {
        setUserLocation(JSON.parse(storedLocation));
       
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      setUserLocation([position.coords.latitude, position.coords.longitude]);
      localStorage.setItem('userLocation', JSON.stringify(userLocation));
      toast.success("Location found ", { 
        position: "top-center", 
         autoClose: 700,
        hideProgressBar: true,
        
        style:
        {
          width: '150px',
          padding:"10px",
          fontSize:"14px",         
          minHeight: '40px',
          backgroundColor:"black",
          color:"white",
         
       
        }
      });
    } catch (error) {
      toast.error("Unable to find your location. Please enable GPS.", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const DynamicMapCenter=({ center })=> {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, 13); // Zoom 15 for ~1km radius
      }
    }, [center, map]);
    return null;
  }
 
useEffect(()=>
  {
    if(!userId)
      {
        return;
      }
     

      const favRef=collection(db,"fav");
    
      
      const q= query(favRef,where("userId","==",userId));
  
    
    const unsubscribe=onSnapshot(q,(snapshot)=>
    {
      const cartItemIDs = snapshot.docs.map(doc =>
        doc.data().kitchenId
       );
        setMenuData(cartItemIDs); 
        console.log("User's Favorite Menus:", cartItemIDs);
    })
      
        return ()=> unsubscribe();
  },[userId])

  const handleKitchens=()=>
  {
   setIsKitchenToggle(true);
  }

  const handleMenu=(kitchenId)=>
  {
    navigate(`/menu/${kitchenId}`);
    
  }
  const handleFav=async(kitchenId,kitchenName,kitchenRating)=>
    {

      try{

    const kitchenData=await getDocs(collection(db,"kitchens",kitchenId,"menu"));

    const menuList = kitchenData.docs.map(doc => ({
      id: doc.id,      
      ...doc.data()     
  }));
 await addDoc(collection(db,"fav"),
{
  menuList,
  userId,
  kitchenId,
  kitchenName,
  kitchenRating,
})
  

        navigate(`/fav`);
      }
      catch(error){
        console.error("Error",error);
      }
      
      
    }
    
  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
        setUserLocation(JSON.parse(storedLocation));
    }
}, []);

const handleGoToFav=()=>
{
  navigate('/fav')
}
   

  

  return (
    <>
    
    <MapContainer 
    
      center={userLocation|| [23.462869 , 73.299939 ]}
      zoom={10} 
      attributionControl={false}
    
      style={{ height: "200px", width: "100%" }}
    >
      
      {/* Map Tiles from OpenStreetMap (Free) */}
      <TileLayer
   
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />
<DynamicMapCenter center={userLocation} />
      {/* User's Location */}
      {userLocation && (
        <>
          <Marker position={userLocation}>
            <Popup>🟦 Your Location</Popup>
          </Marker>

          {/* Circle for 1 km Radius */}
          <Circle
            center={userLocation}
            radius={1000}
            pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.1 }}
          />
        </>
      )}

      {/* Nearby Restaurants */}
      {nearbyRestaurants.map((restaurant) => (
        <>
        <Marker 
       
          key={restaurant.id}
          position={[restaurant.latitude, restaurant.longitude]}
          eventHandlers={{
            click: () => handleKitchens(restaurant)
          }}
       >
        
        
          <Popup>
            🍔 {restaurant.kitchenName} <br />
            ⭐ Rating: {restaurant.rating || "N/A"}
          </Popup>
        </Marker>
         {/* <Marker position={userLocation} >
         <Popup>🟦 Your Location</Popup>
        </Marker> */}
</>
        
      ))}
      
    </MapContainer>

    <div className=" bg-white shadow-md rounded-lg p-1  border border-gray-200 flex items-center justify-center text-center ">
        <button
          onClick={getUserLocation}
          disabled={loading}
          style={{
            padding: "8px 12px",
            border: "none",
            background: "white",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? <Loading /> : <LocateFixed size={24} color="blue" />}
        </button>
        <p className="text-center text-sm">
          Use your current location to see nearby sellers
        </p>
      </div>

{
  isKitchenToggle&&(

      nearbyRestaurants.map((restaurant) => (
        <div>
         <div className="bg-white shadow-md rounded-lg p-2 mt-4 border border-gray-200 " key={restaurant.id}>
         <div className="flex items-center justify-between">
           <h3 className="text-lg font-bold">{restaurant.kitchenName}</h3>
           <div className="flex items-center gap-1 text-yellow-500">
             <FaStar /> {restaurant.rating}
           </div>
         </div>
         {/* <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
           <Clock className="w-4 h-4" /> Open: 9:00 AM - 10:00 PM
         </div> */}
         <div className="flex gap-2 mt-2">
           {/* <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs cursor-pointer">Available for Delivery</span> */}
           <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs cursor-pointer">20-30 min</span>
           <span onClick={ () => handleMenu(restaurant.id) } className="bg-pink-100 px-3 py-1 rounded-md text-xs text-pink-700 cursor-pointer"> Check Menu</span>
           {
            menuData.includes(restaurant.id) 
            ? <span onClick={handleGoToFav} className="bg-green-100 px-3 py-1 rounded-md text-xs text-green-700 cursor-pointer"> Go to Favourites</span>
            :<span onClick={ () =>handleFav(restaurant.id,restaurant.kitchenName,restaurant.rating) } className="bg-green-100 px-3 py-1 rounded-md text-xs text-green-700 cursor-pointer"> ♡ Add to Favourites</span>
           }
           
         </div>
       </div>
       </div>
      ))
    )
    }
     
    </>
      
  )

}
  