import { lazy, Suspense } from "react";
import Customer from "../Components/Epurse/Customers/Customers";
import ViewCustomers from "../Components/InstaEnroll/Customer/ViewCustomer";
import Leads from "../Components/Epurse/Leads/Leads";
import ViewLeads from "../Components/Epurse/Leads/ViewLeads";


const EpurseDashborad = lazy(() => import("../Pages/Dashborad/EpurseDashborad"));

export const epurseRoutes = [
  {
    path: "epurse",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <EpurseDashborad />
      </Suspense>
    ),
  },
  {
    path: "customer/:id",
    element: <Customer />,
  },
//   {
//     path: "addcustomer",
//     element: <CustomerForm />,
//   },
  {
    path: "viewcustomer",
    element: <ViewCustomers />,
  },
  {
    path: "leads/:id",
    element: <Leads />,
  },
  {
    path: "viewleads",
    element: <ViewLeads />,
  },
];