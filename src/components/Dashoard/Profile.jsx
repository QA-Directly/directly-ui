import React, { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import user from "../../assets/occupations/plumber.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";

function Profile() {
  const { userProfile, refreshProfile } = useAuth(); // Add refreshProfile from context
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dp, setDp] = useState(userProfile.profilePicture);

  const fileInputRef = useRef(null);

  useEffect(() => {
    setDp(userProfile.profilePicture);
  }, [userProfile]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadLoading(true);
      setUploadError("");

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `https://directly-core.onrender.com/users/${userProfile._id}/add-profile-picture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // Add this to ensure cookies are sent
          }
        );

        console.log("Profile picture updated:", response.data);

        // Create a temporary object URL for immediate visual feedback
        const tempImageUrl = URL.createObjectURL(file);
        setDp(tempImageUrl);

        // Refresh the user profile to get the new image URL from server
        await refreshProfile();
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        setUploadError(
          error.response?.data?.message || "Failed to upload profile picture"
        );
        // Reset to original profile picture if upload fails
        setDp(userProfile.profilePicture);
      } finally {
        setUploadLoading(false);
      }
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
          {uploadLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          )}
          {uploadError && (
            <p className="absolute -bottom-6 left-0 text-sm text-red-500">
              {uploadError}
            </p>
          )}
        </div>

        <div className="w-1/3 flex flex-row items-center justify-between gap-8 h-12 ">
          {userProfile.role === "provider" && (
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
            value={userProfile.firstName}
            className="w-full bg-ash/40 border border-gray-300 rounded py-4 px-3 focus:outline-none focus:ring"
            readOnly
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
            value={userProfile.lastName}
            className="w-full bg-ash/40 border border-gray-300 rounded py-4 px-3 focus:outline-none focus:ring"
            readOnly
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
          value={userProfile.email}
          className="w-full bg-ash/40 border border-gray-300 rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
          readOnly
        />
      </div>
      {userProfile.role === "provider" && (
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
            value={userProfile.businessAddress}
            className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {userProfile.role === "provider" && (
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
              value={userProfile.phoneNumber}
              className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
