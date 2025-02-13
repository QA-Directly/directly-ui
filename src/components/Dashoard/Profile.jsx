import React, { useState, useRef } from "react";
import { Camera } from "lucide-react"; // Import the camera icon
import user from "../../assets/occupations/plumber.png";
import { Link } from "react-router-dom";

function Profile() {
  const [isProvider, setIsProvider] = useState(true);
  const [dp, setDp] = useState(user);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the file upload logic here
      setDp(file);
      console.log("File selected:", file);
    }
  };

  return (
    <div className="w-4/5 bg-white flex flex-col p-4 mt-10 rounded-lg border-2 mb-10">
      <div className="w-full flex flex-row gap-2 justify-between items-center m-auto mt-8 p-8">
        <div className="relative mb-10">
          <img src={dp} className="w-32 h-32  rounded-full" alt="" />
          <button
            onClick={handleImageClick}
            className="absolute bottom-0 right-0 bg-[#FF851B] p-2 rounded-full cursor-pointer"
          >
            <Camera size={20} color="white" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div className="w-1/3 flex flex-row items-center justify-between gap-8 h-12 ">
          {isProvider && (
            <Link
              to="/dashboard/upload"
              className="w-1/2 border-2 border-primary bg-primary p-2 rounded-lg text-lightText"
            >
              Upload now
            </Link>
          )}
          <button className="w-1/2 border-2 border-primary p-2 rounded-lg">
            Delete Avatar
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-medium mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value="Paul"
            className="w-full bg-ash/40 border border-gray-300 rounded py-4 px-3 focus:outline-none focus:ring"
            disabled
          />
        </div>
        <div>
          <label
            htmlFor="surname"
            className="block text-gray-700 font-medium mb-2"
          >
            Surname
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            value="Anjola"
            className="w-full bg-ash/40 border border-gray-300 rounded py-4 px-3 focus:outline-none focus:ring"
            disabled
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value="Paulanjola@gmail.com"
          className="w-full bg-ash/40 border border-gray-300 rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
          disabled
        />
      </div>
      {isProvider && (
        <div className="mb-4">
          <label
            htmlFor="businessAddress"
            className="block text-gray-700 font-medium mb-2"
          >
            Business Address
          </label>
          <input
            type="text"
            id="businessAddress"
            name="businessAddress"
            value="20, Adams street, magodo phase 2, Lagos"
            className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {isProvider && (
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value="+234 902 5432 789"
              className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        )}
        {isProvider && (
          <div>
            <label
              htmlFor="state"
              className="block text-gray-700 font-medium mb-2"
            >
              Gender
            </label>
            <select
              id="state"
              name="state"
              className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
