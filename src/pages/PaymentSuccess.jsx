import BuyerFooter from '../layouts/BuyerFooter';
import BuyerNavbar from '../layouts/BuyerNavbar';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection,getDocs,deleteDoc, } from 'firebase/firestore';
import { useEffect } from 'react';
import { auth } from '../firebaseConfig';
const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
const navigate=useNavigate();
 
useEffect(() => {
  const handleSuccess = async () => {
    const userId=auth.currentUser?.uid;

    const cartRef = collection(db, "users", userId, "cart");
    const cartSnap = await getDocs(cartRef);
    cartSnap.forEach((doc) => deleteDoc(doc.ref));

    
    navigate("/order");
  };

  handleSuccess();
}, []);

  return (
    
    <>
  <BuyerNavbar/>
    
    <div className="flex flex-col items-center justify-center p-6 text-center">
    <h2 className="text-xl font-bold">🎉 Payment Successful!</h2>
    <p className="text-md mt-2">Your order ID is <strong>{orderId}</strong></p>
    <p>Thank you for supporting local food businesses!</p>
      <button
        className="mt-4 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
        onClick={() => navigate("/order")}
      >
        Go to order
      </button>
    </div>
<BuyerFooter/>
    </>
  );
};

export default PaymentSuccess;
