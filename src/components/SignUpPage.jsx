import React, { useState } from "react";

const SignupForm = () => {
  const [role, setRole] = useState("Seller");
  const [agree, setAgree] = useState(false);

  return (
    <div className="flex justify-center items-center  bg-gray-200">
      <div className="w-[350px] h-[500px] bg-black rounded-3xl shadow-2xl border-8 border-black relative overflow-hidden">
     
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-3xl"></div>

  
        <div className="relative h-full w-full bg-white rounded-3xl overflow-hidden flex flex-col justify-center p-6">
      
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <p className="text-gray-500 text-center mt-1">
            Join FoodHub to start ordering or selling delicious meals
          </p>

          <form className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Buyer"
                  checked={role === "Buyer"}
                  onChange={() => setRole("Buyer")}
                  className="accent-blue-500"
                />
                <span>Buyer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Seller"
                  checked={role === "Seller"}
                  onChange={() => setRole("Seller")}
                  className="accent-blue-500"
                />
                <span>Seller</span>
              </label>
            </div>

           
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="accent-blue-500"
              />
              <p className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="font-semibold text-black">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="font-semibold text-black">Privacy Policy</span>
              </p>
            </div>

           
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-3 rounded-lg mt-2 shadow-md hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
