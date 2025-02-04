import { CirclePlus } from "lucide-react";
import { useState } from "react";

function ProviderApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const steps = [
    { number: 1, text: "Fill Personal details", active: true },
    { number: 2, text: "Fill Service details" },
    { number: 3, text: "Upload valid means of identification" },
    { number: 4, text: "Submit application" },
    { number: 5, text: "Wait for review" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
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
                       step.active
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
      {/* header */}
      <header className="bg-primary flex flex-row gap-2 justify-center items-center py-8">
        <img src="directlyicon.png" alt="Directly" className="h-8" />
        <img src="directlyname.png" alt="Directly" className="h-8" />
      </header>

      {/* progress  */}
      <main className="w-4/5 md:w-4/5 flex flex-col gap-4 justify-center items-center m-auto">
        <div className=" flex flex-col gap-4 justify-center items-center text-center mt-10 p-8">
          <h1 className="text-2xl font-bold mb-2 ">
            Join other service providers on Directly
          </h1>
          <p className="text-gray-600 mb-6">
            Complete this form to become a certified service provider
          </p>
        </div>

        <div className="w-full overflow-x-auto px-4 md:px-8 mb-8 ">
          <div className="flex justify-between min-w-[800px] md:min-w-0">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <span
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center text-sm md:text-base font-bold
                ${step.active ? "bg-primary text-white" : "bg-ash text-black"}`}
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

        {/* main form */}
        <form
          onSubmit={handleSubmit}
          className="w-full m-auto rounded-lg bg-white p-8 md:p-16"
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
                value="Paulanjola@gmail.com"
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
                  className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
                ></select>
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
                  className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500"
                ></select>
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
                placeholder="Describe the services you are offering"
                className="w-full border-gray-300 border rounded py-4 px-3 focus:outline-none focus:ring focus:border-blue-500 h-32"
              ></textarea>
            </div>
          </section>
          <section className="flex flex-col ">
            <label
              htmlFor="serviceDescription"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Valid I.D
            </label>

            <div className="mb-4 border h-52 flex flex-col justify-center items-center rounded-lg hover:bg-ash/40 transition">
              <button
                type="button"
                className=" flex flex-col gap-4 justify-center items-center "
              >
                <CirclePlus size={80} />
                Upload valid I.D. e.g NIN, Voters card
              </button>
            </div>
          </section>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting
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
