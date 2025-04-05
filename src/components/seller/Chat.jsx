import React, { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { collection, addDoc, orderBy, query,doc,onSnapshot,getDocs, serverTimestamp, updateDoc, getDoc, Timestamp, where, limit } from "firebase/firestore";
import { FaPaperPlane } from "react-icons/fa";
import {db} from "../../firebaseConfig.js"
import Navbar from "../../layouts/Navbar.jsx"
import Footer from "../../layouts/Footer.jsx"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../layouts/Loader.jsx"
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
const[loader,setLoader]=useState(false);
const userId=localStorage.getItem('userId');

const {kitchenId,buyerId,chatId,buyerName,kitchenName}=useParams();



useEffect(()=>
{

  const getUserChats=()=>
  {
    if (!chatId) return;

  const q = query(collection(db, "chats", chatId, "messages"), orderBy("timeStamp","desc"),limit(4));

  return onSnapshot(q, (snapshot) => {
    const messages=snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMessages(messages.reverse())
  })
  }

  getUserChats();

})






const sendMessage=async()=>
{
  if(!chatId||!newMessage.trim()) return;
try{

setLoader(true);
  const messageRef=collection(db,"chats",chatId,"messages");

  await addDoc (messageRef,
    {
      senderId:kitchenId,
      text:newMessage,
      timeStamp:serverTimestamp(),

    }
    
  )
 
setLoader(false)


setNewMessage('');
}
catch(error)
{
  console.error("Error sending messages",error);
  
}
finally
{
  setLoader(false);
}
}
 
  




  return (

    <>
    <Navbar />
    <div className=" max-h-[80vh] bg-[#FFA500] text-white flex flex-col">
  
  <div className="flex-1 flex flex-col w-full bg-white">
    {/* Buyer Info */}
    <div className=" capitalize p-4 border-b text-lg text-green-600 font-semibold flex gap-2 items-center">
      <FaUserCircle className="text-gray-500 " size={25} /> {buyerName} (buyer)
    </div>

    
    <div className="flex-1 max-h-[66vh] overflow-y-auto no-scrollbar p-4 space-y-3">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.senderId === kitchenId ? "justify-end" : "justify-start"}`}>
          <div className={`p-3 rounded-lg max-w-xs ${msg.senderId === kitchenId ? "bg-green-400 text-white " : "bg-gray-200 text-black"}`}>
             {
            msg.senderId===buyerId?
            <h1 className="text-md text-blue-400 text-left capitalize">{buyerName} (buyer)</h1>
            :
            
            <h1 className="text-md text-black text-left capitalize">{kitchenName} (vendor)</h1>
              
              
           } 
            <p className="capitalize ">{msg.text}</p>
            <p className="text-[#475569] text-right ca">
            {msg.timeStamp.toDate().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, 
  })}
            </p>
          </div>
        </div>
      ))}
    </div>

  
    <div className="p-2  mx-1  flex items-center  gap-2 rounded-lg border-2 border-black">
      <input
        type="text"
        className="flex-1   text-gray-700  focus:outline-none"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      {
        loader?<Loading/>: <button className="bg-gray-500 text-white p-2 rounded-lg cursor-pointer" onClick={sendMessage}>
        <FaPaperPlane />
      </button>
      }
     
    </div>
  </div>
  
</div>
<Footer />
</>
  );
};

export default Chat;
