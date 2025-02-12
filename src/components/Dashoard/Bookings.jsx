import React from "react";

const Bookings = () => {
  const newBookings = [
    {
      id: 1,
      name: "Mrs Ade",
      contact: "08153437892",
      dateTime: "7/3/25 10am",
      status: "Cancelled",
    },
    {
      id: 2,
      name: "Mr Femi",
      contact: "08025343924",
      dateTime: "7/3/25 3pm",
      status: "Rescheduled",
    },
    {
      id: 3,
      name: "Ms Amaka",
      contact: "08054343924",
      dateTime: "7/3/25 5pm",
      status: "Confirmed",
    },
  ];

  const oldBookings = [
    {
      id: 1,
      name: "Mrs Ade",
      service: "Health & Beauty",
      dateTime: "3/2/25 5pm",
      status: "Completed",
    },
    {
      id: 2,
      name: "Mr Femi",
      service: "Plumber",
      dateTime: "7/2/25 1pm",
      status: "Completed",
    },
    {
      id: 3,
      name: "Ms Amaka",
      service: "IT Consultant",
      dateTime: "1/1/25 10am",
      status: "Completed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "cancelled":
        return "text-red-500";
      case "rescheduled":
        return "text-orange-500";
      case "confirmed":
      case "completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getActionButton = (status) => {
    switch (status.toLowerCase()) {
      case "cancelled":
        return (
          <button className="bg-orange-500 text-white w-full px-4 py-1 rounded-lg hover:bg-orange-600 transition-colors">
            Reschedule
          </button>
        );
      case "rescheduled":
        return (
          <button className="bg-green-500 text-white w-full px-4 py-1 rounded-lg hover:bg-green-600 transition-colors">
            Confirm
          </button>
        );
      case "confirmed":
        return (
          <button className="bg-red-500 text-white px-4 w-full py-1 rounded-lg hover:bg-red-600 transition-colors">
            Cancel
          </button>
        );
      default:
        return null;
    }
  };

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
      <div className=" bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">New Bookings</h2>
        </div>
        <div className=" p-4">
          <div className="flex flex-col gap-4 ">
            {newBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between  border-b pb-4 last:border-b-0"
              >
                <div className="w-1/5">{booking.name}</div>
                <div className="w-1/5">{booking.contact}</div>
                <div className="w-1/5">{booking.dateTime}</div>
                <div className={`w-1/5 ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </div>
                <div className=" w-40 ">{getActionButton(booking.status)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Old Bookings Section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Old Bookings</h2>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-4 ">
            {oldBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between border-b pb-4 last:border-b-0"
              >
                <div className="w-1/5">{booking.name}</div>
                <div className="w-1/5">{booking.service}</div>
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
    </div>
  );
};

export default Bookings;
