import { createSlice } from "@reduxjs/toolkit";

const InstaEnrollSlice = createSlice({
  name: "instaEnroll",
  initialState: {
    accSubType: [],
    businessNature: [],
    accTypeSelectedItem: [],
    accSubTypeSelectedItem: [],
    custTypeSelectedItem: [],
    businessNatureSelectedItem: [],
    addressProof: [],
    addProofSelectedItem: [],
    globalActions: [],
    cusTypeData: [],
    commissionData: [],
    globalActionsId: [],
    category: [],
    categorySelectedItem: [],
    commissionSelectedItem: [],
    gender: [],
    genderSelectedItem: [],
    disability: [],
    disabilitySelectedItem: [],
    modeOfOperation: [],
    modeOfOperationSelectedItem: [],
    occupation: [],
    occupationSelectedItem: [],
    proofOfIdentity: [],
    proofOfIdentitySelectedItem: [],
    pepOption: [],
    pepOptionSelectedItem: [],
    qualification: [],
    qualificationSelectedItem: [],
    religion: [],
    religionSelectedItem: [],
    relationship: [],
    relationshipSelectedItem: [],
    sourceOfFund: [],
    sourceOfFundSelectedItem: [],
    addressType: [],
    addressTypeSelectedItem: [],
    customers: [],
    customerSelectedItem: [],
    agent: [],
    agentSelectedItem: [],
  },
  reducers: {
    setAccSubType: (state, action) => {
      // Add payload menuInf0 to items array
      state.accSubType = action.payload;
    },
    setCusTypeData: (state, action) => {
      state.cusTypeData = action.payload;
    },
    setCommssionData: (state, action) => {
      state.commissionData = action.payload;
    },
    setCustTypeSelectedItem: (state, action) => {
      state.custTypeSelectedItem = action.payload;
    },
    setBusinessNature: (state, action) => {
      state.businessNature = action.payload;
    },
    setBusinessNatureSelectedItem: (state, action) => {
      state.businessNatureSelectedItem = action.payload;
    },
    setAccTypeSelectedItem: (state, action) => {
      state.accTypeSelectedItem = action.payload;
    },
    setAccSubTypeSelectedItem: (state, action) => {
      state.accSubTypeSelectedItem = action.payload;
    },
    setAddressProof: (state, action) => {
      state.addressProof = action.payload;
    },
    setAddProofSelectedItem: (state, action) => {
      state.addProofSelectedItem = action.payload;
    },
    setGlobalActions: (state, action) => {
      state.globalActions = action.payload;
    },
    setGlobalActionsId: (state, action) => {
      state.globalActionsId = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCategorySelectedItem: (state, action) => {
      state.categorySelectedItem = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setGenderSelectedItem: (state, action) => {
      state.genderSelectedItem = action.payload;
    },
    setDisability: (state, action) => {
      state.disability = action.payload;
    },
    setDisabilitySelectedItem: (state, action) => {
      state.disabilitySelectedItem = action.payload;
    },
    setModeOfOperation: (state, action) => {
      state.modeOfOperation = action.payload;
    },
    setModeOfOperationSelectedItem: (state, action) => {
      state.modeOfOperationSelectedItem = action.payload;
    },
    setOccupation: (state, action) => {
      state.occupation = action.payload;
    },
    setOccupationSelectedItem: (state, action) => {
      state.occupationSelectedItem = action.payload;
    },
    setProofOfIdentity: (state, action) => {
      state.proofOfIdentity = action.payload;
    },
    setProofOfIdentitySelectedItem: (state, action) => {
      state.proofOfIdentitySelectedItem = action.payload;
    },
    setPepOption: (state, action) => {
      state.pepOption = action.payload;
    },
    setPepOptionSelectedItem: (state, action) => {
      state.pepOptionSelectedItem = action.payload;
    },
    setQualification: (state, action) => {
      state.qualification = action.payload;
    },
    setQualificationSelectedItem: (state, action) => {
      state.qualificationSelectedItem = action.payload;
    },
    setReligion: (state, action) => {
      state.religion = action.payload;
    },
    setReligionSelectedItem: (state, action) => {
      state.religionSelectedItem = action.payload;
    },
    setRelationship: (state, action) => {
      state.religion = action.payload;
    },
    setRelationshipSelectedItem: (state, action) => {
      state.relationshipSelectedItem = action.payload;
    },
    setSourceOfFund: (state, action) => {
      state.sourceOfFund = action.payload;
    },
    setSourceOfFundSelectedItem: (state, action) => {
      state.sourceOfFundSelectedItem = action.payload;
    },
    setAddressType: (state, action) => {
      state.addressType = action.payload;
    },
    setAddressTypeSelectedItem: (state, action) => {
      state.addressTypeSelectedItem = action.payload;
    },
    setAgent: (state, action) => {
      state.agent = action.payload;
    },
    setAgentSelectedItem: (state, action) => {
      state.agentSelectedItem = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setCustomersSelectedItem: (state, action) => {
      state.customerSelectedItem = action.payload;
    },
    setCommissionSelectedItem: (state, action) => {
      state.commissionSelectedItem = action.payload;
    },
    clearUserDataInsta: (state) => {
      state.accSubType = [];
      state.accTypeSelectedItem = [];
      state.accSubTypeSelectedItem = [];
      state.custTypeSelectedItem = [];
      state.globalActions = [];
      state.globalActionsId = [];
      state.cusTypeData = [];
      state.commissionData = [];
      state.custTypeSelectedItem = [];
      state.commissionSelectedItem = [];
      state.addressProof = [];
      state.addProofSelectedItem = [];
      state.businessNatureSelectedItem = [];
      state.businessNature = [];
      state.category = [];
      state.categorySelectedItem = [];
      state.gender = [];
      state.genderSelectedItem = [];
      state.disability = [];
      state.disabilitySelectedItem = [];
      state.modeOfOperation = [];
      state.modeOfOperationSelectedItem = [];
      state.occupation = [];
      state.occupationSelectedItem = [];
      state.proofOfIdentity = [];
      state.proofOfIdentitySelectedItem = [];
      state.pepOption = [];
      state.pepOptionSelectedItem = [];
      state.qualification = [];
      state.qualificationSelectedItem = [];
      state.religion = [];
      state.religionSelectedItem = [];
      state.relationship = [];
      state.relationshipSelectedItem = [];
      state.sourceOfFund = [];
      state.sourceOfFundSelectedItem = [];
      state.addressType = [];
      state.addressTypeSelectedItem = [];
      state.customers = [];
      state.customerSelectedItem = [];
      state.agent = [];
      state.agentSelectedItem = [];
    },
  },
});

export const {
  setAccSubType,
  setAccTypeSelectedItem,
  setGlobalActionsId,
  setGlobalActions,
  clearUserData,
  setAccSubTypeSelectedItem,
  setAddressProof,
  setAddProofSelectedItem,
  setCustTypeSelectedItem,
  setCusTypeData,
  setBusinessNatureSelectedItem,
  setBusinessNature,
  setCategory,
  setCategorySelectedItem,
  setGender,
  setGenderSelectedItem,
  setDisability,
  setDisabilitySelectedItem,
  setModeOfOperation,
  setModeOfOperationSelectedItem,
  setOccupation,
  setOccupationSelectedItem,
  setProofOfIdentity,
  setProofOfIdentitySelectedItem,
  setPepOption,
  setPepOptionSelectedItem,
  setQualification,
  setQualificationSelectedItem,
  setReligion,
  setReligionSelectedItem,
  setRelationship,
  setRelationshipSelectedItem,
  setSourceOfFund,
  setSourceOfFundSelectedItem,
  setAddressType,
  setAddressTypeSelectedItem,
  setCustomers,
  setCustomersSelectedItem,
  setAgent,
  setAgentSelectedItem,
  setCommissionSelectedItem,
  setCommssionData,
  clearUserDataInsta,
} = InstaEnrollSlice.actions;

export default InstaEnrollSlice.reducer;
