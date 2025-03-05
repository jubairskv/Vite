// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";
// import { setDeviceId } from "../Redux/AuthToken";

// const YourComponent = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const loadFingerprint = async () => {
//       const fp = await FingerprintJS.load();
//       const result = await fp.get();
//       const visitorId = result.visitorId;

//       dispatch(setDeviceId(visitorId)); // Ensure this action is dispatched
//     };

//     loadFingerprint();
//   }, [dispatch]);

//   return null; // or return some UI
// };

// export default YourComponent;
