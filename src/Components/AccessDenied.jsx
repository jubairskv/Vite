import { Link } from "react-router-dom";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Error from "../Assets/error5.json";

const AccessDenied = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-color-white font-roboto">
      <Player autoplay loop src={Error} className="w-[100%] max-w-sm h-auto" />
      <h1 className="text-2xl font-bold">Access Denied!</h1>
      <p className="text-sm font-bold">
        You must be logged in to view this page.
      </p>
      <Link
        to="/"
        className="bg-color-red text-color-white p-2 rounded mt-2 outline-none font-medium"
      >
        Back to login
      </Link>
    </div>
  );
};

export default AccessDenied;
