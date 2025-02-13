import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [isEmailStep, setIsEmailStep] = useState(true);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        "https://directly-core.onrender.com/auth/forgot-password",
        {
          email,
        }
      );
      setSuccess("Reset instructions have been sent to your email!");
      setIsEmailStep(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        "https://directly-core.onrender.com/auth/reset-password",
        {
          token,
          newPassword,
        }
      );
      setSuccess(
        "Password successfully reset! You can now login with your new password."
      );
    } catch (error) {
      setError(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-4/5 bg-white flex flex-col p-4 mt-10 rounded-lg border-2 mb-10">
      <div className="w-full flex flex-row gap-2 justify-between items-center m-auto mt-8 p-8">
        <h2 className="text-2xl font-semibold">
          {isEmailStep ? "Forgot Password" : "Reset Password"}
        </h2>
      </div>

      {isEmailStep ? (
        <form onSubmit={handleEmailSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ash/40 border border-gray-300 rounded py-4 px-3 focus:outline-none focus:ring"
              required
            />
          </div>

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          {success && (
            <div className="mb-4 text-green-500 text-sm">{success}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full border-2 border-primary bg-primary p-2 rounded-lg text-lightText"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : (
              "Send Reset Instructions"
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <label
              htmlFor="token"
              className="block text-gray-700 font-medium mb-2"
            >
              Reset Token
            </label>
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full bg-ash/40 border border-gray-300 rounded py-4 px-3 focus:outline-none focus:ring"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-ash/40 border border-gray-300 rounded py-4 px-3 focus:outline-none focus:ring"
              required
            />
          </div>

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          {success && (
            <div className="mb-4 text-green-500 text-sm">{success}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full border-2 border-primary bg-primary p-2 rounded-lg text-lightText"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
