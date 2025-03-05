import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Error from "../../../Assets/error6.json";

const ErrorUI = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-44">
      <Player autoplay loop src={Error} className="w-[10rem] max-w-sm h-auto" />
      <div className="text-error-color text-center mt-4">
        <p className="text-xl font-bold text-wrap">{message}</p>
      </div>
    </div>
  );
};

export default ErrorUI;
