import React, { useState } from "react";
import { Link } from "react-router-dom";
import forgotpassowrd from "../../Assets/forgotpassowrd.json";
import { Player } from "@lottiefiles/react-lottie-player";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resetting password for:", email);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-screen px-4 lg:px-0">
      {/* Animation Div */}
      <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
        <Player autoplay loop src={forgotpassowrd} className="w-80 lg:w-96" />
      </div>

      {/* Form Div */}
      <div className="w-full lg:w-1/2 p-6">
        <h2 className="flex justify-center text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left">
          Forgot Your Password?
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-gray-600 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to sign-in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
