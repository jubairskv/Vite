
import SanctionListType from "../Components/Aml/Settings/SanctionType";
import RiskManagement from "../Components/RiskManagement/RiskManagement";
import DueDeligence from "../Components/RiskManagement/DueDeligence";
import AddDueDeligence from "../Components/RiskManagement/AddDueDeligence";



export const riskAssessmentRoutes = [
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