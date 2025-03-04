import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Body from "../Body";
import Profile from "../Components/UserManagement/Profile/Profile";
import AddProfile from "../Components/UserManagement/Profile/AddProfile";
import EditProfile from "../Components/UserManagement/Profile/EditProfile";
import ProfileView from "../Components/UserManagement/Profile/ViewPage/ViewProfile";
import AuthProfile from "../Components/UserManagement/Profile/AuthProfile";
import User from "../Components/UserManagement/User/User";
import AddUser from "../Components/UserManagement/User/AddUser";
import EditUser from "../Components/UserManagement/User/EditUser";
import ViewUser from "../Components/UserManagement/User/ViewUser";
import AuthUser from "../Components/UserManagement/User/AuthUser";
import Settings from "../Components/InstaEnroll/Settingss/Settings";
import AccountType from "../Components/InstaEnroll/Settingss/AccountType/AccountType";
import AddAccountType from "../Components/InstaEnroll/Settingss/AccountType/AddAccountType";
import ViewModal from "../Components/InstaEnroll/Settingss/AccountType/ViewAccountType";
import Auth from "../Components/InstaEnroll/Settingss/AccountType/AuthAccountType";
import Edit from "../Components/InstaEnroll/Settingss/AccountType/EditAccountType";
import Delete from "../Components/InstaEnroll/Settingss/AccountType/DeleteAccountType";
import CustomerType from "../Components/InstaEnroll/Settingss/CustomerType/CustomerType";
import AddCustomerType from "../Components/InstaEnroll/Settingss/CustomerType/AddCustomerType";
import EditCustomerType from "../Components/InstaEnroll/Settingss/CustomerType/EditCustomerType";
import AuthCustomerType from "../Components/InstaEnroll/Settingss/CustomerType/AuthCustomerType";
import ViewCustomerType from "../Components/InstaEnroll/Settingss/CustomerType/ViewCustomerType";
import AccountSubType from "../Components/InstaEnroll/Settingss/AccountSubType/AccountSubType";
import AddAccountSubType from "../Components/InstaEnroll/Settingss/AccountSubType/AddAccountSubType";
import ViewAccountSubType from "../Components/InstaEnroll/Settingss/AccountSubType/ViewAccountSub";
import EditAccountSubType from "../Components/InstaEnroll/Settingss/AccountSubType/EditAccountSubType";
import AuthAccountSubType from "../Components/InstaEnroll/Settingss/AccountSubType/AuthAccountSubType";
import DeleteAccountSubType from "../Components/InstaEnroll/Settingss/AccountSubType/DeleteAccountSubType";
import ProofOfAddress from "../Components/InstaEnroll/Settingss/ProofOfAddress/ProofOfAddress";
import AddProofOfAddress from "../Components/InstaEnroll/Settingss/ProofOfAddress/AddProofOfAddress";
import EditProofOfAddress from "../Components/InstaEnroll/Settingss/ProofOfAddress/EditProofOfAddress";
import ViewProofOfAddress from "../Components/InstaEnroll/Settingss/ProofOfAddress/ViewProofOfAddress";
import AuthProofOfAddress from "../Components/InstaEnroll/Settingss/ProofOfAddress/AuthProofOfAddress";
import DeleteProofOfAddress from "../Components/InstaEnroll/Settingss/ProofOfAddress/DeleteProofOfAddress";
import BusinessNature from "../Components/InstaEnroll/Settingss/BusinessNature/BusinessNature";
import AddBusinessNature from "../Components/InstaEnroll/Settingss/BusinessNature/AddBusinessNature";
import EditBusinessNature from "../Components/InstaEnroll/Settingss/BusinessNature/EditBusinessNature";
import ViewBusinessNature from "../Components/InstaEnroll/Settingss/BusinessNature/ViewBusinesNature";
import AuthBusinessNature from "../Components/InstaEnroll/Settingss/BusinessNature/AuthBusinessNature";
import DeleteBusinessNature from "../Components/InstaEnroll/Settingss/BusinessNature/DeleteBusinessNature";
import Agent from "../Components/InstaEnroll/Agent/Agent";
import AddAgent from "../Components/InstaEnroll/Agent/AddAgent";
import EditAgent from "../Components/InstaEnroll/Agent/EditAgent";
import ViewAgent from "../Components/InstaEnroll/Agent/ViewAgent";
import AuthAgent from "../Components/InstaEnroll/Agent/AuthAgent";
import DeleteAgent from "../Components/InstaEnroll/Agent/DeleteAgent";
import Error from "../Components/Error";
import EditGender from "../Components/InstaEnroll/Settingss/Gender/EditGender";
import {
  Category,
  AddCategory,
  EditCategory,
  ViewCategory,
  AuthCategory,
  DeleteCategory,
} from "../Components/InstaEnroll/Settingss/Category/index";
import Gender from "../Components/InstaEnroll/Settingss/Gender/Gender";
import AddGender from "../Components/InstaEnroll/Settingss/Gender/AddGender";
import ViewGender from "../Components/InstaEnroll/Settingss/Gender/ViewGender";
import AuthGender from "../Components/InstaEnroll/Settingss/Gender/AuthGender";
import DeleteGender from "../Components/InstaEnroll/Settingss/Gender/DeleteGender";
import Disability from "../Components/InstaEnroll/Settingss/Disability/Disability";
import AddDisability from "../Components/InstaEnroll/Settingss/Disability/AddDisability";
import AuthDisability from "../Components/InstaEnroll/Settingss/Disability/AuthDisability";
import ViewDisability from "../Components/InstaEnroll/Settingss/Disability/ViewDisability";
import AddModeOfOperation from "../Components/InstaEnroll/Settingss/ModeOfOpertion/AddModeOfOperation";
import ModeOfOperation from "../Components/InstaEnroll/Settingss/ModeOfOpertion/ModeOfOpertion";
import ViewModeOfOperation from "../Components/InstaEnroll/Settingss/ModeOfOpertion/ViewModeOfOpertion";
import AuthModeOfOperation from "../Components/InstaEnroll/Settingss/ModeOfOpertion/AuthModeOfOpertion";
import Occupation from "../Components/InstaEnroll/Settingss/Occupation/Occupation";
import AddOccupation from "../Components/InstaEnroll/Settingss/Occupation/AddOccupation";
import EditOccupation from "../Components/InstaEnroll/Settingss/Occupation/EditOccupation";
import ViewOccupation from "../Components/InstaEnroll/Settingss/Occupation/ViewOccupation";
import AuthOccupation from "../Components/InstaEnroll/Settingss/Occupation/AuthOccupation";
import ProofOfIdentity from "../Components/InstaEnroll/Settingss/ProofOfIdentity/ProofOfIdentity";
import AddProofOfIdentity from "../Components/InstaEnroll/Settingss/ProofOfIdentity/AddProofOfIdentity";
import ViewproofOfIdentity from "../Components/InstaEnroll/Settingss/ProofOfIdentity/ViewProofOfIdentity";
import AuthProofOfIdentity from "../Components/InstaEnroll/Settingss/ProofOfIdentity/AuthProofofIdentity";
import PepOption from "../Components/InstaEnroll/Settingss/PepOption/PepOption";
import AddPepOption from "../Components/InstaEnroll/Settingss/PepOption/AddPepOption";
import ViewPepOption from "../Components/InstaEnroll/Settingss/PepOption/ViewPepOption";
import AuthPepOption from "../Components/InstaEnroll/Settingss/PepOption/AuthPepOption";
import Qualification from "../Components/InstaEnroll/Settingss/Qualification/Qualification";
import ViewQualification from "../Components/InstaEnroll/Settingss/Qualification/ViewQualification";
import AddQualification from "../Components/InstaEnroll/Settingss/Qualification/AddQualification";
import AuthQualification from "../Components/InstaEnroll/Settingss/Qualification/AuthQualification";
import Religion from "../Components/InstaEnroll/Settingss/Religion/Religion";
import AddReligion from "../Components/InstaEnroll/Settingss/Religion/AddReligion";
import AuthReligion from "../Components/InstaEnroll/Settingss/Religion/AuthReligion";
import ViewReligion from "../Components/InstaEnroll/Settingss/Religion/ViewReligion";
import Relationship from "../Components/InstaEnroll/Settingss/RelationShip/Relationship";
import AddRelationship from "../Components/InstaEnroll/Settingss/RelationShip/AddRelationship";
import ViewRelationship from "../Components/InstaEnroll/Settingss/RelationShip/ViewRelationship";
import AuthRelationship from "../Components/InstaEnroll/Settingss/RelationShip/AuthRelationship";
import SourcOfFund from "../Components/InstaEnroll/Settingss/SourceOfFound/SourceOfFund";
import AddSourceOfFund from "../Components/InstaEnroll/Settingss/SourceOfFound/AddSourceOfFund";
import ViewSourceOfFund from "../Components/InstaEnroll/Settingss/SourceOfFound/ViewSourceOfFund";
import AuthSourceOfFund from "../Components/InstaEnroll/Settingss/SourceOfFound/AuthSourceOfFund";
import DeleteOccupation from "../Components/InstaEnroll/Settingss/Occupation/DeleteOccupation";
import EditDisability from "../Components/InstaEnroll/Settingss/Disability/EditDisability";
import DeleteDisability from "../Components/InstaEnroll/Settingss/Disability/DeleteDisability";
import EditModeOfOperation from "../Components/InstaEnroll/Settingss/ModeOfOpertion/EditModeOfOperation";
import DeleteModeOfOperation from "../Components/InstaEnroll/Settingss/ModeOfOpertion/DeleteModeOfOperation";
import EditProofOfIdentity from "../Components/InstaEnroll/Settingss/ProofOfIdentity/EditProofOfIdentity";
import DeleteProofOfIdentity from "../Components/InstaEnroll/Settingss/ProofOfIdentity/DeleteProofOfIdentity";
import EditPepOption from "../Components/InstaEnroll/Settingss/PepOption/EditPepOption";
import DeletePepOption from "../Components/InstaEnroll/Settingss/PepOption/DeletePepOption";
import EditQualification from "../Components/InstaEnroll/Settingss/Qualification/EditQualification";
import DeleteQualification from "../Components/InstaEnroll/Settingss/Qualification/DeleteQualification";
import EditRelationship from "../Components/InstaEnroll/Settingss/RelationShip/EditRelationship";
import DeleteRelationship from "../Components/InstaEnroll/Settingss/RelationShip/DeleteRelationship";
import EditReligion from "../Components/InstaEnroll/Settingss/Religion/EditReligion";
import DeleteReligion from "../Components/InstaEnroll/Settingss/Religion/DeleteReligion";
import EditSourceOfFound from "../Components/InstaEnroll/Settingss/SourceOfFound/EditSourceOfFund";
import DeleteSourceOfFund from "../Components/InstaEnroll/Settingss/SourceOfFound/DeleteSourceOfFund";
import AddressType from "../Components/InstaEnroll/Settingss/AddressType/AddressType";
import AddAddressType from "../Components/InstaEnroll/Settingss/AddressType/AddAddressType";
import EditAddressType from "../Components/InstaEnroll/Settingss/AddressType/EditAddressType";
import AuthAddressType from "../Components/InstaEnroll/Settingss/AddressType/AuthAddressType";
import ViewAddressType from "../Components/InstaEnroll/Settingss/AddressType/ViewAddressType";
import DeleteAddressType from "../Components/InstaEnroll/Settingss/AddressType/DeleteAddressType";
import DeleteCustomertype from "../Components/InstaEnroll/Settingss/CustomerType/DeleteCustomerType";
import DeleteUser from "../Components/UserManagement/User/DeleteUser";
import DeleteProfile from "../Components/UserManagement/Profile/DeleteProfile";
import Customers from "../Components/Epurse/Customers/Customers";
import ViewCustomers from "../Components/InstaEnroll/Customer/ViewCustomer";
import Leads from "../Components/Epurse/Leads/Leads";
import ViewLeads from "../Components/Epurse/Leads/ViewLeads";
import Customer from "../Components/InstaEnroll/Customer/Customer";
import CustomerForm from "../Components/InstaEnroll/Customer/CustomerForm";
import Commission from "../Components/InstaEnroll/Settingss/Commmission/Commission";
import AddCommission from "../Components/InstaEnroll/Settingss/Commmission/AddCommission";
import EditCommission from "../Components/InstaEnroll/Settingss/Commmission/EditCommission";
import AuthCommission from "../Components/InstaEnroll/Settingss/Commmission/AuthCommission";
import ViewCommission from "../Components/InstaEnroll/Settingss/Commmission/ViewCommission";
import DeleteCommission from "../Components/InstaEnroll/Settingss/Commmission/DeleteCommission";
import ForgotPassword from "../Pages/Login/ForgotPassword";
import { v4 as uuidv4 } from "uuid";
import SanctionListType from "../Components/Aml/Settings/SanctionType";
import RiskManagement from "../Components/RiskManagement/RiskManagement";
import DueDeligence from "../Components/RiskManagement/DueDeligence";
import AddDueDeligence from "../Components/RiskManagement/AddDueDeligence";
import ProtectedRoute from "./ProtectRoute";
import { lazy, Suspense } from "react";

// Lazy Load Components for Better Performance
const Dashborad = lazy(() => import("../Pages/Dashborad/Dashborad"));
const UserDashborad = lazy(() => import("../Pages/Dashborad/UserDashborad"));
const InstaEnrollDashborad = lazy(() =>import("../Pages/Dashborad/InstaEnrollDashborad"));
const EpurseDashborad = lazy(() =>import("../Pages/Dashborad/EpurseDashborad"));
const AmlDashborad = lazy(() =>import("../Pages/Dashborad/AmlDashboard"));




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
      {
        path: "usermanagement",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserDashborad />
          </Suspense>
        ),
      },
      {
        path: "instaenroll",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <InstaEnrollDashborad />
          </Suspense>
        ),
      },
      {
        path: "epurse",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EpurseDashborad />
          </Suspense>
        ),
      },
      {
        path: "aml",
        element:(
          <Suspense fallback={<div>Loading...</div>}>
            <AmlDashborad />
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
        element: <ProfileView />,
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
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "accounttype/:id",
        element: <AccountType />,
      },
      {
        path: "addaccounttype",
        element: <AddAccountType />,
      },
      {
        path: "view",
        element: <ViewModal />,
      },
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "auth/:id",
        element: <Auth />,
      },
      {
        path: "delete/:id",
        element: <Delete />,
      },
      {
        path: `customertype/:id`,
        element: <CustomerType />,
      },
      {
        path: "addcustomertype",
        element: <AddCustomerType />,
      },
      {
        path: "editcustomertype/:id",
        element: <EditCustomerType />,
      },
      {
        path: "authcustomertype/:id",
        element: <AuthCustomerType />,
      },
      {
        path: "viewcustomertype/:id",
        element: <ViewCustomerType />,
      },
      {
        path: "deletecustomertype/:id",
        element: <DeleteCustomertype />,
      },
      {
        path: "accountsubtype/:id",
        element: <AccountSubType />,
      },
      {
        path: "addaccountsubtype",
        element: <AddAccountSubType />,
      },
      {
        path: "viewaccountsubtype",
        element: <ViewAccountSubType />,
      },
      {
        path: "editaccountsubtype/:id",
        element: <EditAccountSubType />,
      },
      {
        path: "deleteaccountsubtype/:id",
        element: <DeleteAccountSubType />,
      },
      {
        path: "authaccountsubtype/:id",
        element: <AuthAccountSubType />,
      },
      {
        path: "businessnature/:id",
        element: <BusinessNature />,
      },
      {
        path: "addbusinessnature",
        element: <AddBusinessNature />,
      },
      {
        path: "editbusinessnature/:id",
        element: <EditBusinessNature />,
      },
      {
        path: "deletebusinessnature/:id",
        element: <DeleteBusinessNature />,
      },

      {
        path: "viewbusinessnature/:id",
        element: <ViewBusinessNature />,
      },
      {
        path: "authbusinessnature/:id",
        element: <AuthBusinessNature />,
      },
      {
        path: "category/:id",
        element: <Category />,
      },
      {
        path: "addcategory",
        element: <AddCategory />,
      },
      {
        path: "editcatgeory/:id",
        element: <EditCategory />,
      },
      {
        path: "viewcategory/:id",
        element: <ViewCategory />,
      },
      {
        path: "authcategory/:id",
        element: <AuthCategory />,
      },
      {
        path: "deletecategory/:id",
        element: <DeleteCategory />,
      },
      {
        path: "gender/:id",
        element: <Gender />,
      },
      {
        path: "addgender",
        element: <AddGender />,
      },
      {
        path: "editgender/:id",
        element: <EditGender />,
      },
      {
        path: "viewgender/:id",
        element: <ViewGender />,
      },
      {
        path: "authgender/:id",
        element: <AuthGender />,
      },
      {
        path: "deletegender/:id",
        element: <DeleteGender />,
      },
      {
        path: "disability/:id",
        element: <Disability />,
      },
      {
        path: "adddisability",
        element: <AddDisability />,
      },
      {
        path: "editdisability/:id",
        element: <EditDisability />,
      },
      {
        path: "viewdisability/:id",
        element: <ViewDisability />,
      },
      {
        path: "authdisability/:id",
        element: <AuthDisability />,
      },
      {
        path: "deletedisability/:id",
        element: <DeleteDisability />,
      },
      {
        path: "modeofoperation/:id",
        element: <ModeOfOperation />,
      },
      {
        path: "addmodeofoperation",
        element: <AddModeOfOperation />,
      },
      {
        path: "viewmodeofoperation/:id",
        element: <ViewModeOfOperation />,
      },
      {
        path: "editmodeofoperation/:id",
        element: <EditModeOfOperation />,
      },
      {
        path: "authmodeofoperation/:id",
        element: <AuthModeOfOperation />,
      },
      {
        path: "deletemodeofoperation/:id",
        element: <DeleteModeOfOperation />,
      },
      {
        path: "occupation/:id",
        element: <Occupation />,
      },
      {
        path: "addoccupation",
        element: <AddOccupation />,
      },
      {
        path: "editoccupation/:id",
        element: <EditOccupation />,
      },
      {
        path: "viewoccupation/:id",
        element: <ViewOccupation />,
      },
      {
        path: "authoccupation/:id",
        element: <AuthOccupation />,
      },
      {
        path: "deleteoccupation/:id",
        element: <DeleteOccupation />,
      },
      {
        path: "proofofidentity/:id",
        element: <ProofOfIdentity />,
      },
      {
        path: "addproofofidentity",
        element: <AddProofOfIdentity />,
      },
      {
        path: "editproofofidentity/:id",
        element: <EditProofOfIdentity />,
      },
      {
        path: "viewproofofidentity/:id",
        element: <ViewproofOfIdentity />,
      },
      {
        path: "authproofofidentity/:id",
        element: <AuthProofOfIdentity />,
      },
      {
        path: "deleteproofofidentity/:id",
        element: <DeleteProofOfIdentity />,
      },
      {
        path: "pepoption/:id",
        element: <PepOption />,
      },
      {
        path: "addpepoption",
        element: <AddPepOption />,
      },
      {
        path: "editpepoption/:id",
        element: <EditPepOption />,
      },
      {
        path: "viewpepoption/:id",
        element: <ViewPepOption />,
      },
      {
        path: "authpepoption/:id",
        element: <AuthPepOption />,
      },
      {
        path: "deletepepoption/:id",
        element: <DeletePepOption />,
      },
      {
        path: "qualification/:id",
        element: <Qualification />,
      },
      {
        path: "addqualification",
        element: <AddQualification />,
      },
      {
        path: "editqualification/:id",
        element: <EditQualification />,
      },
      {
        path: "viewqualification/:id",
        element: <ViewQualification />,
      },
      {
        path: "authqualification/:id",
        element: <AuthQualification />,
      },
      {
        path: "deletequalification/:id",
        element: <DeleteQualification />,
      },
      {
        path: "religion/:id",
        element: <Religion />,
      },
      {
        path: "addreligion",
        element: <AddReligion />,
      },
      {
        path: "editreligion/:id",
        element: <EditReligion />,
      },
      {
        path: "viewreligion/:id",
        element: <ViewReligion />,
      },
      {
        path: "authreligion/:id",
        element: <AuthReligion />,
      },
      {
        path: "deletereligion/:id",
        element: <DeleteReligion />,
      },
      {
        path: "relationship/:id",
        element: <Relationship />,
      },
      {
        path: "addrelationship",
        element: <AddRelationship />,
      },
      {
        path: "editrelationship/:id",
        element: <EditRelationship />,
      },
      {
        path: "viewrelationship/:id",
        element: <ViewRelationship />,
      },
      {
        path: "authrelationship/:id",
        element: <AuthRelationship />,
      },
      {
        path: "deleterelationship/:id",
        element: <DeleteRelationship />,
      },
      {
        path: "sourceoffund/:id",
        element: <SourcOfFund />,
      },
      {
        path: "addsourceoffund",
        element: <AddSourceOfFund />,
      },
      {
        path: "editsourceoffund/:id",
        element: <EditSourceOfFound />,
      },
      {
        path: "viewsourceoffund/:id",
        element: <ViewSourceOfFund />,
      },
      {
        path: "authsourceoffund/:id",
        element: <AuthSourceOfFund />,
      },
      {
        path: "deletesourceoffund/:id",
        element: <DeleteSourceOfFund />,
      },

      {
        path: "commission/:id",
        element: <Commission />,
      },
      {
        path: "viewcommission/:id",
        element: <ViewCommission />,
      },
      {
        path: "addcommission",
        element: <AddCommission />,
      },
      {
        path: "editcommission/:id",
        element: <EditCommission />,
      },
      {
        path: "authcommission/:id",
        element: <AuthCommission />,
      },
      {
        path: "deletecommission/:id",
        element: <DeleteCommission />,
      },

      {
        path: "agent/:id",
        element: <Agent />,
      },
      {
        path: "viewagent",
        element: <ViewAgent />,
      },
      {
        path: "addagent",
        element: <AddAgent />,
      },
      {
        path: "editagent/:id",
        element: <EditAgent />,
      },
      {
        path: "authagent/:id",
        element: <AuthAgent />,
      },
      {
        path: "deleteagent/:id",
        element: <DeleteAgent />,
      },

      {
        path: "customer/:id",
        element: <Customer />,
      },
      {
        path: "addcustomer",
        element: <CustomerForm />,
      },
      {
        path: "viewcustomer",
        element: <ViewCustomers />,
      },

      {
        path: "proofofaddress/:id",
        element: <ProofOfAddress />,
      },
      {
        path: "addproofofaddress",
        element: <AddProofOfAddress />,
      },
      {
        path: "editproofofaddress/:id",
        element: <EditProofOfAddress />,
      },
      {
        path: "viewproofofaddress",
        element: <ViewProofOfAddress />,
      },
      {
        path: "authproofofaddress/:id",
        element: <AuthProofOfAddress />,
      },
      {
        path: "deleteproofofaddress/:id",
        element: <DeleteProofOfAddress />,
      },
      {
        path: "addresstype/:id",
        element: <AddressType />,
      },
      {
        path: "viewaddresstype/:id",
        element: <ViewAddressType />,
      },
      {
        path: "addaddresstype",
        element: <AddAddressType />,
      },
      {
        path: "editaddresstype/:id",
        element: <EditAddressType />,
      },
      {
        path: "authaddresstype/:id",
        element: <AuthAddressType />,
      },
      {
        path: "deleteaddresstype/:id",
        element: <DeleteAddressType />,
      },
      {
        path: "customers/:id",
        element: <Customers />,
      },
      {
        path: "viewcustomers",
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
    ],
  },
]);

console.log(`customertype${uuidv4()}`);

export default appRouter;
