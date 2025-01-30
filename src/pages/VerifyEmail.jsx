import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthPageSideBar from "../components/AuthPageSideBar";
import logo from "../assets/logo.png";
import bgright from "../assets/bgright.png";
import axios from "axios";

const VerifyEmail = () => {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("registeredEmail");
    }, 300000);
    return () => clearTimeout(timer);
  }, []);

  const resendVerification = async () => {
    try {
      const email = location.state?.email;
      if (!email) {
        alert("Email not provided. Please register again.");
        return;
      }
      console.log(email);
      const response = await axios.post(
        "https://directly-core.onrender.com/auth/resend-verification",
        { email }
      );

      console.log(response.data);
      alert("Verification email resent successfully.");
    } catch (error) {
      console.error("Error resending verification:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row md:p-0">
      <div className="hidden md:flex md:w-1/2">
        <AuthPageSideBar />
      </div>
      <div className="absolute inset-0 md:hidden">
        <div className="w-full h-full flex fixed">
          <div className="w-1/2 bg-white"></div>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgright})` }}
          ></div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center relative m-auto border-2">
        <div className="w-full flex flex-col justify-center m-auto items-center">
          <img src={logo} alt="Logo" className="w-32 fixed top-0 md:hidden" />

          <div className="w-full md:w-4/5 text-center mt-14 mb-6">
            <h2 className="text-2xl md:text-3xl text-[#001F3F] font-black">
              Verify Email Address
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              A verification message has been sent to your email
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center p-4 ">
            <div className="flex justify-center mb-6">
              <Mail className="w-24 h-24 text-[#001F3F]" />
            </div>
          </div>
          <p
            className="bg-[#001F3F] w-1/2 text-center font-bold hover:underline p-2 text-white rounded-lg mb-8"
            onClick={() => resendVerification()}
          >
            Resend Email
          </p>
          <div className="w-full md:w-4/5 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <Link
              to="/signin"
              className="text-[#001F3F] font-bold hover:underline"
            >
              Back to Login
            </Link>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
