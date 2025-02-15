import { useState } from "react";
import facebook from "../assets/facebook.svg";
import google from "../assets/google.svg";

const SocialAuth = ({ action }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    // Redirect to the backend auth endpoint
    window.location.href = `https://directly-core.onrender.com/auth/${provider}`;
  };

  return (
    <div className="w-full flex flex-col justify-center gap-2 items-center">
      <div className="w-full flex flex-row justify-center items-center">
        <div className="w-1/2 border-t-2"></div>
        <p className="w-full text-center">Or {action} with</p>
        <div className="w-1/2 border-t-2"></div>
      </div>
      <div className="flex flex-row justify-centergap-8 items-center">
        <button
          onClick={() => handleSocialAuth("facebook")}
          disabled={isLoading}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          aria-label="Sign in with Facebook"
        >
          <img src={facebook} alt="Facebook" className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleSocialAuth("google")}
          disabled={isLoading}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          aria-label="Sign in with Google"
        >
          <img src={google} alt="Google" className="w-6 h-6" />
        </button>
      </div>
      {isLoading && (
        <div className="mt-2 text-sm text-gray-600">
          Redirecting to {action.toLowerCase()} page...
        </div>
      )}
    </div>
  );
};

export default SocialAuth;
