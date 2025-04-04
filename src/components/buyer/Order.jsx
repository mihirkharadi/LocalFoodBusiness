import React, { useEffect, useState } from 'react';
import BuyerNavbar from '../../layouts/BuyerNavbar';
import BuyerFooter from '../../layouts/BuyerFooter';
import { collection, getDoc,onSnapshot ,query,getDocs,where} from 'firebase/firestore';
import { auth,db } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const OrdersPage = () => {
    const[cartItems,setCartItems]=useState([]);
    const[chatId,setChatId]=useState({
      chatId:"",
    });
    const userId=auth.currentUser?.uid;
    const navigate=useNavigate();

    useEffect(() => {
       
        
        
    
        const cartRef = collection(db, "order");

        const today = new Date().toISOString().split("T")[0];
        console.log(today);
        
        const unsubscribe = onSnapshot(cartRef, (snapshot) => {
          const cartData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })).filter((cur)=>(cur.paymentStatus==="Done" && cur.id===userId ));

         
          setCartItems(cartData);
        
         
          
        });
    
        return () => unsubscribe();
      }, [userId]);

      const handleChat=async(kitchenId,buyerId,kitchenName,buyerName)=>
      {
      
       
          
            // get ref of chats collection
            const chatRef=collection(db,"chats");
          
          
            //  check for chat ref have buyer in array
            const q=query(chatRef,where("users","array-contains",buyerId));
          
            const existingChats=await getDocs(q);
          
          
            let chatExists=false;
            let existingChatId=null;
          
            existingChats.forEach((doc)=>
            {
              const data=doc.data();
          
              if(data.users.includes(kitchenId))
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
            
             
              
              toast.success(" Chat with vendor ",{position:"top-center",autoClose:500,
                hideProgressBar: true,
                  
                style:
                {
                  width: '150px',
                  padding:"10px",
                  fontSize:"14px", 
                  borderRadius:"20px",        
                  minHeight: '40px',
                  backgroundColor:"black",
                  color:"white",
                 
               
                }
              })
              
    
      
          
            navigate(`/buyerChat/${kitchenId}/${buyerId}/${finalChatId}/${buyerName}/${kitchenName}`)
          
        
      }

    return (
<><div className="min-h-screen bg-gray-100">

        <BuyerNavbar/>
        <div  className="  max-h-[80vh] overflow-y-auto no-scrollbar mx-2">
            <h1 className="text-2xl font-bold text-center mb-4">My Orders</h1>
            <p className="text-center text-gray-500 mb-6">Track your recent orders</p>
            <div className="max-w-md mx-auto">
                {cartItems.map(order => (
                    
                   <div className="bg-white shadow-md rounded-lg p-4 mb-3 flex justify-between items-center">
                   <div  key={order.id}>
                       <h2 className="text-md font-semibold text-black "> {order.orderRefId}</h2>
                      
                      <p className='text-sm '>Vendor: 
                        <span className='text-blue-500'>{order.kitchenName}</span></p>
                        {order.ItemsDetails.map((item,index)=>
                        (
                            <p className="text-sm  text-black"> {item.quantity}x {item.itemName} {item.price} ={`${item.quantity*item.price}`}</p>
                        ))
                        
                        }
                       
                     
                   </div>
                   <div className="text-right">
                       <span className={`text-xs font-bold py-1 px-2 rounded-md ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                           {order.OrderStatus}
                       </span>
                       <p className="text-md font-bold mt-1 text-green-400"> ₹{order.ItemsDetails[1].total}</p>
                       <button onClick={()=>handleChat(order.kitchenId,order.id,order.kitchenName,order.CustomerDetails.username)} className="w-full mt-2 cursor-pointer bg-blue-600 text-white py-2 px-2 rounded-lg hover:bg-blue-700 transition">
    💬 Chat with Vendor 
  </button>
                   </div>
               </div>
                ))}
            </div>

            
        </div>
        <BuyerFooter/>
    </div>
       </>
    );
};

export default OrdersPage;
