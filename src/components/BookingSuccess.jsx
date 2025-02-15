import React from "react";
import Header from "../assets/Header";
import { Smile } from "lucide-react";

const BookingSuccess = () => {
  return (
    <div className="h-screen w-full bg-ash flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg w-[500px] h-1/2 flex flex-col items-center justify-center text-center">
          <div className="flex flex-row gap-6 justify-center mb-6">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="  rounded-full flex items-center justify-center text-white "
              >
                <Smile
                  className="bg-green-600 rounded-full"
                  color="white"
                  size={index == 1 || index == 4 ? 40 : 60}
                />
              </div>
            ))}
          </div>
          <h2 className="text-gray-800 text-xl font-medium mb-4">
            Booking Sent Sucessfully
          </h2>
          <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
