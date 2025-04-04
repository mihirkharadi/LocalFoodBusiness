import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");


    const fetchClientSecret = async () => {
        const response = await fetch('http://localhost:3001/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 500 }) // Example: ₹500
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
        console.log(data.clientSecret);
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Customer Name',
                },
            },
        });

        if (error) {
            console.error(error);
            alert('Payment Failed. Try again.');
        } else if (paymentIntent.status === 'succeeded') {
            alert('Payment Successful! ✅');
        }
    };

    return (
        <div>
            <button onClick={fetchClientSecret}>Generate Client Secret</button>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-md">
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
