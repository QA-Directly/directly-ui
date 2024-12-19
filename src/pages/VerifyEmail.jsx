// CheckEmailPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthPageSideBar from "../components/AuthPageSideBar";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("registeredEmail"); // Get email from registration

  // Clear the stored email after 5 minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("registeredEmail");
    }, 300000); // 5 minutes

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen md:w-5/4 border-2 flex flex-col  justify-center items-center">
      <img src={logo} alt="Logo" className="w-32 mb-8 md:hidden" />

      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-purple-100 p-4 rounded-full">
            <Mail className="w-8 h-8 text-[#6C31F6]" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl text-[#6C31F6] font-black mb-4">
          Verify your email
        </h2>

        <div className="mb-8">
          <p className="text-gray-600 mb-2">
            We've sent a verification link to:
          </p>
          <p className="font-medium text-gray-800"></p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Please check your email and click on the verification link to
            activate your account. If you don't see the email, check your spam
            folder.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="w-full p-3 text-[#6C31F6] font-bold rounded border-2 border-[#6C31F6] hover:bg-[#6C31F6] hover:text-white transition-colors"
          >
            Resend verification email
          </button>

          <div className="pt-4">
            <Link
              to="/signin"
              className="text-sm text-[#6C31F6] font-bold hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
