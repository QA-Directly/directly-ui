import React from "react";

function Profile() {
  return (
    <div className="w-4/5 bg-white flex flex-col p-4  rounded-lg border-2">
      <div className="w-full flex flex-row gap-2 justify-between items-center m-auto mt-8">
        <img
          src="./occupations/baber.png"
          className="w-24 h-24 rounded-full"
          alt=""
        />
        <div className="w-1/3 flex flex-row items-center justify-between gap-8 h-12 ">
          <button className="w-1/2 border-2 border-primary bg-primary p-2 rounded-lg text-lightText">
            Upload now
          </button>
          <button className="w-1/2 border-2 border-primary p-2 rounded-lg">
            Delete Avatar
          </button>
        </div>
      </div>
      <div className=" grid grid-cols-1  md:grid-cols-2  gap-4 mb-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-medium mb-2 "
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
      </div>
    </div>
  );
}

export default Profile;
