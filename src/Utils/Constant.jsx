export const MAIN_API_URL = import.meta.env.VITE_PROD_BASE_URL;

console.log("VITE_PROD_BASE_URL:", import.meta.env.VITE_PROD_BASE_URL);
// export const MAIN_API_URL = 'http://192.168.1.20:8045'
// export const Risk_URL = process.env.REACT_APP_PROD_BASE_URL
export const RISK_URL = import.meta.env.VITE_PROD_BASE_URL;
export const API_URL = `${MAIN_API_URL}/webadmin/user/user_login`;

export const REFRESH_TOEKN_API = `${MAIN_API_URL}/webadmin/user/refresh_token`;

// console.log("Development URL:", process.env.REACT_APP_DEV_BASE_URL);
// console.log("Production URL:", process.env.REACT_APP_PROD_BASE_URL);
// console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(MAIN_API_URL);

export const GET_MODULE_API_URL = MAIN_API_URL + "/webadmin/common/get_modules";

export const VIEW_INSTITUTION = MAIN_API_URL + "/webadmin/inst/view_inst";

export const PROFILE_VIEW = MAIN_API_URL + "/webadmin/profiles/list_profiles";
export const PROFILE_AUTH = MAIN_API_URL + "/webadmin/profiles/auth_profile";
export const PROFILE_GET = MAIN_API_URL + "/webadmin/profiles/get_profile";
export const PROFILE_DEAUTH =
  MAIN_API_URL + "/webadmin/profiles/deauth_profile";
export const PROFILE_ADD = MAIN_API_URL + "/webadmin/profiles/add_profile";
export const PROFILE_EDIT = MAIN_API_URL + "/webadmin/profiles/edit_profile";
export const PROFILE_DELETE =
  MAIN_API_URL + "/webadmin/profiles/delete_profile";
export const PROFILE_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/profiles/delete_auth_profile";

export const USER_VIEW = MAIN_API_URL + "/webadmin/user/list_users";
export const USER_AUTH = MAIN_API_URL + "/webadmin/user/auth_user";
export const USER_DEAUTH = MAIN_API_URL + "/webadmin/user/deauth_user";
export const USER_ADD = MAIN_API_URL + "/webadmin/user/add_user";
export const USER_EDIT = MAIN_API_URL + "/webadmin/user/edit_user";
export const USER_DELETE = MAIN_API_URL + "/webadmin/user/delete_user";
export const USER_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/user/delete_auth_user";

//ACCOUNT TYPE APIs
export const ACCOUNT_TYPE_EDIT =
  MAIN_API_URL + "/webadmin/configuration/accttype/edit_accttype";
export const ACCOUNT_TYPE_ADD =
  MAIN_API_URL + "/webadmin/configuration/accttype/add_accttype";
export const ACCOUNT_TYPE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/accttype/auth_accttype";
export const ACCOUNT_TYPE_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/accttype/deauth_accttype";
export const ACCOUNT_TYEP_VIEW =
  MAIN_API_URL + "/webadmin/configuration/accttype/get_accttype";
export const ACCOUNT_TYPE_DELETE =
  MAIN_API_URL + "/webadmin/configuration/accttype/delete_accttype";
export const ACCOUNT_TYPE_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/accttype/delete_accttype_auth";

//CUSTOMER TYPE APIs
export const CUSTOMER_TYPE_VIEW =
  MAIN_API_URL + "/webadmin/configuration/custtype/get_custtype";
export const CUSTOMER_TYPE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/custtype/auth_custtype";
export const CUSTOMER_TYPE_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/custtype/deauth_custtype";
export const CUSTOMER_TYPE_ADD =
  MAIN_API_URL + "/webadmin/configuration/custtype/add_custtype";
export const CUSTOMER_TYPE_EDIT =
  MAIN_API_URL + "/webadmin/configuration/custtype/edit_custtype";
export const CUSTOMER_TYPE_DELETE =
  MAIN_API_URL + "/webadmin/configuration/custtype/delete_custtype";
export const CUSTOMER_TYPE_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/custtype/delete_auth_custtype";

//ACCOUNT SUB TYPE APIs
export const ACCOUNT_SUB_TYPE_VIEW =
  MAIN_API_URL + "/webadmin/configuration/acctsubtype/get_acctsubtype";
export const ACCOUNT_SUB_TYPE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/acctsubtype/auth_acctsubtype";
export const ACCOUNT_SUB_TYPE_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/acctsubtype/deauth_acctsubtype";
export const ACCOUNT_SUB_TYPE_ADD =
  MAIN_API_URL + "/webadmin/configuration/acctsubtype/add_acctsubtype";
export const ACCOUNT_SUB_TYPE_EDIT =
  MAIN_API_URL + "/webadmin/configuration/acctsubtype/edit_acctsubtype";
export const ACCOUNT_SUB_TYPE_DELETE =
  MAIN_API_URL + "/webadmin/configuration/acctsubtype/delete_acctsubtype";
export const ACCOUNT_SUB_TYPE_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/acctsubtype/delete_acctsubtype_auth";

//Business APIs:
export const BUSINESS_VIEW =
  MAIN_API_URL + "/webadmin/configuration/business/get_business";
export const BUSINESS_ADD =
  MAIN_API_URL + "/webadmin/configuration/business/add_business";
export const BUSINESS_EDIT =
  MAIN_API_URL + "/webadmin/configuration/business/edit_business";
export const BUSINESS_AUTH =
  MAIN_API_URL + "/webadmin/configuration/business/auth_business";
export const BUSINESS_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/business/deauth_business";
export const BUSINEES_DELETE =
  MAIN_API_URL + "/webadmin/configuration/business/delete_business";
export const BUSINEES_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/business/delete_auth_business";

//PROOFOFADDRESS APIs
export const PROOF_OF_ADDRESS_VIEW =
  MAIN_API_URL + "/webadmin/configuration/addrproof/get_addrproof";
export const PROOF_OF_ADDRESS_ADD =
  MAIN_API_URL + "/webadmin/configuration/addrproof/add_addrproof";
export const PROOF_OF_ADDRESS_EDIT =
  MAIN_API_URL + "/webadmin/configuration/addrproof/edit_addrproof";
export const PROOF_OF_ADDRESS_AUTH =
  MAIN_API_URL + "/webadmin/configuration/addrproof/auth_addrproof";
export const PROOF_OF_ADDRESS_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/addrproof/deauth_addrproof";
export const PROOF_OF_ADDRESS_DELETE =
  MAIN_API_URL + "/webadmin/configuration/addrproof/delete_addrproof";
export const PROOF_OF_ADDRESS_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/addrproof/delete_auth_addrproof";

//Category APIs:
export const CATEGORY_VIEW =
  MAIN_API_URL + "/webadmin/configuration/category/get_category";
export const CATEGORY_ADD =
  MAIN_API_URL + "/webadmin/configuration/category/add_category";
export const CATEGORY_EDIT =
  MAIN_API_URL + "/webadmin/configuration/category/edit_category";
export const CATEGORY_AUTH =
  MAIN_API_URL + "/webadmin/configuration/category/auth_category";
export const CATEGORY_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/category/deauth_category";
export const CATEGORY_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/category/delete_auth_category";
export const CATEGORY_DELETE =
  MAIN_API_URL + "/webadmin/configuration/category/delete_category";

//Gender APIsL:
export const GENDER_VIEW =
  MAIN_API_URL + "/webadmin/configuration/gender/get_gender";
export const GENDER_ADD =
  MAIN_API_URL + "/webadmin/configuration/gender/add_gender";
export const GENDER_EDIT =
  MAIN_API_URL + "/webadmin/configuration/gender/edit_gender";
export const GENDER_AUTH =
  MAIN_API_URL + "/webadmin/configuration/gender/auth_gender";
export const GENDER_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/gender/deauth_gender";
export const GENDER_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/gender/delete_auth_gender";
export const GENDER_DELETE =
  MAIN_API_URL + "/webadmin/configuration/gender/delete_gender";

//Disability APIs:
export const DISABILITY_VIEW =
  MAIN_API_URL + "/webadmin/configuration/disability/get_disability";
export const DISABILITY_ADD =
  MAIN_API_URL + "/webadmin/configuration/disability/add_disability";
export const DISABILITY_EDIT =
  MAIN_API_URL + "/webadmin/configuration/disability/edit_disability";
export const DISABILITY_AUTH =
  MAIN_API_URL + "/webadmin/configuration/disability/auth_disability";
export const DISABILITY_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/disability/deauth_disability";
export const DISABILITY_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/disability/delete_auth_disability";
export const DISABILITY_DELETE =
  MAIN_API_URL + "/webadmin/configuration/disability/delete_disability";

//Mode of opertion APIs
export const MODE_OF_OPERATION_VIEW =
  MAIN_API_URL + "/webadmin/configuration/modeofopr/get_modeofoperation";
export const MODE_OF_OPERATION_ADD =
  MAIN_API_URL + "/webadmin/configuration/modeofopr/add_modeofoperation";
export const MODE_OF_OPERATION_EDIT =
  MAIN_API_URL + "/webadmin/configuration/modeofopr/edit_modeofoperation";
export const MODE_OF_OPERATION_AUTH =
  MAIN_API_URL + "/webadmin/configuration/modeofopr/auth_modeofoperation";
export const MODE_OF_OPERATION_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/modeofopr/deauth_modeofoperation";
export const MODE_OF_OPERATION_DELETE_AUTH =
  MAIN_API_URL +
  "/webadmin/configuration/modeofopr/delete_auth_modeofoperation";
export const MODE_OF_OPERATION_DELETE =
  MAIN_API_URL + "/webadmin/configuration/modeofopr/delete_modeofoperation";

//ocupation APIs
export const OCCUPATION_VIEW =
  MAIN_API_URL + "/webadmin/configuration/occupation/get_occupation";
export const OCCUPATION_ADD =
  MAIN_API_URL + "/webadmin/configuration/occupation/add_occupation";
export const OCCUPATION_EDIT =
  MAIN_API_URL + "/webadmin/configuration/occupation/edit_occupation";
export const OCCUPATION_AUTH =
  MAIN_API_URL + "/webadmin/configuration/occupation/auth_occupation";
export const OCCUPATION_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/occupation/deauth_occupation";
export const OCCUPATION_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/occupation/delete_auth_occupation";
export const OCCUPATION_DELETE =
  MAIN_API_URL + "/webadmin/configuration/occupation/delete_occupation";

//IDproof APIS
export const PROOF_OF_IDENTITY_VIEW =
  MAIN_API_URL + "/webadmin/configuration/idproof/get_idproof";
export const PROOF_OF_IDENTITY_ADD =
  MAIN_API_URL + "/webadmin/configuration/idproof/add_idproof";
export const PROOF_OF_IDENTITY_EDIT =
  MAIN_API_URL + "/webadmin/configuration/idproof/edit_idproof";
export const PROOF_OF_IDENTITY_AUTH =
  MAIN_API_URL + "/webadmin/configuration/idproof/auth_idproof";
export const PROOF_OF_IDENTITY_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/idproof/deauth_idproof";
export const PROOF_OF_IDENTITY_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/idproof/delete_auth_idproof";
export const PROOF_OF_IDENTITY_DELETE =
  MAIN_API_URL + "/webadmin/configuration/idproof/delete_idproof";

//PepOption APIs
export const PEP_OPTION_VIEW =
  MAIN_API_URL + "/webadmin/configuration/pep/get_pep";
export const PEP_OPTION_ADD =
  MAIN_API_URL + "/webadmin/configuration/pep/add_pep";
export const PEP_OPTION_EDIT =
  MAIN_API_URL + "/webadmin/configuration/pep/edit_pep";
export const PEP_OPTION_AUTH =
  MAIN_API_URL + "/webadmin/configuration/pep/auth_pep";
export const PEP_OPTION_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/pep/deauth_pep";
export const PEP_OPTION_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/pep/delete_auth_pep";
export const PEP_OPTION_DELETE =
  MAIN_API_URL + "/webadmin/configuration/pep/delete_pep";

//Qualification  APIs
export const QUALIFICATION_VIEW =
  MAIN_API_URL + "/webadmin/configuration/qualification/get_qualification";
export const QUALIFICATION_ADD =
  MAIN_API_URL + "/webadmin/configuration/qualification/add_qualification";
export const QUALIFICATION_EDIT =
  MAIN_API_URL + "/webadmin/configuration/qualification/edit_qualification";
export const QUALIFICATION_AUTH =
  MAIN_API_URL + "/webadmin/configuration/qualification/auth_qualification";
export const QUALIFICATION_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/qualification/deauth_qualification";
export const QUALIFICATION_DELETE_AUTH =
  MAIN_API_URL +
  "/webadmin/configuration/qualification/delete_auth_qualification";
export const QUALIFICATION_DELETE =
  MAIN_API_URL + "/webadmin/configuration/qualification/delete_qualification";

//Religion APIs
export const RELIGION_VIEW =
  MAIN_API_URL + "/webadmin/configuration/religion/get_religion";
export const RELIGION_ADD =
  MAIN_API_URL + "/webadmin/configuration/religion/add_religion";
export const RELIGION_EDIT =
  MAIN_API_URL + "/webadmin/configuration/religion/edit_religion";
export const RELIGION_AUTH =
  MAIN_API_URL + "/webadmin/configuration/religion/auth_religion";
export const RELIGION_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/religion/deauth_religion";
export const RELIGION_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/religion/delete_auth_religion";
export const RELIGION_DELETE =
  MAIN_API_URL + "/webadmin/configuration/religion/delete_religion";

//Relationship APIs
export const RELATIONSHIP_VIEW =
  MAIN_API_URL + "/webadmin/configuration/relationship/get_relationship";
export const RELATIONSHIP_ADD =
  MAIN_API_URL + "/webadmin/configuration/relationship/add_relationship";
export const RELATIONSHIP_EDIT =
  MAIN_API_URL + "/webadmin/configuration/relationship/edit_relationship";
export const RELATIONSHIP_AUTH =
  MAIN_API_URL + "/webadmin/configuration/relationship/auth_relationship";
export const RELATIONSHIP_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/relationship/deauth_relationship";
export const RELATIONSHIP_DELETE_AUTH =
  MAIN_API_URL +
  "/webadmin/configuration/relationship/delete_auth_relationship";
export const RELATIONSHIP_DELETE =
  MAIN_API_URL + "/webadmin/configuration/relationship/delete_relationship";

//sourceoffund APIs
export const SOURCE_OF_FOUND_VIEW =
  MAIN_API_URL + "/webadmin/configuration/srcfund/get_srcfund";
export const SOURCE_OF_FUND_ADD =
  MAIN_API_URL + "/webadmin/configuration/srcfund/add_srcfund";
export const SOURCE_OF_FUND_EDIT =
  MAIN_API_URL + "/webadmin/configuration/srcfund/edit_srcfund";
export const SOURCE_OF_FUND_AUTH =
  MAIN_API_URL + "/webadmin/configuration/srcfund/auth_srcfund";
export const SOURCE_OF_FUND_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/srcfund/deauth_srcfund";
export const SOURCE_OF_FUND_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/srcfund/delete_auth_srcfund";
export const SOURCE_OF_FUND_DELETE =
  MAIN_API_URL + "/webadmin/configuration/srcfund/delete_srcfund";

//Address Type:
export const ADDRESS_TYPE_VIEW =
  MAIN_API_URL + "/webadmin/configuration/addresstype/get_addresstype";
export const ADDRESS_TYPE_ADD =
  MAIN_API_URL + "/webadmin/configuration/addresstype/add_addresstype";
export const ADDRESS_TYPE_EDIT =
  MAIN_API_URL + "/webadmin/configuration/addresstype/edit_addresstype";
export const ADDRESS_TYPE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/addresstype/auth_addresstype";
export const ADDRESS_TYPE_DEAUTH =
  MAIN_API_URL + "/webadmin/configuration/addresstype/deauth_addresstype";
export const ADDRESS_TYPE_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/configuration/addresstype/del_auth_addresstype";
export const ADDRESS_TYPE_DELETE =
  MAIN_API_URL + "/webadmin/configuration/addresstype/delete_addresstype";

//commission:
export const COMMISSION_VIEW =
  MAIN_API_URL + "/webadmin/commission/get_commission";
export const COMMISSION_ADD =
  MAIN_API_URL + "/webadmin/commission/add_commission";
export const COMMISSION_EDIT =
  MAIN_API_URL + "/webadmin/commission/edit_commission";
export const COMMISSION_AUTH =
  MAIN_API_URL + "/webadmin/commission/auth_commission";
export const COMMISSION_DEAUTH =
  MAIN_API_URL + "/webadmin/commission/deauth_commission";
export const COMMISSION_DELETE =
  MAIN_API_URL + "/webadmin/commission/delete_commission";

export const COMMISSION_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/commission/delete_auth_commission";

//Instaenroll:

//Customers - Instaenroll:
export const CUSTOMERS_VIEW =
  MAIN_API_URL + "/webadmin/customer/registration/get_admincust";

//Agents:
export const AGENT_VIEW = MAIN_API_URL + "/webadmin/agent/get_agents";
export const AGENT_ADD = MAIN_API_URL + "/webadmin/agent/add_agent";
export const AGENT_EDIT = MAIN_API_URL + "/webadmin/agent/edit_agent";
export const AGENT_AUTH = MAIN_API_URL + "/webadmin/agent/auth_agent";
export const AGENT_DEAUTH = MAIN_API_URL + "/webadmin/agent/deauth_agent";
export const AGENT_DELETE = MAIN_API_URL + "/webadmin/agent/delete_agent";
export const AGENT_DELETE_AUTH =
  MAIN_API_URL + "/webadmin/agent/delete_auth_agent";

//Customers - Epurse:
export const CUSTOMERS_EPURSE_VIEW =
  MAIN_API_URL + "/webadmin/customer/webcust/get_webcust";

//Leads - Epurse:
export const LEADS_EPURSE_VIEW =
  MAIN_API_URL + "/webadmin/customer/webcust/get_webcust";

//Risk Management
export const criterialist = RISK_URL + "/riskAnalyzer/master_criteria/view";
export const customer_type = RISK_URL + "/riskAnalyzer/master_cust_type/view";
export const createRiskScore = RISK_URL + "/riskAnalyzer/risk_level/save";
export const viewRiskScore = RISK_URL + "/riskAnalyzer/risk_master_level/view";
export const riskLevels = RISK_URL + "/riskAnalyzer/risk_master_level/view";
export const getRiskLevel = RISK_URL + "/riskAnalyzer/risk_level/view";
export const fetchCriteriaData =
  RISK_URL + "/riskAnalyzer/criteria_fields/view";
export const createDueDeligence = RISK_URL + "/riskAnalyzer/risk_criteria/save";
export const riskCriteriaList = RISK_URL + "/riskAnalyzer/risk_criteria/view";
export const getriskCriteriaByID =
  RISK_URL + "/riskAnalyzer/risk_sub_criteria/view";
export const DELETE_CRITERIA = RISK_URL + "/riskAnalyzer/risk_criteria/delete";
export const GET_CRITERIADATA_BYID =
  RISK_URL + "/riskAnalyzer/risk_master_criteria/view";
export const UPDATE_CRITERIA = RISK_URL + "/riskAnalyzer/risk_criteria/update";
export const weightageValidation =
  RISK_URL + "/riskAnalyzer/risk_criteria_stats/fetch";
export const CRITERIA_STATUS_UPDATE =
  RISK_URL + "/riskAnalyzer/risk_criteria/update_status";
//risk management basicauth
const username = "webadmin";
const pwd = "4970FAB298E271E430010235E9C88EA5E467DEEF";
export const basicAuth = "Basic " + btoa(username + ":" + pwd);
