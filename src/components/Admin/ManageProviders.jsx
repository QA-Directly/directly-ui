import { useState } from "react";
import { Search } from "lucide-react";
import { useProvider } from "../../Contexts/ProviderContext";
import user from "../../assets/occupations/plumber.png";
import axios from "axios";

function ManageProviders() {
  const { providers, loading, error } = useProvider();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionStatus, setActionStatus] = useState({ type: "", message: "" });

  const filteredProviders = providers.filter((provider) =>
    provider.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Utility function to handle API errors consistently
  const handleApiError = (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const serverMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.response.statusText;
        return `HTTP ${error.response.status} ${serverMessage}`;
      }
      if (error.request) {
        return "Request made but no response received";
      }
      return error.message;
    }
    return error.message;
  };

  // Utility function to make vendor status API calls
  const updateVendorStatus = async (endpoint, providerId) => {
    return axios.post(
      `https://directly-core.onrender.com/users/${endpoint}`,
      { _id: providerId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  // Function to update local vendor state
  const updateLocalVendorStatus = (
    selectedProvider,
    providerId,
    newStatus,
    setSelectedProvider
  ) => {
    if (selectedProvider?._id === providerId) {
      setSelectedProvider({ ...selectedProvider, status: newStatus });
    }
  };

  // Main function to handle vendor approval
  const handleApproveVendor = async (providerId) => {
    try {
      const response = await updateVendorStatus("approve-vendor", providerId);

      setActionStatus({
        type: "success",
        message: `Vendor approved successfully (HTTP ${response.status} ${response.statusText})`,
      });

      updateLocalVendorStatus(
        selectedProvider,
        providerId,
        "approved",
        setSelectedProvider
      );
    } catch (error) {
      const errorMessage = handleApiError(error);
      setActionStatus({
        type: "error",
        message: `Failed to approve vendor: ${errorMessage}`,
      });
    }
  };

  // Main function to handle vendor rejection
  const handleRejectVendor = async (providerId) => {
    try {
      const response = await updateVendorStatus("reject-vendor", providerId);

      setActionStatus({
        type: "success",
        message: `Vendor rejected successfully (HTTP ${response.status} ${response.statusText})`,
      });

      updateLocalVendorStatus(
        selectedProvider,
        providerId,
        "rejected",
        setSelectedProvider
      );
    } catch (error) {
      const errorMessage = handleApiError(error);
      setActionStatus({
        type: "error",
        message: `Failed to reject vendor: ${errorMessage}`,
      });
    }
  };
  return (
    <div className="flex flex-row w-full h-screen">
      {/* Sidebar with providers list */}
      <div className="flex flex-col bg-white w-1/5 p-4">
        <div className="p-2 border-2 rounded-lg flex justify-center items-center">
          <input
            type="search"
            placeholder="Search providers..."
            className="w-full h-full p-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search />
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-8">
            Loading providers...
          </div>
        ) : error ? (
          <div className="text-red-500 mt-8 text-center">{error}</div>
        ) : (
          <div className="flex flex-col gap-4 pt-8">
            {filteredProviders.map((provider) => (
              <div
                key={provider._id}
                className={`p-2 border rounded-lg shadow-md flex flex-row justify-center items-center gap-4 hover:bg-ash hover:shadow-inner cursor-pointer ${
                  selectedProvider?._id === provider._id ? "bg-ash" : ""
                }`}
                onClick={() => setSelectedProvider(provider)}
              >
                <img src={user} className="w-12 h-12 rounded-full" alt="" />
                <div className="flex-1">
                  <h2 className="font-bold">{provider.businessName}</h2>
                  <p className="text-xs text-gray-600">
                    Status:{" "}
                    <span
                      className={`${
                        provider.status === "approved"
                          ? "text-green-600"
                          : provider.status === "pending"
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {provider.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Provider Details Section */}
      <div className="w-4/5 bg-ash flex flex-col">
        {actionStatus.message && (
          <div
            className={`m-4 p-4 rounded-lg ${
              actionStatus.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {actionStatus.message}
          </div>
        )}

        {selectedProvider ? (
          <>
            {/* Provider Header */}
            <section className="flex flex-row justify-between items-center w-full p-4 bg-[#d9d9d9] shadow">
              <div className="flex flex-row gap-8 items-center">
                <img src={user} className="w-16 h-16 rounded-full" alt="" />
                <div>
                  <h2 className="font-bold text-xl">
                    {selectedProvider.businessName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Status: {selectedProvider.status}
                  </p>
                </div>
              </div>
            </section>

            {/* Provider Details */}
            <div className="p-6">
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-semibold text-lg mb-2">Business Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-gray-700">
                    <span className="font-semibold">Business Name:</span>{" "}
                    {selectedProvider.businessName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Category:</span>{" "}
                    {selectedProvider.category}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span>{" "}
                    {selectedProvider.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Phone:</span>{" "}
                    {selectedProvider.phoneNumber}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Address:</span>{" "}
                    {selectedProvider.address}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">City:</span>{" "}
                    {selectedProvider.city}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">State:</span>{" "}
                    {selectedProvider.state}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Country:</span>{" "}
                    {selectedProvider.country}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-700">
                    {selectedProvider.description}
                  </p>
                </div>

                {selectedProvider.averageRating && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Average Rating</h4>
                    <p className="text-gray-700">
                      {selectedProvider.averageRating}/5
                    </p>
                  </div>
                )}

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Reviews</h4>
                  {selectedProvider.reviews &&
                  selectedProvider.reviews.length > 0 ? (
                    <div className="space-y-2">
                      {selectedProvider.reviews.map((review, index) => (
                        <div key={index} className="border-b pb-2">
                          <p className="text-gray-700">{review.comment}</p>
                          <p className="text-sm text-gray-500">
                            Rating: {review.rating}/5
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No reviews yet</p>
                  )}
                </div>
                {/* New Action Buttons Section */}
                {selectedProvider.status === "pending" && (
                  <div className="mt-6 border-t pt-6">
                    <h4 className="font-semibold mb-4">Provider Actions</h4>
                    <div className="flex gap-4 justify-end">
                      <button
                        onClick={() =>
                          handleApproveVendor(selectedProvider._id)
                        }
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        Approve Provider
                      </button>
                      <button
                        onClick={() => handleRejectVendor(selectedProvider._id)}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        Reject Provider
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a provider to view details
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageProviders;
