import { lazy, Suspense } from "react";
import SanctionListType from "../Components/Aml/Settings/SanctionType";
import RiskManagement from "../Components/RiskManagement/RiskManagement";
import DueDeligence from "../Components/RiskManagement/DueDeligence";
import AddDueDeligence from "../Components/RiskManagement/AddDueDeligence";

const AmlDashborad = lazy(() => import("../Pages/Dashborad/AmlDashboard"));

export const riskAssessmentRoutes = [
  {
    path: "aml",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AmlDashborad />
      </Suspense>
    ),
  },
  {
    path: "sanctionlisttype",
    element: <SanctionListType />,
  },
  {
    path: "riskassessment",
    element: <RiskManagement />,
  },
  {
    path: "dueDeligence",
    element: <DueDeligence />,
  },
  {
    path: "addDueDeligence",
    element: <AddDueDeligence />,
  },
];