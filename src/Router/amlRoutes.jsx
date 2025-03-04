import { lazy, Suspense } from "react";

const AmlDashborad = lazy(() => import("../Pages/Dashborad/AmlDashboard"));

export const amlRoutes = [
  {
    path: "aml",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AmlDashborad />
      </Suspense>
    ),
  },
];

