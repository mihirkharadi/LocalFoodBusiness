import {useEffect , useState} from 'react'
import BuyerFooter from '../../layouts/BuyerFooter'
import BuyerNavbar from '../../layouts/BuyerNavbar'
import { data, useParams } from 'react-router-dom';
import { db } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";
import { collection, getDocs ,addDoc ,documentId ,getDoc,doc, setDoc, onSnapshot, query, where} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const FavMenu = () => {
    const [menuData, setMenuData] = useState([]);
    const[menuList,setMenuList]=useState([]);
   const[isMenu,setIsMenu]=useState(false);
    const[cartItems,setCartItems]=useState([]);
   const[data,setData]=useState([]);


    const userId = auth.currentUser?.uid;
    const navigate=useNavigate();

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
      const cartItemIDs = snapshot.docs.map(doc =>({
        id:doc.id,
        ...doc.data()
      }) );
        setMenuData(cartItemIDs); 
        console.log("User's Favorite Menus:", cartItemIDs);
    })
      
        return ()=> unsubscribe();
  },[userId])

 




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

  
  useEffect(()=>
    {
      const getKitchenDetails=async()=>
      {
        const kitchen=menuData.map((cur)=>cur.kitchenId);
        console.log(kitchen);
        


        
        if (!kitchen) return;
    
      const kitchenRef = collection(db, "kitchens")
              const q=(query(kitchenRef,where("id","in",kitchen)))
              const kitchenSnapshot = await getDocs(q)
              const kitchenData=kitchenSnapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
              }))

             setData(kitchenData);
              console.log(kitchenData);
              
              
            }
  
            getKitchenDetails();
    },[menuData])

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

const handleView=(id)=>
{
  setIsMenu(true);
}

const handleReview=async()=>
{
  const kitchen=menuData.map((cur)=>cur.kitchenId);
        const kitchenId=kitchen[0];


 const reviewRef=collection(db,"topReview");
 const q=query(reviewRef,where("kitchenId","==",kitchenId))

 const reviewSnapshot=await getDocs(q);

 const data=reviewSnapshot.docs.map((cur)=>({
  id:cur.id,
  ...cur.data(),
 }))
console.log(data);

}


  return (

    
    <>
  

    <div className="min-h-screen bg-gray-100">
    
    <BuyerNavbar/>
      
    
      <div className="p-4 text-center items-center flex flex-col">
        <h2 className="text-2xl font-bold">Fav's Vendors</h2>
        <p className="text-gray-500">All vendors list which is your fav !</p>
      
      </div>
      {
        isMenu? <div className=" flex flex-wrap items-center justify-evenly gap-5  m-2 w-auto  max-h-[65vh] overflow-y-auto no-scrollbar  ">
        {menuData.length > 0 ? (
      menuData.map((cur) => (
        cur.menuList.map((cur)=>
        (
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
      ))
    ) : (
      <p className="text-center text-gray-500 w-full">No menu items available.</p>
    )}
        </div>:
       ( data.length>0?
       ( data.map((item)=><div key={item.id} className="bg-white shadow-md rounded-lg p-2 mt-4 mx-2 border border-gray-200 ">
      <div  className="">
                 <h3 className="text-lg text-green-700 px-1 py-1 rounded-lg text-center font-bold "> {item.kitchenName}</h3>
                 <p className='text-md text-violet-500'> Address: <span  className='text-sm text-black '>{item.address}</span></p>
                 <p className='text-md text-violet-500'> Owner Name: <span  className='text-sm text-black '>{item.fullName}</span></p>
                 <p className='text-md text-violet-500'> Contact Number: <span  className='text-sm text-black '>{item.phone}</span></p>
                 <p className='text-md text-violet-500'> Rating: <span  className='text-sm text-black '>{item.rating}</span></p>
                 
               </div>
               <div className='flex justify-between'>
               <button onClick={()=>handleView(item.id)} className='text-md  text-white bg-blue-400 px-2 py-1  mt-2 rounded-lg  cursor-pointer'>Order Now  </button>
               <button onClick={handleReview} className='text-md  text-white bg-blue-400 px-2 py-1  mt-2 rounded-lg  cursor-pointer'>Check Reviews  </button>
               </div>
              
               </div>)):<p className="text-center text-gray-500 w-full">No fav vendor add some .</p>
      )}
     
      
     
     
      
     
      <BuyerFooter/>
     
    </div>
    
   
    
    </>
  )
}

export default FavMenu