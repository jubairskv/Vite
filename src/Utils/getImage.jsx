import Account from "../Assets/Account Sub Type.svg";
import CustomerType from "../Assets/Customer Type.svg";
import AccountType from "../Assets/Account Type.svg";
import Gender from "../Assets/gender1.svg";
import BusinessNature from "../Assets/Business Nature.svg";
import CustomerCategory from "../Assets/Category.svg";
import Setting from "../Assets/Settings.svg";
import Agent from "../Assets/Agents.svg";
import Customer from "../Assets/Customers.svg";
import AddressType from "../Assets/Adress type.svg"
import AddressProof from "../Assets/Address Proof .svg"
import identityProof from "../Assets/Proof of Identity.svg"
import Disability from "../Assets/Disbility.svg"
import ModeofOperation from "../Assets/Mode of operation.svg"
import Occupation from "../Assets/Occupation.svg"
import PEPOption from "../Assets/PEP1.svg"
import Relationship from "../Assets/Relationship.svg"
import Qualification from "../Assets/Qualification.svg"
import Religion from "../Assets/Religion.svg"
import sourceOfFund from "../Assets/Source of Fund.svg"
import Profile from "../Assets/Profile.svg"
import User from "../Assets/User.svg"
import commission from "../Assets/Commission.svg"

const getImage = (menuName) => {
  const images = {
    "Account Type": Account,
    "Customer Type": CustomerType,
    "Gender": Gender,
    "Account SubType": AccountType,
    "Business Nature": BusinessNature,
    "Category": CustomerCategory,
    "Settings": Setting,
    "Agent": Agent,
    "Customer": Customer,
    "Address Type": AddressType,
    "Proof of Address": AddressProof,
    "Proof of Identity ": identityProof,
    "Disability": Disability,
    "Mode of Operation ": ModeofOperation,
    "Occupation ": Occupation,
    "PEP Option":PEPOption,
    "Relationship": Relationship,
    "Qualification": Qualification,
    "Religion": Religion,
    "Source of Fund ": sourceOfFund,
    "User":User,
    "Profile":Profile,
    "Customers":Customer,
    "Leads":Account,
    "Commission":commission,
  };

  return images[menuName] || null;
};

export default getImage;
