import BuyerFooter from '../layouts/BuyerFooter';
import BuyerNavbar from '../layouts/BuyerNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);

        // Now clear the cart from Firestore
        const cartRef = collection(db, "users", uid, "cart");
        const cartSnap = await getDocs(cartRef);
        cartSnap.forEach((doc) => deleteDoc(doc.ref));
      }
    });

    return () => unsub();
  }, []);

  return (
    <>
      <BuyerNavbar />

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

      <BuyerFooter />
    </>
  );
};

export default PaymentSuccess;
