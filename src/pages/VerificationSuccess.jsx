// VerificationSuccessPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import AuthPageSideBar from "../components/AuthPageSideBar";
import logo from "../assets/logo.png";
import { CheckCircle, XCircle } from "lucide-react";

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // verifying, success, error
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("t");

      if (!token) {
        setVerificationStatus("error");
        setError("Verification token is missing");
        return;
      }

      try {
        const response = await axios.get(
          `https://directly-core.onrender.com/auth/verify-email?t=${token}`
        );

        if (response.status === 200) {
          setVerificationStatus("success");
          // Start the redirect timer only after successful verification
          setTimeout(() => {
            navigate("/signin");
          }, 5000);
        } else {
          throw new Error("Verification failed");
        }
      } catch (error) {
        setVerificationStatus("error");
        setError(
          error.response?.data?.message ||
            "Email verification failed. Please try again."
        );
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const renderContent = () => {
    switch (verificationStatus) {
      case "verifying":
        return (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6C31F6]"></div>
            </div>
            <h2 className="text-2xl md:text-3xl text-[#6C31F6] font-black mb-4">
              Verifying your email...
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your email address.
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl text-[#6C31F6] font-black mb-4">
              Email Verified Successfully!
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Your email has been verified successfully. You can now log in to
                your account.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to login page in 5 seconds...
              </p>
              <button
                onClick={() => navigate("/signin")}
                className="w-full p-3 text-white font-bold rounded bg-[#6C31F6] hover:bg-[#5826d9] transition-colors"
              >
                Proceed to Login
              </button>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 p-4 rounded-full">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl text-[#6C31F6] font-black mb-4">
              Verification Failed
            </h2>
            <div className="space-y-4">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => navigate("/signin")}
                className="w-full p-3 text-white font-bold rounded bg-[#6C31F6] hover:bg-[#5826d9] transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2">
        <AuthPageSideBar />
      </div>

      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-4 md:px-8 py-6 md:py-12">
        <div className="w-full max-w-lg">
          <img src={logo} alt="Logo" className="w-32 mb-8 md:hidden" />
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
