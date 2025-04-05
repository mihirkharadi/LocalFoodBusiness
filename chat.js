import { 
    collection, 
    addDoc, 
    serverTimestamp, 
    query, 
    where, 
    orderBy, 
    onSnapshot, 
    doc, 
    updateDoc 
  } from "firebase/firestore";
import { db } from "./src/firebaseConfig";
  
  // 🔹 Create a new chat between two users
  export const createChat = async (user1, user2) => {
    try {
      const chatRef = await addDoc(collection(db, "chats"), {
        users: [user1, user2], 
        lastMessage: "",
        timestamp: serverTimestamp(),
      });
  
      return chatRef.id; // Return the created chat ID
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };
  
  // 🔹 Send a message in a chat
  export const sendMessage = async (chatId, senderId, text, type = "text") => {
    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        senderId,
        text,
        type,
        timestamp: serverTimestamp(),
        seen: false,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  // 🔹 Get real-time chat list for a user
  export const getUserChats = (userId, callback) => {
    const q = query(collection(db, "chats"), where("users", "array-contains", userId));
  
    return onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(chats);
    });
  };
  
  // 🔹 Get real-time messages in a chat
  export const getMessages = (chatId, callback) => {
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));
  
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(messages);
    });
  };
  
  // 🔹 Mark a message as seen
  export const markMessageAsSeen = async (chatId, messageId) => {
    try {
      await updateDoc(doc(db, "chats", chatId, "messages", messageId), {
        seen: true,
      });
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };
  