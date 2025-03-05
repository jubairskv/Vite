import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Error from "../Assets/error6.json";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-44">
      <Player autoplay loop src={Error} className="w-52 max-w-sm h-auto" />
      <div className="text-error-color text-center mt-4">
        <h1>Oops! You're lost</h1>
        <p className="text-sm font-bold mb-4">
          The page you are looking for was not found
        </p>
        <Link to="/body" className="bg-error-color text-color-white p-2 rounded">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
