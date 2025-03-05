import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddressTypeForm = ({ selectedAddressType, onSubmit, isSubmitting }) => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
    const [selectedCustomer, setSelectedCustomer] = useState("");
  const selectedCustomerType = useSelector(
    (store) => store.instaEnroll.cusTypeData
  );
  console.log("selected Customer type",selectedAddressType);
  

  useEffect(() => {
    if (selectedAddressType) {
      setDescription(selectedAddressType.description);
      setSelectedCustomer(selectedAddressType.customer_type);
      
    } else {
      setDescription("");
      setSelectedCustomer("")
    }
  }, [selectedAddressType]);
  console.log("Selected Customer: ", selectedCustomer);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      address_type_desc: description,
      address_type_id: selectedAddressType?.id,
      cust_type:selectedCustomer ? parseInt(selectedCustomer, 10) : null,

    };
    onSubmit(payload);
  };

  return (
    <div className="mt-4 ml-4 min-h-[80vh] mr-4 flex flex-col items-start ">
      <h1 className="text-2xl font-bold text-gray-800 flex">
        {selectedAddressType ? "Edit Address Type" : "Create Address Type"}
      </h1>
      <form 
        onSubmit={handleSubmit}
        className="relative w-full  bg-white rounded-lg space-y-8 mt-5 min-h-[80vh]"
        noValidate
      >
        {/* Description Input */}
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-stretch">
          <div className="flex flex-col items-start w-full lg:w-96">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Address Type
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value.toUpperCase())}
              className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out appearance-none"
              placeholder="Enter Description"
              required
              minLength="6"
            />
          </div>
        
        <div className="flex flex-col items-start w-full lg:w-96">
          <label htmlFor="customerType">
            Select Customer Type
          </label>
          <select 
          id="customerType"
          value={selectedCustomer}
          onChange={(e)=> setSelectedCustomer(e.target.value)}
          className="mt-1 p-3 text-gray-800 border border-blue-400 rounded-lg shadow-md focus:shadow-[3.4px_4px_0px_#0096FF] focus:border-b-4 focus:border-r-4 focus:border-blue-500 focus:outline-none w-full transition-all duration-200 ease-in-out"
          required>
            <option value=''>Select Customer</option>
            {selectedCustomerType &&
            selectedCustomerType.map((customer)=>(
              <option key={customer.id} value={customer.id}>
                {customer.type_name}
              </option>
            ))}

          </select>

        </div>
        </div>

        {/* Buttons */}
        <div className="relative md:absolute  bottom-4 right-4 flex justify-end gap-4 mt-8">
          <button
            type="submit"
            className={`py-2 px-6 bg-blue-500 text-white rounded-md transition ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : selectedAddressType
              ? "Save Changes"
              : "Submit"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/body/addresstype/:id")}
            className="mt-4 sm:mt-0 py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressTypeForm;
