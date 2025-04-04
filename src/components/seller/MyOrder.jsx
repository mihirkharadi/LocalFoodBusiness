import { useState, useEffect } from "react";
import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";
import { auth, db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { collection, addDoc, orderBy,where, query, onSnapshot,getDocs, serverTimestamp, updateDoc, getDoc, Timestamp,doc } from "firebase/firestore";
import Loading from "../../layouts/Loader";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [kitchensData, setKitchensData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isDispatch,setIsDispatch]=useState(false);
  const[chatId,setChatId]=useState({
    chatId:"",
  });

  const navigate=useNavigate();
  const userId = auth.currentUser?.uid;
  localStorage.setItem("userId", JSON.stringify(userId));

  useEffect(() => {
    if (!userId) return;
    setLoader(true);

    const kitchenUnSub = onSnapshot(collection(db, "kitchens"), (snapshot) => {
      const kitchenData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const userKitchen = kitchenData.find((cur) => cur.id === userId);
      
      if (!userKitchen) {
        setLoader(false);
        return;
      }
      setKitchensData(userKitchen.kitchenName);
    });

    const orderUnSub = onSnapshot(collection(db, "order"), (snapshot) => {
      const cartData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      const filteredOrders = cartData.filter(
        (cur) => cur.paymentStatus === "Done" && cur.kitchenName === kitchensData && cur.OrderStatus !== "Delivered"  
      ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));;
      
      const itemData = filteredOrders
        .flatMap((cur) => cur.ItemsDetails)
        .map((cur) => cur.itemName);
      
      setItems(itemData.join(","));
      setCartItems(filteredOrders);
      setLoader(false);
    });

    return () => {
      kitchenUnSub();
      orderUnSub();
    };
  }, [userId, kitchensData]);

const handleStatus=async(orderId,newStatus)=>
{
  try
  {
    if(newStatus==="Process")
    {
      setIsDispatch(true);
      await updateDoc(doc(db,"order",orderId),
      {
        OrderStatus:newStatus,
      })
    }
    await updateDoc(doc(db,"order",orderId),
    {
      OrderStatus:newStatus,
    })
   

 
  }
  catch (error) {
    console.error("Error updating order status: ", error);
  }
}

const handleChat=async(kitchenId,buyerId,buyerName,kitchenName)=>
{

 
    
      // get ref of chats collection
      const chatRef=collection(db,"chats");
    
    
      //  check for chat ref have buyer in array
      const q=query(chatRef,where("users","array-contains",kitchenId));
    
      const existingChats=await getDocs(q);
    
    
      let chatExists=false;
      let existingChatId=null;
    
      existingChats.forEach((doc)=>
      {
        const data=doc.data();
    
        if(data.users.includes(buyerId))
        {
          chatExists=true;
          existingChatId=doc.id;
        }
      })
    
      let finalChatId = existingChatId;
      if(!chatExists)
      {
        const newChat= await addDoc(chatRef,
          {
            users:[buyerId,kitchenId],
            lastMessage:"",
            lastMessageTimeStamp:null,
          }
        )
        finalChatId = newChat.id; 
      }
        setChatId({chatId:finalChatId})
      
       
        
        toast.success(" Chat with your customer ",{position:"top-right",autoClose:1000,
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
        })
        

    
      navigate(`/chat/${kitchenId}/${buyerId}/${finalChatId}/${buyerName}/${kitchensData}`)
    
  
}


  return (
    <>
      <div className="min-h-screen bg-[#90CAF9] text-white ">
        <Navbar />
        <div className="mt-3">
          <h2 className="text-2xl font-bold text-center">My Orders</h2>
          <p className=" text-center text-white">Track your recent orders</p>
          {loader ? (
            <Loading />
          ) : (
            <>
            <h1 className="text-lg text-white  text-center">Total Orders :{cartItems.length}</h1>
            <div className="flex gap-3 mx-3 flex-wrap justify-evenly items-center no-scrollbar overflow-y-auto max-h-[70vh]">
             
              {
  cartItems.map((order)=>(
   
  <div key={order.orderRefId} className="max-w-3xs  mt-2 bg-white rounded-xl shadow-lg  transition-all hover:scale-[1.02] border border-gray-200 p-4">
              

  <div className="flex justify-center items-center border-b pb-2">
    <h3 className="text-sm font-bold text-gray-900"> {order.orderRefId}</h3>
    <span className={`text-sm font-medium  px-3 py-1 rounded-lg ml-2 
    ${order.OrderStatus === "Pending" ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-500 dark:text-black" : ""}
                      ${order.OrderStatus === "Process" ? "bg-green-200 text-green-800 dark:bg-green-500 dark:text-black" : ""}
                      ${order.OrderStatus === "Rejected" ? "bg-red-200 text-red-800 dark:bg-red-500 dark:text-black" : ""}
                      ${order.OrderStatus === "Dispatch" ? "bg-blue-200 text-blue-800 dark:bg-blue-500 dark:text-black" : ""}
                      ${order.OrderStatus === "Delivered" ? "bg-blue-200 text-blue-800 dark:bg-blue-500 dark:text-black" : ""}
    `}>{order.OrderStatus}</span>
  </div>

 
  <div className="mt-2">
    <p className="text-gray-700 font-semibold">Name: {order.CustomerDetails.username}</p>
    <p className="text-gray-500 text-sm">📍Address: {order.CustomerDetails.address},{order.CustomerDetails.pinCode}</p>
  </div>

{

order.ItemsDetails.map((item,index)=>
(
  <div key={index} className="mt-3 space-y-2">
    <div className="flex justify-between text-gray-800">
      <span>{item.itemName} x{item.quantity}</span>
      <span>₹{item.price*item.quantity}</span>
    </div>
  </div>
  ))
  }

  
  <div className="border-t mt-3 pt-2 flex justify-between items-center">
    <span className="font-semibold text-black text-sm">Total: ₹{order.ItemsDetails[0].total}</span>
    <span className="font-semibold text-black text-sm">Payment: {order.paymentMethod}</span>
   
   ``
  </div>


  <button onClick={()=>handleChat(order.kitchenId,order.id,order.CustomerDetails.username)} className="w-full mt-2 cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
    💬 Chat with Customer 
  </button>

{
  (isDispatch || order.OrderStatus === "Dispatch") ? (
    <div className="mt-2 flex gap-2">
      {order.OrderStatus === "Dispatch" ? (
        <button 
          onClick={() => handleStatus(order.docId, "Delivered")}  
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-bold"
        >
          Mark as Delivered
        </button>
      ) : (
        <button 
          onClick={() => handleStatus(order.docId, "Dispatch")}  
          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-bold"
        >
          Dispatch Now
        </button>
      )}
    </div>
  ) : (
    <div className="mt-2 flex gap-2">
      <button 
        onClick={() => handleStatus(order.docId, "Process")}  
        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
      >
        Accept Order
      </button>
      <button 
        onClick={() => handleStatus(order.docId, "Rejected")}  
        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
      >
        Reject Order
      </button>
    </div>
  )
}

  
  
</div>

))
}
</div>
</>

          )}
        </div>
        


        <Footer />
      </div>
    </>
  );
}
