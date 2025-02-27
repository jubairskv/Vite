import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { setDeviceId } from "../../Redux/AuthToken";
// import { useNavigate } from "react-router-dom";
// import { clearUserDataInsta } from "../../Redux/InstaEnrollSlice";
// import { clearUserDataUserManagement } from "../../Redux/UserManagement";
// import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Push the current path to history to trap the back button
    window.history.pushState(null, "", window.location.href);

    const handleBackNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, []);
 

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      dispatch(setDeviceId(result.visitorId));
      console.log(result.visitorId);
    };

    loadFingerprint();
  }, [dispatch]);

  return (
    <div className="text-lg font-roboto font-bold flex justify-center items-center">
      Dashboard
    </div>
  );
};

export default Dashboard;
