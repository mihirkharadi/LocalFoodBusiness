import {useEffect , useState} from 'react'
import BuyerFooter from '../../layouts/BuyerFooter'
import BuyerNavbar from '../../layouts/BuyerNavbar'
import { data, useParams } from 'react-router-dom';
import { db } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";
import { collection, getDocs ,addDoc  ,getDoc,doc, setDoc, onSnapshot} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const FavMenu = () => {
    const [menuData, setMenuData] = useState([]);
    const[menuList,setMenuList]=useState([]);
   
    const[cartItems,setCartItems]=useState([]);
    const { kitchenId } = useParams();


    const userId = auth.currentUser?.uid;
    const navigate=useNavigate();
const getMenuList=async()=>
{

  
  if(!kitchenId)
  {
    return;
  }

  try {
    
   const menuData=await getDocs(collection(db,"kitchens",kitchenId,"menu"))
 
   const menuList = menuData.docs.map(doc => ({
    id: doc.id,      
    ...doc.data()     
}));



        setMenuData(menuList);
  

 
  
  } catch (error) {
    toast.error(`${error}`,{position:"top-center" ,autoClose:2000 })
  }
}
useEffect(()=>
{
  getMenuList();

  

},[kitchenId])




useEffect(()=>
  {

    const cartRef=collection(db,"users",userId,"cart");
    const unsubscribe=onSnapshot(cartRef,(snapshot)=>
    {
      const cartItemIDs = snapshot.docs.map(doc => doc.data().id);
        setCartItems(cartItemIDs); 
    })
       

        return ()=> unsubscribe();
  },[userId])

  

const handleCart = async (cur) => {
  
  if (!userId) {
      toast.error("Please log in to add items to the cart.");
      return;
  }

const kitchenDetails = await getDoc(doc(db, "kitchens", kitchenId));
            
            setMenuList(kitchenDetails.data());

const kitchenName=kitchenDetails.data().kitchenName;


setCartItems((prev)=>[...prev,cur.id]);
toast.success("Item added to cart!", { position: "top-center", autoClose: 700,
  hideProgressBar: true,
      
  style:
  {
    marginTop:"12px",
    borderRadius:"12px",
    width: '200px',
    padding:"10px",
    fontSize:"14px",         
    minHeight: '30px',
    backgroundColor:"black",
    color:"white",
   
 
  }
 });
  await addDoc(collection(db, "users", userId, "cart"), {
    ...cur,kitchenName:kitchenName,quantity:1,address:"",tax:"",
    deliveryFee:"",total:"",kitchenId:kitchenId,isInCart:cur.id,
  } );
};


const goToCart=()=>
{
  navigate('/cart')
}


  return (

    
    <>
  

    <div className="min-h-screen bg-gray-100">
    
    <BuyerNavbar/>
      
    
      <div className="p-4 text-center items-center flex flex-col">
        <h2 className="text-2xl font-bold">Today's Menu</h2>
        <p className="text-gray-500">Fresh and delicious dishes for today</p>
      
      </div>
      
     
      <div className="grid place-items-center gap-4 m-2 w-auto  max-h-[65vh] overflow-y-auto no-scrollbar grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  ">
      {menuData.length > 0 ? (
    menuData.map((cur) => (
      <div key={cur.id} className="bg-white p-2  rounded-lg shadow-md w-3xs">
        <img src={cur.image} alt={cur.itemName}  className=" w-3xs h-50 rounded-lg" />

        <div className='flex  justify-between'>
        
        <div className=' mt-2'>
        <h3 className="font-semibold ">{cur.itemName}</h3>
        <p className="text-gray-500 text-sm"> {cur.description}</p>
        
        </div>

        <div className='mt-2'>
        <span className='  text-green-700 mr-1'>Price : {cur.price}</span>
       
        <span className='  text-green-700' >{cur.currency}</span>
{cartItems.includes(cur.id)?<p onClick={goToCart} className=' mt-2 bg-blue-100 rounded-md text-blue-700 text-xs text-center p-2 cursor-pointer  '>
Go to cart</p>:<p onClick={()=>handleCart(cur)} className=' mt-2 bg-blue-100 rounded-md text-blue-700 text-xs text-center p-2 cursor-pointer  '>
Add to cart</p>}
        
        </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 w-full">No menu items available.</p>
  )}
      </div>
      
      <BuyerFooter/>
     
    </div>
    
   
    
    </>
  )
}

export default FavMenu