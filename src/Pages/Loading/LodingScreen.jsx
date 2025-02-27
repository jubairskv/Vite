import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Loading from "../../Assets/LoadingAni2.json";

const LoadingScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading (e.g., fetching config, auth status)
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-44">
        <Player
          autoplay
          loop
          src={Loading}
          className="w-[100%] max-w-sm h-auto"
        />
        {/* <p className="text-md font-roboto font-extrabold">Loading...</p> */}
      </div>
    );
  }

  return children;
};

export default LoadingScreen;
