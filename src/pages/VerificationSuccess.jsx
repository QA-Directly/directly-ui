import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { CheckCircle } from "lucide-react";

const VerificationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-purple-100 p-4 rounded-full">
            <CheckCircle className="w-8 h-8 text-[#6C31F6]" />
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

export default VerificationSuccess;
