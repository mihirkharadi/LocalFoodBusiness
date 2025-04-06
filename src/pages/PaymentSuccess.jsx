import BuyerFooter from '../layouts/BuyerFooter';
import BuyerNavbar from '../layouts/BuyerNavbar';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

 

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
        Return to Cart
      </button>
    </div>
<BuyerFooter/>
    </>
  );
};

export default PaymentSuccess;
