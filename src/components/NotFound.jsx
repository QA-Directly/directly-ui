import React from "react";

const NotFound = () => {
  return (
    <div className="bg-white p-12 py-24 rounded-lg w-1/2 flex flex-col items-center justify-center m-auto ">
      <div className="flex space-x-4 mb-6">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl"
          >
            {index === 1 && "☹"}
            {index === 2 && "☹"}
            {index === 3 && "😢"}
            {index === 4 && "😭"}
          </div>
        ))}
      </div>
      <h2 className="text-red-500 text-2xl font-bold mb-4">No Result found</h2>
      <p className="text-gray-600 mb-2">Use search filter to refine search</p>
      <p className="text-gray-500 text-sm">
        Over 2000 + Ads for you to explore
      </p>
    </div>
  );
};

export default NotFound;
