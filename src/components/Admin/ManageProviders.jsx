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

  // Modified to sort providers - pending ones first
  const filteredProviders = providers
    .filter((provider) =>
      provider.businessName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Put pending providers first
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;

      // If both have same status, sort alphabetically by business name
      return a.businessName.localeCompare(b.businessName);
    });

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

  // Updated function to make vendor status API calls - fixed URL
  const updateVendorStatus = async (endpoint, providerId) => {
    return axios.get(
      `https://directly-core.onrender.com/${endpoint}/${providerId}`
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

  // Main function to handle vendor approval - updated endpoint
  const handleApproveVendor = async (providerId) => {
    try {
      const response = await updateVendorStatus(
        "admin/approve-vendor",
        providerId
      );

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

  // Main function to handle vendor rejection - updated endpoint
  const handleRejectVendor = async (providerId) => {
    try {
      const response = await updateVendorStatus(
        "admin/reject-vendor",
        providerId
      );

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
    <div className="flex flex-row w-full h-full">
      {/* Sidebar with providers list */}
      <div className="flex flex-col bg-white w-[30%] p-4">
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
                className={`p-2   rounded-full flex flex-row justify-center items-center gap-4 hover:bg-ash hover:shadow-inner cursor-pointer ${
                  selectedProvider?._id === provider._id
                    ? "bg-[#F4F9FB] border-[#B0BEC5] border-2 "
                    : ""
                }`}
                onClick={() => setSelectedProvider(provider)}
              >
                {console.log(provider)}
                <img src={user} className="w-12 h-12 rounded-full" alt="" />
                <div className="flex-1">
                  <h2 className="font-bold">{provider.businessName}</h2>
                  <p className="text-xs text-gray-600">
                    Status:
                    <span
                      className={`${
                        provider.status === "approved"
                          ? "text-green-600"
                          : provider.status === "pending"
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {" " + provider.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Provider Details Section */}
      <div className="w-4/5 flex flex-col bg-ash h-full">
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
            <section className="flex flex-row justify-between items-center w-full  p-4 bg-[#d9d9d9] shadow">
              <div className="flex flex-row gap-8 items-center">
                <img src={user} className="w-16 h-16 rounded-full" alt="" />
                <div>
                  <h2 className="font-bold text-xl">
                    {selectedProvider.businessName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Status:{" "}
                    <span
                      className={`${
                        selectedProvider.status === "approved"
                          ? "text-green-600"
                          : selectedProvider.status === "pending"
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedProvider.status}
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* Provider Details */}
            <div className="p-6">
              <div className="bg-ash ">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4 rounded-lg p-4 shadow">
                    <h3 className="font-semibold text-lg mb-2 uppercase">
                      Personal Details
                    </h3>
                    <div>
                      <span className="">Full Name:</span>
                      <p className="font-semibold text-gray-700 border p-4 rounded-lg border-primary">
                        {selectedProvider.businessName}
                      </p>
                    </div>
                    <div>
                      <span className="">Business Address:</span>
                      <p className="font-semibold text-gray-700 border p-4 rounded-lg border-primary">
                        {selectedProvider.address}
                      </p>
                    </div>
                    <div>
                      <span className="">Email Address:</span>
                      <p className="font-semibold text-gray-700 border p-4 rounded-lg border-primary">
                        {selectedProvider.email}
                      </p>
                    </div>
                    <div>
                      <span className="">Phone Number:</span>
                      <p className="font-semibold text-gray-700 border p-4 rounded-lg border-primary">
                        {selectedProvider.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 rounded-lg p-4 shadow">
                    <h3 className="font-semibold text-lg mb-2 uppercase">
                      Service Details
                    </h3>
                    <div>
                      <span className="">Business Name:</span>
                      <p className="font-semibold text-gray-700 border p-4 rounded-lg border-primary">
                        {selectedProvider.businessName}
                      </p>
                    </div>
                    <div>
                      <span className="">Service Category:</span>
                      <p className="font-semibold text-gray-700 border p-4 rounded-lg border-primary">
                        {selectedProvider.category}
                      </p>
                    </div>
                    <div>
                      <span className="">Service Description:</span>
                      <p className="font-semibold text-gray-700 border p-4 rounded-lg border-primary">
                        {selectedProvider.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 rounded-lg p-4 shadow">
                    <h3 className="font-semibold text-lg mb-2 uppercase">
                      Uploaded ID
                    </h3>
                    <div className="border p-4 rounded-lg border-primary min-h-20">
                      {selectedProvider.idCard ? (
                        <img
                          src={selectedProvider.idCard}
                          alt="Provider ID Card"
                          className="max-w-full h-auto"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500 p-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 3h6m-6 8h6m-6 8h6M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z"
                            />
                          </svg>
                          <p className="text-center">No ID card uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* New Action Buttons Section */}
                {selectedProvider.status === "pending" && (
                  <div className="mt-6 border-t pt-6 rounded-lg p-4 shadow">
                    <div className="flex gap-4 justify-between">
                      <button
                        onClick={() =>
                          handleApproveVendor(selectedProvider._id)
                        }
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/70 transition-colors duration-200"
                      >
                        Approve Provider
                      </button>
                      <button
                        onClick={() => handleRejectVendor(selectedProvider._id)}
                        className="px-6 py-3 border-red-600 border-2 text-red-600 rounded-lg hover:bg-red-700 hover:text-white transition-colors duration-200"
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
