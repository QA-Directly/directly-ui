import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const VerificationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to signin page after 5 seconds
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Email Verified Successfully!
          </h2>
          <p className="mt-2 text-gray-600">
            Your email has been verified. You can now log in to your account.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Redirecting to login page in 5 seconds...
          </p>
          <button
            onClick={() => navigate("/signin")}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
