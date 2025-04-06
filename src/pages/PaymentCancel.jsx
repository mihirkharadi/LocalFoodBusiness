import { useNavigate } from "react-router-dom";
import BuyerNavbar from "../layouts/BuyerNavbar";
import BuyerFooter from "../layouts/BuyerFooter";
const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <>

    <BuyerNavbar/>
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-bold text-red-600">❌ Payment Cancelled</h2>
      <p className="mt-2 text-gray-600">It looks like your payment didn’t go through.</p>
      <button
        className="mt-4 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
        onClick={() => navigate("/cart")}
      >
        Return to Cart
      </button>
    </div>
<BuyerFooter/>
    </>
  );
};

export default PaymentCancel;
