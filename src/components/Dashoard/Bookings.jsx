import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import axios from "axios";

const Bookings = () => {
  const [newBookings, setNewBookings] = useState([]);
  const [oldBookings, setOldBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { axiosInstance, userProfile } = useAuth();
  const [serviceId, setServiceId] = useState(userProfile.serviceId);

  // Review state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isProvider = userProfile.role === "service-provider";

  useEffect(() => {
    setServiceId(userProfile.serviceId);
    console.log(userProfile);
  }, [userProfile]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Fetch bookings based on user role
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let response;
        if (isProvider) {
          // Fetch bookings received by the service provider
          response = await axiosInstance.get(`/booking/service/${serviceId}`);
          console.log("Provider bookings :");
        } else {
          // Fetch bookings made by the user
          response = await axiosInstance.get(
            `/booking/user/${userProfile._id}`
          );
          console.log("User bookings: ");
        }

        const bookings = response.data;
        const transformedBookings = bookings.map((booking) => ({
          id: booking._id,
          name: `${booking.firstName} ${booking.lastName}`,
          contact: booking.phone,
          dateTime: `${booking.date} ${booking.time}`,
          status:
            booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
          address: booking.address,
          note: booking.note,
          hasReviewed: booking.hasReviewed || false,
          serviceProvider: booking.serviceProvider,
          serviceId: booking.serviceId,
        }));

        // Split bookings based on date
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
  }, [axiosInstance, isProvider, serviceId, userProfile._id]);

  const handleConfirm = async (bookingId) => {
    setIsActionLoading(true);
    try {
      await axios.patch(
        `https://directly-core.onrender.com/booking/${bookingId}/confirm`,
        {},
        { withCredentials: true }
      );
      const updatedBookings = newBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "Confirmed" } : booking
      );
      setNewBookings(updatedBookings);
    } catch (error) {
      console.error("Error confirming booking:", error);
    } finally {
      setIsActionLoading(false);
      setOpenDropdown(null);
    }
  };

  const handleCancel = async (bookingId) => {
    setIsActionLoading(true);
    try {
      await axios.patch(
        `https://directly-core.onrender.com/booking/${bookingId}/cancel`,
        {},
        { withCredentials: true }
      );
      const updatedBookings = newBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking
      );
      setNewBookings(updatedBookings);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setIsActionLoading(false);
      setOpenDropdown(null);
    }
  };

  const handleReschedule = async (bookingId) => {
    setIsActionLoading(true);
    try {
      await axios.patch(
        `https://directly-core.onrender.com/booking/${bookingId}/reschedule`,
        {},
        { withCredentials: true }
      );
      const updatedBookings = newBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "Rescheduled" }
          : booking
      );
      setNewBookings(updatedBookings);
    } catch (error) {
      console.error("Error rescheduling booking:", error);
    } finally {
      setIsActionLoading(false);
      setOpenDropdown(null);
    }
  };

  // Review functionality
  const openReviewModal = (booking) => {
    if (isProvider) return; // Prevent providers from reviewing
    setSelectedBooking(booking);
    setShowReviewModal(true);
    setRating(0);
    setComment("");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBooking || rating === 0 || isProvider) return;

    setIsSubmitting(true);
    try {
      const reviewData = {
        userId: userProfile._id,
        serviceId: selectedBooking.serviceId,
        bookingId: selectedBooking.id,
        rating: rating,
        comment: comment,
      };

      await axios.post(
        "https://directly-core.onrender.com/review",
        reviewData,
        { withCredentials: true }
      );

      const updatedOldBookings = oldBookings.map((booking) =>
        booking.id === selectedBooking.id
          ? { ...booking, hasReviewed: true }
          : booking
      );
      setOldBookings(updatedOldBookings);
      setShowReviewModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-8 h-8 ${
                star <= value
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const ActionDropdown = ({ booking }) => {
    const isOpen = openDropdown === booking.id;

    const handleDropdownClick = (e) => {
      e.stopPropagation();
      setOpenDropdown(isOpen ? null : booking.id);
    };

    return (
      <div className="relative">
        <button
          onClick={handleDropdownClick}
          disabled={isActionLoading}
          className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none ${
            isActionLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Actions
          {isOpen ? (
            <ChevronUp className="w-4 h-4 ml-2" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-2" />
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu">
              <button
                onClick={() => handleConfirm(booking.id)}
                disabled={
                  isActionLoading ||
                  booking.status.toLowerCase() === "confirmed"
                }
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  booking.status.toLowerCase() === "confirmed"
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-700"
                }`}
              >
                Confirm
              </button>
              <button
                onClick={() => handleCancel(booking.id)}
                disabled={
                  isActionLoading ||
                  booking.status.toLowerCase() === "cancelled"
                }
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  booking.status.toLowerCase() === "cancelled"
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-700"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleReschedule(booking.id)}
                disabled={
                  isActionLoading ||
                  booking.status.toLowerCase() === "rescheduled"
                }
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  booking.status.toLowerCase() === "rescheduled"
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-orange-700"
                }`}
              >
                Reschedule
              </button>
            </div>
          </div>
        )}
      </div>
    );
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
      {/* New Bookings Section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            {isProvider ? "Received Bookings" : "Your Bookings"}
          </h2>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-4">
            {/* Header Row */}
            <div className="flex items-center justify-between border-b pb-4 font-semibold text-gray-700">
              <div className="w-1/5">
                {isProvider ? "Client Name" : "Service Provider"}
              </div>
              <div className="w-1/5">Contact Details</div>
              <div className="flex flex-row w-2/5 justify-between">
                <div className="w-1/2">Date</div>
                <div className="w-1/2">Time</div>
              </div>
              <div className="w-1/5">Status</div>
              <div className="w-40">{isProvider ? "Action" : ""}</div>
            </div>

            {/* Booking details rows */}
            {newBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between border-b pb-4 last:border-b-0"
              >
                <div className="w-1/5">
                  {isProvider ? booking.name : booking.serviceProvider}
                </div>
                <div className="w-1/5">{booking.contact}</div>
                <div className="flex flex-row w-2/5 justify-between">
                  <div className="w-1/2">{booking.dateTime.split(" ")[0]}</div>
                  <div className="w-1/2">{booking.dateTime.split(" ")[1]}</div>
                </div>
                <div className={`w-1/5 ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </div>
                <div className="w-40">
                  {isProvider && <ActionDropdown booking={booking} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Old Bookings Section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Past Bookings</h2>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-4">
            {oldBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between border-b pb-4 last:border-b-0"
              >
                <div className="w-1/5">
                  {isProvider ? booking.name : booking.serviceProvider}
                </div>
                <div className="w-1/5">{booking.address}</div>
                <div className="w-1/5">{booking.dateTime}</div>
                <div className={`w-1/5 ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </div>
                <div className="w-1/5 text-right">
                  {!isProvider && !booking.hasReviewed && (
                    <button
                      className="bg-blue-100 text-blue-800 px-4 py-1 rounded hover:bg-blue-200 transition-colors"
                      onClick={() => openReviewModal(booking)}
                    >
                      Leave Review
                    </button>
                  )}
                  {!isProvider && booking.hasReviewed && (
                    <span className="text-gray-500 text-sm">Reviewed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Modal - only rendered for non-provider users */}
      {!isProvider && showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Leave a Review for {selectedBooking?.serviceProvider}
            </h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <StarRating value={rating} onChange={setRating} />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Review
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={rating === 0 || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Calendar Section - Optional, can be removed if not needed */}
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
    </div>
  );
};

export default Bookings;
