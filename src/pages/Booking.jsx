import React, { useEffect, useState } from "react";
import Header from "../assets/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProvider } from "../Contexts/ProviderContext";

const Booking = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getProviderById, loading: providerLoading } = useProvider();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    userId: "",
    serviceId: "",
    firstName: "",
    lastName: "",
    date: "",
    time: "",
    address: "",
    phone: "",
    note: "",
  });

  const [user, setUser] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 3 }, (_, i) => currentYear + i);

  const firstDay = new Date(selectedYear, selectedMonth, 1);
  const startDayCode = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - startDayCode + 1;
    return dayNumber >= 1 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  // Enhanced error handling for API calls
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "https://directly-core.onrender.com/auth/profile",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/signin");
        throw new Error("Please login to continue");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  };

  // Adjusted useEffect to set serviceId as a number
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const userData = await fetchUserProfile();
        setUser(userData);

        setFormData((prev) => ({
          ...prev,
          userId: userData._id || "",
          serviceId: id,
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          address: prev.address || "",
          phone: prev.phone || "",
          time: prev.time || "1pm",
        }));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleDayClick = (day) => {
    if (day === null) return;
    const date = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      date: date.toISOString().split("T")[0],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!formData.date) {
        throw new Error("Please select a date");
      }

      // Ensure all values are strings and properly formatted
      const bookingData = {
        bookingDetails: {
          userId: String(formData.userId),
          serviceId: String(id), // Convert to string explicitly
          firstName: String(formData.firstName),
          lastName: String(formData.lastName),
          date: new Date(formData.date).toISOString().split("T")[0], // Ensure proper ISO format
          time: String(formData.time),
          address: String(formData.address),
          phone: String(formData.phone),
          note: String(formData.note || ""),
        },
      };

      // Log the stringified data to see exactly what's being sent
      console.log("Stringified booking data:", JSON.stringify(bookingData));

      const response = await axios({
        method: "POST",
        url: "https://directly-core.onrender.com/booking",
        data: bookingData,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status >= 200 && response.status < 300) {
        navigate("/bookingsuccess");
      }
    } catch (error) {
      console.error("Booking error:", error);
      // Improved error handling
      const errorMessage = error.response?.data?.message;
      setError(
        Array.isArray(errorMessage)
          ? errorMessage.join(", ")
          : error.message || "Failed to submit booking. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const provider = getProviderById(id);

  if (isLoading || providerLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Provider not found
      </div>
    );
  }
  const getInitials = (businessName) => {
    if (!businessName) return "?";
    return businessName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  const ProfileImage = ({ provider }) => {
    if (provider.profilePicture) {
      return (
        <img
          src={provider.profilePicture}
          className="w-full rounded-full"
          alt={provider.businessName}
        />
      );
    }

    return (
      <div className="w-full aspect-square rounded-full bg-[#CBE9F4] flex items-center justify-center text-2xl font-bold text-[#001f3f]">
        {getInitials(provider.businessName)}
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-4 bg-ash">
      <Header />

      {error && (
        <div className="mx-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="w-full min-h-screen m-auto flex flex-col lg:flex-row justify-evenly p-4 lg:p-8 gap-4 lg:gap-8">
        {/* Main booking section */}
        <div className="w-full lg:w-2/3 bg-white p-4 lg:p-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">SECURE AN APPOINTMENT</h2>

          {/* Calendar */}
          <div className="w-full lg:w-2/3 bg-[#CBE9F4] rounded-lg shadow-md p-4 mb-6">
            <div className="w-full lg:w-3/4 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <h2 className="text-xl font-semibold">
                {monthNames[selectedMonth]} {selectedYear}
              </h2>
              <div className="flex items-center gap-2">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="p-1 rounded"
                >
                  {monthNames.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="p-1 rounded"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-xs sm:text-sm">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center font-medium p-1 sm:p-2">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`text-center p-1 sm:p-2 cursor-pointer rounded
                    ${day === selectedDate?.getDate() ? "bg-green-300" : ""}
                    ${day ? "hover:bg-gray-100" : ""}`}
                  onClick={day ? () => handleDayClick(day) : undefined}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  placeholder={user.firstName}
                  onChange={handleInputChange}
                  className="w-full border rounded py-2 px-3"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder={user.lastName}
                  onChange={handleInputChange}
                  className="w-full border rounded py-2 px-3"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border rounded py-2 px-3"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded py-2 px-3"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                  Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full border rounded py-2 px-3"
                  required
                >
                  <option value="1pm">1pm</option>
                  <option value="2pm">2pm</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Note
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                className="w-full border-2 rounded py-2 px-3"
                rows="4"
              />
            </div>
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-gold p-2  sm:w-4/5 rounded-lg text-primary font-bold
                  ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-yellow-600"
                  }`}
              >
                {isLoading ? "Booking..." : "Book Now"}
              </button>
            </div>
          </form>
        </div>

        {/* Provider details and booking confirmation */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {provider ? (
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4">
                  <ProfileImage provider={provider} />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  {provider.businessName}
                </h2>

                <div className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="pb-2">
                      <h3 className="font-medium mb-2">Email</h3>
                      <p className="text-gray-600 text-sm break-words">
                        {provider.email}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Phone</h3>
                      <p className="text-gray-600 text-sm">
                        {provider.phoneNumber}
                      </p>
                    </div>
                    <div className="border-t pt-2">
                      <h3 className="font-medium">Location</h3>
                      <p className="text-gray-600 text-sm">
                        {provider.city} {provider.country}
                      </p>
                    </div>
                    <div className="border-t pt-2 mb-10">
                      <h3 className="font-medium">Service Category</h3>
                      <p className="text-gray-600 text-sm">
                        {provider.category}
                      </p>
                    </div>
                  </div>
                  <Link to="/dashboard/messages" className="w-full">
                    <button className="w-full border-2 bg-[#CBE9F4] text-primary font-bold px-4 py-2 rounded-lg hover:bg-blue-600">
                      Message Me
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Provider not found</p>
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between items-center">
            <h1 className="font-bold text-lg mb-4">Review Appointment</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
