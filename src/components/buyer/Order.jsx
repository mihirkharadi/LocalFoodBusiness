import React, { useEffect, useState } from 'react';
import BuyerNavbar from '../../layouts/BuyerNavbar';
import BuyerFooter from '../../layouts/BuyerFooter';
import { collection, getDoc,onSnapshot ,query,getDocs,where, addDoc} from 'firebase/firestore';
import { auth,db } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import { Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';
const OrdersPage = () => {
    const[cartItems,setCartItems]=useState([]);
    const[chatId,setChatId]=useState({
      chatId:"",
    });
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState(""
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(null);

    const userId=auth.currentUser?.uid;
    const navigate=useNavigate();

    useEffect(() => {
       
        
        
    
        const cartRef = collection(db, "order");

        
        
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
      
       console.log(kitchenId);
       console.log(buyerId);
       console.log(kitchenName);
       console.log(buyerName);
       
       
       
       
          
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
                  users:[kitchenId,buyerId],
                  
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

      const handleRating=(kitchenId,orderId,kitchenName,customerName)=>
      {
        setSelectedOrder({ kitchenId, orderId, kitchenName, customerName });
        setIsModalOpen(true);
      }

      const handleSubmitRating = async () => {
        if (rating === 0 || feedback.trim() === "") {
          toast.error("Please provide both rating and feedback.");
          return;
        }
      
        try {
          await addDoc(collection(db, "review"), {
            feedback,
            rating,
            kitchenId: selectedOrder.kitchenId,
            orderId: selectedOrder.orderId,
            kitchenName: selectedOrder.kitchenName,
            customerName: selectedOrder.customerName,
            timestamp: new Date(),
          });
      
          toast.success("Thanks for your feedback!");
          setRating(0);
          setHoverRating(0);
          setFeedback("");
          setIsModalOpen(false);
        } catch (error) {
          toast.error(`Error: ${error.message}`);
        }
      };

      const handleClose=()=>
      {
        setIsModalOpen(false);
      }
      
      
     
      



    return (
<>

        <BuyerNavbar/>
        <div  className="  bg-gray-100 min-h-[90vh]  overflow-y-auto no-scrollbar ">
            <h1 className="text-2xl font-bold text-center mb-4">My Orders</h1>
            <p className="text-center text-gray-500 mb-6">Track your recent orders</p>
            <div className="max-w-md mx-auto ">
              {
                isModalOpen? <div className=" bg-white rounded-lg mx-2   flex items-center justify-center">
                <div className="  p-6  w-full max-w-md shadow-lg  space-y-4 relative">
                  <h2 className="text-xl font-bold">Rate Your Order</h2>
          
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={28}
                        className={`cursor-pointer transition-colors duration-150 ${
                          (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    ))}
                  </div>
          
                  
                  < textarea
                 
                  name='feedback'
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={3}
                    placeholder="Your feedback..."
                    value={feedback}
                   
                    onChange={(e)=>setFeedback(e.target.value)}
                  />
                 
          
                  <div className="flex justify-end space-x-2">
                    <button onClick={handleClose} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancel</button>
                    <button onClick={handleSubmitRating} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Submit</button>
                  </div>
                </div>
              </div>:
              cartItems.length>0?
              cartItems.map(order => (
                    
                <div key={order.orderRefId} className="bg-blue-50 shadow-lg rounded-lg p-4 my-2 mx-2 flex justify-between items-center">
                <div  >
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
                    <p className="text-md font-bold mt-1 text-green-400"> ₹{order.ItemsDetails[0].total}</p>
                    {
                     order.OrderStatus==="Delivered"?<button onClick={()=>handleRating(order.kitchenId,order.docId,order.kitchenName,order.CustomerDetails.username)} className="w-full text-center mt-2 cursor-pointer bg-purple-600 text-white text-sm py-2 px-1 rounded-lg hover:bg-blue-700 transition">
                     ★ Rate your order now 
                   </button>:<button onClick={()=>handleChat(order.kitchenId,order.id,order.kitchenName,order.CustomerDetails.username)} className="w-full mt-2 cursor-pointer text-center bg-blue-600 text-white py-2 px-1 rounded-lg text-sm hover:bg-blue-700 transition">
                     💬 Chat with Vendor 
                   </button>
                    }
                    
                </div>
            </div>
            ))
            :
            <div className="bg-blue-50 shadow-lg rounded-lg p-4 my-2 mx-2 flex justify-between items-center">
               <h1>No order placed</h1>
                    
               </div>
                  
                     }
                    
                  
                
           
             
              
                
               
            </div>
            
            
        </div>
        

        <BuyerFooter/>
    
       </>
    );
};

export default OrdersPage;
