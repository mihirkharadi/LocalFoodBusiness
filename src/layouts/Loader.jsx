import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center  ">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
