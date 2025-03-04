import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Body from "../Body";
import ForgotPassword from "../Pages/Login/ForgotPassword";
import Error from "../Components/Error";
import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./ProtectRoute";
import { riskAssessmentRoutes } from "./riskAssessementRoutes";
import { epurseRoutes } from "./epurseRoutes";
import {instaEnrollRoutes} from "./instaEnrollRoutes";
import { userManagementRoutes } from "./userManagementRoutes";
import { lazy, Suspense } from "react";

// Lazy Load Components for Better Performance
const Dashborad = lazy(() => import("../Pages/Dashborad/Dashborad"));



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/body",
    element: <ProtectedRoute element={<Body />} />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashborad />
          </Suspense>
        ),
      },
      ...instaEnrollRoutes,
      ...userManagementRoutes,
      ...epurseRoutes,
      ...riskAssessmentRoutes
    ],
  },
]);

console.log(`customertype${uuidv4()}`);

export default appRouter;
