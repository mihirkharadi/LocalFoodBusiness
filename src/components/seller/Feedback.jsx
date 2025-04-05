import { useEffect, useState } from "react";
import { FaTrash, FaStar, FaPlus } from "react-icons/fa";
import { FiMenu, FiSearch, FiBell } from "react-icons/fi";
import { FaHome, FaUtensils, FaShoppingBag, FaUser } from "react-icons/fa";
import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";
import { auth } from "../../firebaseConfig";
import { collection, query, where ,getDocs, addDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Loading from '../../layouts/Loader'
import { toast } from "react-toastify";



export default function FeedbackManagement() {
  const [feedbackList, setFeedbackList] = useState([]);
  const[topReview,setTopReview]=useState([]);
  const[loader,setLoader]=useState(false);
  const[getTopReview,setGetTopReview]=useState('');

const userId=auth.currentUser?.uid;


useEffect(() => {
  const getKitchenReview = async () => {
    if (!userId) return;

    try {
      
      setLoader(true);
      const q = query(
        collection(db, "review"),
        where("kitchenId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Reviews fetched:", data);
      setFeedbackList(data);
      setLoader(false)
  
   
      
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  getKitchenReview();
  
}, [userId]);

useEffect(() => {
  const getKitchenTopReviews = async () => {
    if (!userId) return;

    try {
      
      setLoader(true);
      const q = query(
        collection(db, "topReview"),
        where("kitchenId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const id=data.map((cur)=>cur.topReview.id);

      console.log("Reviews fetched:", id);
      setGetTopReview(id);
      setLoader(false)
  
   
      
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  getKitchenTopReviews();
  
}, [userId]);

  
const handleTopReview = async (id) => {
  console.log(id);
  
  
  const isAlreadyAdded = topReview.some(item => item.id === id);
  
  if (isAlreadyAdded)
  {
    toast.success("Already added",{position:"top-center",autoClose:2000})
  }

  try {
    const newItem = feedbackList.filter(feedback => feedback.id === id);
    const updatedReview = [...topReview, ...newItem];


    setTopReview(updatedReview);

   
    await addDoc(collection(db, "topReview"), {
      topReview: newItem[0],
      kitchenId: userId,
    });

    toast.success("Added successfully", { position: "top-center", autoClose: 1000 });
  } catch (error) {
    toast.error(`error ${error}`, { position: "top-center", autoClose: 200 });
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
     <Navbar/>

      
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold text-center">Feedback Management</h2>
        <p className="text-center text-gray-500 mb-4">View and manage customer feedback</p>

        <div className="space-y-4 max-h-[65vh] overflow-y-auto no-scrollbar ">
{
  loader?<Loading/>:
  feedbackList.length>0 ?

    feedbackList.map((feedback) => (
      <div key={feedback.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-blue-500">{feedback.customerName}</h3>
          <div className="flex text-yellow-500 my-1">
            
          {[...Array(5)].map((_, i) => (
    <FaStar
      key={i}
      className={feedback.rating > i ? "text-yellow-400" : "text-gray-300"}
    />
  ))}
        
              
            
          </div>
          <p className="text-gray-700">{feedback.feedback}</p>
          <p className="text-gray-500 text-sm mt-1">{feedback.timestamp.toDate().toLocaleDateString()}</p>
        </div>
        {
              getTopReview.includes(feedback.id)?"":<button onClick={() => handleTopReview(feedback.id)} className="text-red-500 text-xl">
              <FaPlus />
            </button>
        }
          
        
        
      </div>
    )):
    <>
    <h1>No feedback in list</h1>
    </>
  }

          
        </div>
      </div>

     <Footer/>
    </div>
  );
}
