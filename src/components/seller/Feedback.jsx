import { useState } from "react";
import { FaTrash, FaStar } from "react-icons/fa";
import { FiMenu, FiSearch, FiBell } from "react-icons/fi";
import { FaHome, FaUtensils, FaShoppingBag, FaUser } from "react-icons/fa";
import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";

const feedbacks = [
  {
    id: 1,
    name: "John Smith",
    rating: 4,
    comment: "The food was delicious! Quick delivery and great service.",
    time: "Today, 2:30 PM",
  },
  {
    id: 2,
    name: "Emily Johnson",
    rating: 5,
    comment: "Amazing pizza! Will definitely order again.",
    time: "Yesterday, 7:15 PM",
  },
  {
    id: 3,
    name: "Michael Brown",
    rating: 5,
    comment: "Good food but delivery was a bit late.",
    time: "Feb 15, 6:45 PM",
  },
  {
    id: 4,
    name: "Michael Brown",
    rating: 3,
    comment: "Good food but delivery was a bit late.",
    time: "Feb 15, 6:45 PM",
  },
  {
    id: 5,
    name: "Michael Brown",
    rating: 3,
    comment: "Good food but delivery was a bit late.",
    time: "Feb 15, 6:45 PM",
  },
];

export default function FeedbackManagement() {
  const [feedbackList, setFeedbackList] = useState(feedbacks);

  const handleDelete = (id) => {
    setFeedbackList(feedbackList.filter((feedback) => feedback.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
     <Navbar/>

      
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold text-center">Feedback Management</h2>
        <p className="text-center text-gray-500 mb-4">View and manage customer feedback</p>

        <div className="space-y-4 max-h-[65vh] overflow-y-auto no-scrollbar ">
          {feedbackList.map((feedback) => (
            <div key={feedback.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{feedback.name}</h3>
                <div className="flex text-yellow-500 my-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className={index < feedback.rating ? "" : "text-gray-300"} />
                  ))}
                </div>
                <p className="text-gray-700">{feedback.comment}</p>
                <p className="text-gray-500 text-sm mt-1">{feedback.time}</p>
              </div>
              <button onClick={() => handleDelete(feedback.id)} className="text-red-500 text-xl">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

     <Footer/>
    </div>
  );
}
