import { CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function ProviderApplication() {
  const navigate = useNavigate();
  const { axiosInstance, authenticated } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authenticated) {
      navigate("/signin", {
        replace: true,
        state: { from: "/provider-application" },
      });
    }
  }, [authenticated, navigate]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "Abdullahi",
    surname: "Ismail",
    email: "abdullahabuaslam@gmail.com",
    state: "Kaduna",
    city: "Zaria",
    businessAddress: "20, Adams street, magodo phase 2, Lagos",
    phoneNumber: "+2347035974746",
    gender: "Male",
    businessName: "",
    serviceCategory: "ICT",
    serviceDescription: "",
    identificationDoc: null,
  });

  const steps = [
    { number: 1, text: "Fill Personal details" },
    { number: 2, text: "Fill Service details" },
    { number: 3, text: "Upload valid means of identification" },
    { number: 4, text: "Submit application" },
    { number: 5, text: "Wait for review" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        identificationDoc: file,
      }));
      setCurrentStep(4);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "identificationDoc" && formData[key]) {
          formDataToSend.append("identificationDoc", formData[key]);
        } else if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axiosInstance.post(
        "/users/apply-for-vendor",
        formDataToSend,
        {
          headers: {
            // Remove explicit Content-Type to let browser set it for FormData
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setIsSubmitted(true);
        setCurrentStep(5);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Try to refresh token first before redirecting
        try {
          await axiosInstance.post("/auth/refresh");
          // If refresh successful, retry the submission
          return handleSubmit(e);
        } catch (refreshError) {
          setError("Session expired. Please log in again.");
          navigate("/signin", {
            replace: true,
            state: { from: "/provider-application" },
          });
        }
      } else {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to submit application. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const isStepComplete = (stepNumber) => {
    if (stepNumber === 1) {
      return (
        formData.state &&
        formData.city &&
        formData.businessAddress &&
        formData.phoneNumber &&
        formData.gender
      );
    }
    if (stepNumber === 2) {
      return (
        formData.businessName &&
        formData.serviceCategory &&
        formData.serviceDescription
      );
    }
    if (stepNumber === 3) {
      return formData.identificationDoc !== null;
    }
    return false;
  };

  if (isSubmitted) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-primary flex flex-row gap-2 justify-center items-center py-8">
          <img src="directlyicon.png" alt="Directly" className="h-8" />
          <img src="directlyname.png" alt="Directly" className="h-8" />
        </header>

        <main className="w-[90%] md:w-4/5 flex flex-col gap-4 justify-center items-center m-auto">
          <div className="w-full overflow-x-auto px-4 md:px-8 mb-8 mt-10">
            <div className="flex justify-between min-w-[800px] md:min-w-0">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center text-sm md:text-base font-bold
                     ${
                       step.number <= currentStep
                         ? "bg-primary text-white"
                         : "bg-ash text-black"
                     }`}
                    >
                      {step.number}
                    </span>
                    <p className="text-xs md:text-sm text-center mt-2 max-w-[120px]">
                      {step.text}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-16 md:w-24 border-b-2 border-primary mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-4/5 m-auto rounded-lg bg-white p-8 md:p-16 text-center">
            <div className="w-16 h-16 border-4 border-primary rounded-full mx-auto mb-6 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary rounded-full" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Application Submitted Successfully
            </h2>
            <p className="text-gray-600 mb-4">
              Your application is currently under review. We will notify you via
              email once the review is complete.
            </p>
            <p className="text-sm text-gray-500">
              Please note that the review process typically takes 2-3 business
              days.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100">
      <header className="bg-primary flex flex-row gap-2 justify-center items-center py-8">
        <img src="directlyicon.png" alt="Directly" className="h-8" />
        <img src="directlyname.png" alt="Directly" className="h-8" />
      </header>

      <main className="w-4/5 md:w-4/5 flex flex-col gap-4 justify-center items-center m-auto">
        <div className="flex flex-col gap-4 justify-center items-center text-center mt-10 p-8">
          <h1 className="text-2xl font-bold mb-2">
            Join other service providers on Directly
          </h1>
          <p className="text-gray-600 mb-6">
            Complete this form to become a certified service provider
          </p>
        </div>

        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="w-full overflow-x-auto px-4 md:px-8 mb-8">
          <div className="flex justify-between min-w-[800px] md:min-w-0">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <span
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center text-sm md:text-base font-bold
                    ${
                      step.number <= currentStep || isStepComplete(step.number)
                        ? "bg-primary text-white"
                        : "bg-ash text-black"
                    }`}
                  >
                    {step.number}
                  </span>
                  <p className="text-xs md:text-sm text-center mt-2 max-w-[120px]">
                    {step.text}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-16 md:w-24 border-b-2 border-primary mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full m-auto rounded-lg bg-white p-8 md:p-16 relative"
        >
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-lg font-medium text-gray-700">
                  Submitting application...
                </p>
              </div>
            </div>
          )}

          <section>
            <h2 className="text-lg font-bold mb-4">PERSONAL DETAILS</h2>
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
                  value={formData.firstName}
                  readOnly
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
                  value={formData.surname}
                  readOnly
                  className="w-full bg-ash/40 border border-gray-300 rounded py-4 px-3 focus:outline-none focus:ring"
                  disabled
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full bg-ash/40 border border-gray-300 rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
                disabled
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="state"
                  className="block text-gray-700 font-medium mb-2"
                >
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="Kaduna">Kaduna</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-gray-700 font-medium mb-2"
                >
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="Zaria">Zaria</option>
                </select>
              </div>
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
                value={formData.businessAddress}
                onChange={handleInputChange}
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
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
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
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-lg font-bold mb-4">SERVICE DETAILS</h2>
            <div className="mb-4">
              <label
                htmlFor="businessName"
                className="block text-gray-700 font-medium mb-2"
              >
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Enter business name"
                className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="serviceCategory"
                className="block text-gray-700 font-medium mb-2"
              >
                Service Category
              </label>
              <select
                id="serviceCategory"
                name="serviceCategory"
                value={formData.serviceCategory}
                onChange={handleInputChange}
                className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="">
                  What category is your business under? e.g. health & beauty
                </option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="serviceDescription"
                className="block text-gray-700 font-medium mb-2"
              >
                Service Description
              </label>
              <textarea
                id="serviceDescription"
                name="serviceDescription"
                value={formData.serviceDescription}
                onChange={handleInputChange}
                placeholder="Describe the services you are offering"
                className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500 h-32"
              ></textarea>
            </div>
          </section>
          <section className="flex flex-col">
            <label
              htmlFor="identificationDoc"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Valid I.D
            </label>

            <div className="mb-4 border h-52 flex flex-col justify-center items-center rounded-lg hover:bg-ash/40 transition">
              <label className="cursor-pointer flex flex-col gap-4 justify-center items-center">
                <input
                  type="file"
                  id="identificationDoc"
                  name="identificationDoc"
                  accept="image/*,.pdf"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <CirclePlus size={80} />
                {formData.identificationDoc ? (
                  <span className="text-green-600">
                    File uploaded: {formData.identificationDoc.name}
                  </span>
                ) : (
                  "Upload valid I.D. e.g NIN, Voters card"
                )}
              </label>
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting || !isStepComplete(3)}
            className={`w-full ${
              isSubmitting || !isStepComplete(3)
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } text-white py-4 px-4 rounded mt-4`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default ProviderApplication;
