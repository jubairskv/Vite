import AccessDenied from "../Components/AccessDenied";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ element }) => {
  // Access the token array from Redux store
  const loginData = useSelector((store) => store?.user?.items); 

  // Check if the token array is not empty
  return loginData && loginData.length > 0 ? element : <AccessDenied />;
};

export default PrivateRoutes;
