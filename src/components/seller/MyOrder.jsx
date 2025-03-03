import { useState } from "react";
import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar"


const orders = [
  {
    id: 1234,
    status: "In Progress",
    statusColor: "bg-yellow-200 text-yellow-800",
    total: "$35.97",
    items: "2x Margherita Pizza, 1x Classic Burger",
    time: "Today, 2:30 PM",
  },
  {
    id: 1233,
    status: "Delivered",
    statusColor: "bg-green-200 text-green-800",
    total: "$23.98",
    items: "1x Caesar Salad, 1x Pasta Carbonara",
    time: "Yesterday, 7:15 PM",
  },
  {
    id: 1232,
    status: "Delivered",
    statusColor: "bg-green-200 text-green-800",
    total: "$27.98",
    items: "2x Chicken Teriyaki",
    time: "20 Jan, 1:30 PM",
  },
  {
    id: 1231,
    status: "Delivered",
    statusColor: "bg-green-200 text-green-800",
    total: "$32.97",
    items: "3x Sushi Rolls, 1x Miso Soup",
    time: "19 Jan, 12:00 PM",
  },
];

export default function Orders() {
  return (
   <>
  
    <div className="min-h-screen bg-gray-100 ">
    <Navbar/>
      
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-center">My Orders</h2>
        <p className="text-gray-500 text-center">Track your recent orders</p>

        <div className="mt-4 space-y-4 p-3 w-auto  max-h-[70vh] overflow-y-auto no-scrollbar">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start"
            >
              <div>
                <p className="text-lg font-semibold">Order #{order.id}</p>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${order.statusColor}`}
                >
                  {order.status}
                </span>
                <p className="text-gray-600 mt-2">{order.items}</p>
                <p className="text-gray-400 text-sm">{order.time}</p>
                <p className="text-blue-300 bg-black w-20 rounded-full p-1
                text-center mt-3">Chat</p>
              </div>
              <p className="text-lg font-bold">{order.total}</p>
           
    
            </div>
            
          ))}
          
        </div>
      </div>

    <Footer/>
      
    </div>
    </>
  );
}
