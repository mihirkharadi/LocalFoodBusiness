import React, { useEffect } from "react";
import BuyerNavbar from "../../layouts/BuyerNavbar";
import BuyerFooter from "../../layouts/BuyerFooter";
import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import  {loadStripe} from '@stripe/stripe-js'
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  addDoc,
  Timestamp,
  or,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { Pin } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });
  const [payment,setPayment]=useState("COD");
   const[deliveryData,setDeliveryData]=useState({
          username:"",
          address:"",
          pinCode:"",
          phone:"",
        })
const navigate=useNavigate();
  const discountPercentage = 5;
  const taxPercentage = 5;
  const deliveryFee = 40;

  const userId = auth.currentUser?.uid;

  

 

  const handleQuantity = async (storedId, updatedQuantity) => {
    const cartRef = collection(db, "users", userId, "cart");

    const cartSnapshot = await getDocs(cartRef);


    const targetDoc = cartSnapshot.docs.find(
      (doc) => doc.data().id === storedId
    );
    
   
    

    
    const quantity = targetDoc.data().quantity;

    if (targetDoc) {
     
      toast.success("Cart updated ", {
        position: "bottom-center",
        autoClose: 700,
        hideProgressBar: true,
        style:
        {
          width: '150px',
          padding:"10px",
          fontSize:"14px",         
          minHeight: '40px',
          color:"white",
          backgroundColor:"black",
       
        }

       
      }
    );

    await updateDoc(doc(db, "users", userId, "cart", targetDoc.id), {
      quantity: updatedQuantity,
    });
    }
  };

  const handleRemove = async (storedId) => {
    const cartRef = collection(db, "users", userId, "cart");
    const cartSnapshot = await getDocs(cartRef);

    const targetDoc = cartSnapshot.docs.find(
      (doc) => doc.data().id === storedId
    );
    if (targetDoc) {
      try {
        toast.success("Item remove from cart!", { position: "top-center", autoClose: 700,
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
        await deleteDoc(doc(db, "users", userId, "cart", targetDoc.id));
       
      } catch (error) {
        toast.error(`${error}`, { position: "bottom-center", autoClose: 1000 });
      }
    }
  };

  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = (subtotal * discountPercentage) / 100;
    const tax = (subtotal * taxPercentage) / 100;

    const deliveryFee = subtotal < 500 ? 40 : 0;
    const total = subtotal - discount + tax + deliveryFee;

    setTotals({ subtotal, discount, tax, total, deliveryFee });
  }, [cartItems, discountPercentage, taxPercentage]);

  useEffect(() => {
   
    
    if (!userId) return;

    const cartRef = collection(db, "users", userId, "cart");
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const cartData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(cartData);
    });

    return () => unsubscribe();
  }, [userId]);



  const handleOrder=async()=>
  {
    if(!deliveryData.address&&!deliveryData.pinCode&&!deliveryData.phone&&!deliveryData.username)
      {
        toast.error("All fields are required!", { position: "top-center", autoClose: 700,
          hideProgressBar: true,
              
          style:
          {
            marginTop:"20%",
            borderRadius:"12px",
            width: '200px',
            padding:"10px",
            fontSize:"14px",         
            minHeight: '30px',
            backgroundColor:"black",
            color:"white",
           
         
          }
         });
        return;
      }

    if(payment.includes("Online"))
    {
      try {

        const orderRefId = `ORD-${new Date().getTime()}`;


        const stripe=await loadStripe('pk_test_51QysPAI3T8lJ2d1K6d7rR2VKiJNIyjl9IbfondconGfSzJbASVV7IhKKg65TVGb39Nsp0MXh8FqtiSgAn2ORBb9h00wBeKeEOz');

        const raw=cartItems.map((cur)=>
        ({
          itemName:cur.itemName,
          price:cur.price,
          quantity:cur.quantity,
          total:totals.total,
          
          
         
        }))
        const kitchenName=cartItems.map((cur)=>cur.kitchenName)
        const orderRef=await addDoc(collection(db, "order"), {
          orderRefId,
          CustomerDetails: { ...deliveryData },
          ItemsDetails: raw || [],
          paymentMethod: payment,
          paymentStatus: "NotDone",
          OrderStatus: "Pending",
          createdAt: new Date(), 
          id:userId||"",
          kitchenName:kitchenName[0],
          
        });
      await updateDoc(orderRef,{docId:orderRef.id});
      const body=cartItems.map((cur)=>
        ({
          itemName:cur.itemName,
          price:cur.price,
          quantity:cur.quantity,
          total:totals.total,
          orderId:orderRefId,
          docId:orderRef.id,
          kitchenId:cur.kitchenId,
         
        }))
    
        const headers={
          "Content-Type":"application/json"
        }
    
        const response=await fetch("http://localhost:3000/api/checkout",
          {
            method:"POST",
            headers:headers,
            body:JSON.stringify(body),
          }
        )
         const session=await response.json(); 
    
          const result=stripe.redirectToCheckout({
            sessionId:session.id
          })
          if(result.error)
            {
              console.log(result.error);
              
            }

           
          } catch (error) {
            toast.error(`Error placing order: ${error.message}`);
            console.error("Error adding document: ", error);
          }
    
        
        }

    
     
   
   

  }

  const handleInput=(e)=>
    {
      const{name,value}=e.target;
      setDeliveryData({...deliveryData,[name]:value})
      setPayment(value);
    }



  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <BuyerNavbar />

        <div className="  max-h-[80vh] overflow-y-auto no-scrollbar mt-2 ">
          <div className="p-4 space-y-4 ">
            <h2 className=" text-md sm:text-xl   text-center font-bold text-gray-700">
              Your Cart
            </h2>
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow mb-4 p-4 flex items-center   gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="w-20 h-20 rounded-md"
                    />
                    <div className="flex-1">
                      <h2 className="font-bold text-sm">{item.itemName}</h2>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {item.description}
                      </p>
                      <p className="text-xs sm:text-sm text-blue-500">
                        Seller:{item.kitchenName}
                      </p>
                      <p className="font-bold text-green-500">
                        {" "}
                        ₹ {item.price * item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center justify-center flex-wrap gap-2 ">
                      <button
                        onClick={() =>
                          handleQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="border px-2   rounded disabled:border-gray-500 disabled:bg-gray-200"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantity(item.id, item.quantity + 1)
                        }
                        className="border px-2   rounded"
                      >
                        +
                      </button>

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                {/* Payment Summary */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">
                      ₹{totals.deliveryFee}{" "}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹{totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span>-₹{totals.discount.toFixed(2)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-green-500">
                      ₹{totals.total.toFixed(2)}
                    </span>
                  </div>
                </div> 
                {/* Delivery information */}
                <div className="bg-white rounded-lg shadow mb-4 p-4 ">
                  <h3 className="font-bold mb-2">Delivery Information</h3>
                  <div className="flex gap-3  flex-wrap ">
                    <div className="relative w-full sm:w-auto  ">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleInput}
                        value={deliveryData.username}
                        className="peer w-full border border-gray-300 rounded-md p-2 pt-4 focus:border-blue-500 focus:ring-0 focus:outline-none"
                        placeholder=" "
                      />
                      <label
                        htmlFor="username"
                        className="absolute left-2 top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
                      >
                        Name
                      </label>
                    </div>
                    <div className="relative w-full sm:w-auto">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={handleInput}
                        value={deliveryData.address}
                        className="peer w-full border border-gray-300 rounded-md p-2 pt-4 focus:border-blue-500 focus:ring-0 focus:outline-none"
                        placeholder=" "
                      />
                      <label
                        htmlFor="address"
                        className="absolute left-2 top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
                      >
                        Address(Area and Street)
                      </label>
                    </div>
                    <div className="relative w-full sm:w-auto ">
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        onChange={handleInput}
                        value={deliveryData.phone}
                        className="peer w-full border appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border-gray-300 rounded-md p-2 pt-4 focus:border-blue-500 focus:ring-0 focus:outline-none"
                        placeholder=" "
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-2 top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
                      >
                        Contact Number
                      </label>
                    </div>
                    <div className="relative w-full sm:w-auto">
                      <input
                        type="number"
                        name="pinCode"
                        id="pinCode"
                        onChange={handleInput}
                        value={deliveryData.pinCode}
                        className="peer appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-full border border-gray-300 rounded-md p-2 pt-4 focus:border-blue-500 focus:ring-0 focus:outline-none"
                        placeholder=" "
                      />
                      <label
                        htmlFor="pinCode"
                        className="absolute left-2 top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
                      >
                        PinCode
                      </label>
                    </div>
                  </div>
                </div>


{/* Payment info */}

                <div className="bg-white rounded-lg shadow mb-4 p-4 ">
                  <h3 className="font-bold mb-2">Payment Method</h3>
                  <div className="flex gap-3  flex-wrap flex-col ">
                    <div className="relative w-full sm:w-auto  ">
                      <input
                        type="radio"
                        id="cod"
                        name="payment"
                        
                        onChange={handleInput}
                        value="COD"
                        checked={payment==="COD"}
                        className="peer w-full border border-gray-300 rounded-md  pt-4 focus:border-blue-500 focus:ring-0 focus:outline-none"
                        
                      />
                      <label
                        htmlFor="cod"
                        className="absolute left-2 top-0 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
                      >
                      Cash On Delivery
                      </label>
                    </div>
                    <div className="relative w-full sm:w-auto">
                      <input
                        type="radio"
                        id="online"
                        name="payment"
                        onChange={handleInput}
                        value="Online"
                        checked={payment==="Online"}
                        className="peer w-full border border-gray-300 rounded-md  pt-4 focus:border-blue-500 focus:ring-0 focus:outline-none"
                      
                      />
                      <label
                        htmlFor="online"
                        className="absolute left-2 top-0 text-gray-700 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
                      >
                        Pay Online
                      </label>
                    </div>
                   
                    
                  </div>
                </div>
               
                
<div className="flex justify-end">
    <button 
        onClick={handleOrder}  
        className="bg-orange-400 p-2 rounded text-white font-semibold cursor-pointer"
    >
        {payment.includes("COD") ? "PLACE ORDER" : "Checkout"}
    </button>
</div>
              </div>
              
            )}
           
          </div>
        </div>

        <BuyerFooter />
      </div>
    </>
  );
};

export default Cart;
