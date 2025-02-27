import {
  FaUserCog,
  FaCogs,
  FaUserEdit,
  FaTachometerAlt,
  FaUserShield,
} from "react-icons/fa";
import { RiProfileLine } from "react-icons/ri";
import { MdOutlineSupportAgent, MdPendingActions } from "react-icons/md";
import { FaBars, FaHandshakeSimple, FaCircleUser } from "react-icons/fa6";
import instaEnroll from "../Assets/InstaEnroll1.svg";
import ePurse from "../Assets/EPurse1.svg";
import UserManagement from "../Assets/User Management.svg";
import ModuleIcon from "../Assets/Module.svg";
import Setting from "../Assets/Settings.svg";
import Agent from "../Assets/Agents.svg";
import Customer from "../Assets/Customers.svg";
import Profile from "../Assets/Profile.svg";
import RiskMangement from "../Assets/Risk  Management.svg"
import Aml from "../Assets/aml.png"

const getIcon = (menuName) => {
  switch (menuName) {
    case "Modules":
      return <img src={ModuleIcon} alt="ModuleIcon" className="mr-2 w-6 h-5 text-black" />;
    case "Dashboard":
      return <FaTachometerAlt className="mr-2" />;
    case "InstaEnroll":
      return (
        <img src={instaEnroll} alt="InstaEnroll" className="mr-2 w-6 h-6" />
      );
    case "ePurse":
      return <img src={ePurse} alt="ePurse" className="mr-2 w-6 h-6" />;
    case "Settings":
      return (
        <img src={Setting} alt="InstaEnroll" className="mr-2 w-6 h-6" />
      );
    case "Agent":
      return (
        <img src={Agent} alt="InstaEnroll" className="mr-2 w-6 h-6" />
      );
    case "Customer":
      return (
        <img src={Customer} alt="InstaEnroll" className="mr-2 w-6 h-6" />
      );
      case "Risk Assessment":
        return (
          <img src={RiskMangement} alt="InstaEnroll" className="mr-2 w-6 h-6" />
        );
    case "Customers":
      return (
        <img src={Customer} alt="InstaEnroll" className="mr-2 w-6 h-6" />
      );
    case "Leads":
      return <MdPendingActions className="mr-2" />;
    case "Profile":
      return (
        <img src={Profile} alt="InstaEnroll" className="mr-2 w-6 h-6" />
      );
      case "AML":
        return(
          <img src={Aml} alt="aml" className="mr-2 w-6 h-6" />
        )
    case "User":
      return (
        <img
          src={UserManagement}
          alt="UserManagement"
          className="mr-2 w-6 h-6"
        />
      );
    default:
      return null;
  }
};

export default getIcon;
