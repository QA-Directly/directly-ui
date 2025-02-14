import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";

const Bookings = () => {
  const [newBookings, setNewBookings] = useState([]);
  const [oldBookings, setOldBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { axiosInstance, userProfile } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(
          "/booking/service/67ae1d2184a6c00b24ed0219"
        );
        const bookings = response.data;

        // Transform API data to match component structure
        const transformedBookings = bookings.map((booking) => ({
          id: booking._id,
          name: `${booking.firstName} ${booking.lastName}`,
          contact: booking.phone,
          dateTime: `${booking.date} ${booking.time}`,
          status:
            booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
          address: booking.address,
          note: booking.note,
        }));

        // Split bookings into new and old based on date
        const currentDate = new Date();
        const newBooks = transformedBookings.filter(
          (booking) => new Date(booking.dateTime.split(" ")[0]) >= currentDate
        );
        const oldBooks = transformedBookings.filter(
          (booking) => new Date(booking.dateTime.split(" ")[0]) < currentDate
        );

        setNewBookings(newBooks);
        setOldBookings(oldBooks);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [axiosInstance]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "cancelled":
        return "text-red-500";
      case "rescheduled":
      case "pending":
        return "text-orange-500";
      case "confirmed":
      case "completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axiosInstance.patch(`/booking/${bookingId}`, { status: newStatus });
      // Refresh bookings after update
      const updatedBookings = newBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );
      setNewBookings(updatedBookings);
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const getActionButton = (booking) => {
    switch (booking.status.toLowerCase()) {
      case "cancelled":
        return (
          <button
            onClick={() => handleStatusUpdate(booking.id, "rescheduled")}
            className="bg-orange-500 text-white w-full px-4 py-1 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Reschedule
          </button>
        );
      case "rescheduled":
      case "pending":
        return (
          <button
            onClick={() => handleStatusUpdate(booking.id, "confirmed")}
            className="bg-green-500 text-white w-full px-4 py-1 rounded-lg hover:bg-green-600 transition-colors"
          >
            Confirm
          </button>
        );
      case "confirmed":
        return (
          <button
            onClick={() => handleStatusUpdate(booking.id, "cancelled")}
            className="bg-red-500 text-white px-4 w-full py-1 rounded-lg hover:bg-red-600 transition-colors"
          >
            Cancel
          </button>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-6">
        <div className="text-lg">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8 p-6 border-2">
      {/* Calendar Section */}
      <div className="w-1/3 bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Schedule Calendar
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1 text-sm">
            {["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center font-medium p-2">
                {day}
              </div>
            ))}
            {[...Array(31)].map((_, i) => (
              <div
                key={i}
                className={`text-center p-2 ${
                  i + 1 === 7 ? "bg-blue-100 rounded" : ""
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Bookings Section */}
      <div className="bg-white rounded-lg shadow-md">
        {userProfile.role === "service-provider" && (
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">New Bookings</h2>
          </div>
        )}
        <div className="p-4">
          <div className="flex flex-col gap-4">
            {/* Header Row */}
            <div className="flex items-center justify-between border-b pb-4 font-semibold text-gray-700">
              <div className="w-1/5">Name</div>
              <div className="w-1/5">Contact Details</div>
              <div className="flex flex-row w-2/5 justify-between">
                <div className="w-1/2">Date</div>
                <div className="w-1/2">Time</div>
              </div>
              <div className="w-1/5">Status</div>
              <div className="w-40">Action</div>
            </div>
            {/* Booking details row */}
            {newBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between border-b pb-4 last:border-b-0"
              >
                <div className="w-1/5">{booking.name}</div>
                <div className="w-1/5">{booking.contact}</div>
                <div className="flex flex-row w-2/5  justify-between">
                  <div className="w-1/2 ">{booking.dateTime.split(" ")[0]}</div>
                  <div className="w-1/2">{booking.dateTime.split(" ")[1]}</div>
                </div>
                <div className={`w-1/5 ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </div>
                <div className="w-40">{getActionButton(booking)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Old Bookings Section */}
      {userProfile.role === "service-provider" && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Old Bookings</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-col gap-4">
              {oldBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border-b pb-4 last:border-b-0"
                >
                  <div className="w-1/5">{booking.name}</div>
                  <div className="w-1/5">{booking.address}</div>
                  <div className="w-1/5">{booking.dateTime}</div>
                  <div className={`w-1/5 ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </div>
                  <div className="w-1/5 text-right">
                    <button className="bg-blue-100 text-blue-800 px-4 py-1 rounded hover:bg-blue-200 transition-colors">
                      Leave Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
