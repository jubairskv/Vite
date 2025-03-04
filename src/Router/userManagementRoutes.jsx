import { lazy, Suspense } from "react";
import {
  Profile,
  AddProfile,
  ViewProfile,
  EditProfile,
  AuthProfile,
  DeleteProfile,
} from "../Components/UserManagement/Profile/index";
import {
  User,
  AddUser,
  ViewUser,
  EditUser,
  AuthUser,
  DeleteUser,
} from "../Components/UserManagement/User/index";

const UserDashborad = lazy(() => import("../Pages/Dashborad/UserDashborad"));

export const userManagementRoutes = [
  {
    path: "usermanagement",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UserDashborad />
      </Suspense>
    ),
  },
  {
    path: "profile/:id",
    element: <Profile />,
  },
  {
    path: "addprofile",
    element: <AddProfile />,
  },
  {
    path: "editprofile",
    element: <EditProfile />,
  },
  {
    path: "profileview",
    element: <ViewProfile />,
  },
  {
    path: "authprofile/:id",
    element: <AuthProfile />,
  },
  {
    path: "editprofile/:id",
    element: <EditProfile />,
  },
  {
    path: "deleteprofile/:id",
    element: <DeleteProfile />,
  },
  {
    path: "user/:id",
    element: <User />,
  },
  {
    path: "adduser",
    element: <AddUser />,
  },
  {
    path: "edituser/:id",
    element: <EditUser />,
  },
  {
    path: "viewuser",
    element: <ViewUser />,
  },
  {
    path: "authuser/:id",
    element: <AuthUser />,
  },
  {
    path: "deleteuser/:id",
    element: <DeleteUser />,
  },
];
