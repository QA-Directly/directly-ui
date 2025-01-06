import { CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";
import AuthPageSideBar from "../components/AuthPageSideBar";
import logo from "../assets/logo.png";
import bgright from "../assets/bgright.png";

const ForgotPasswordSuccess = () => {
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
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center relative">
        <div className="w-full">
          <img src={logo} alt="Logo" className="w-32 fixed top-0 md:hidden" />

          <div className="w-full md:w-4/5 text-center mt-14 mb-6">
            <h2 className="text-2xl md:text-3xl text-[#001F3F] font-black">
              Password Reset
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              We sent password reset instructions to paul234@gmail.com
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center p-4">
            <div className="flex justify-center items-center mb-8">
              <CircleCheck className="bg-[#1FBA0B] w-16 h-16 text-white rounded-full p-2" />
            </div>

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
    </div>
  );
};

export default ForgotPasswordSuccess;
