import React, { useState } from "react";
// import { API_TOKEN } from "../../../Utils/Constant";
import { useSelector } from "react-redux";

const CustomersForm = ({ onSubmit }) => {
  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  const token = useSelector((store) => store.token.token);
  console.log("token", token);

  const deviceId = useSelector((store) => store.token.deviceId);
  console.log(deviceId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      _name: Name,
      _pwd: password,
      commission_ids: [1, 2, 3], // Placeholder values for commissions
      mobile_no: mobileNumber,
      email_id: email,
    };
    console.log(payload);

    try {
      //const token = API_TOKEN;
      const apiUrl = "https://api-innovitegra.online/webadmin//add_";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Deviceid: deviceId,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData);
    } catch (error) {
      console.error("Error submitting  data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex  flex-col gap-x-24 p-10">
        {/*  Name Field */}
        <div className="mb-4 flex flex-col justify-start items-start">
          <label htmlFor="Name" className="mb-2">
            Name
          </label>
          <input
            type="text"
            id="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="w-80 border  p-2 rounded outline-none"
            placeholder="Enter  Name"
            required
            autoComplete="off"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4 flex flex-col justify-start items-start">
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-80 border  p-2 rounded outline-none"
            placeholder="Enter Password"
            required
            minLength="6"
            autoComplete="new-password"
          />
        </div>

        {/* Mobile Number Field */}
        <div className="mb-4 flex flex-col justify-start items-start">
          <label htmlFor="mobileNumber" className="mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-80 border  p-2 rounded outline-none"
            placeholder="Enter Mobile Number"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4 flex flex-col justify-start items-start">
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-80 border  p-2 rounded outline-none"
            placeholder="Enter Email"
            required
            autoComplete="off"
          />
        </div>

        <div className="flex justify-start items-start pt-5">
          <button
            type="submit"
            className="bg-gradient-to-br from-[#3d78b6] to-[#20205f] text-color-white py-2 px-4 rounded hover:bg-color-blue"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CustomersForm;
