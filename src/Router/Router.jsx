import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Body from "../Body";
import ForgotPassword from "../Pages/Login/ForgotPassword";
import Error from "../Components/Error";
import ProtectedRoute from "./ProtectRoute";
import { riskAssessmentRoutes, epurseRoutes, instaEnrollRoutes, userManagementRoutes, amlRoutes } from "./index";
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
      ...amlRoutes,
      ...instaEnrollRoutes,
      ...userManagementRoutes,
      ...epurseRoutes,
      ...riskAssessmentRoutes
    ],
  },
]);


export default appRouter;
