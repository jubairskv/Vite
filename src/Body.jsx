import React from "react";
import Header from "./Pages/Header/Header";
import Sidebar from "./Pages/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Body = () => {
  const user = useSelector((store) => store.user.items);
  if (!user) return null;
  return (
    <div className="flex flex-row bg-color-white">
      <Sidebar />
      <div className="flex flex-col flex-grow h-screen">
        <Header loginData={user} />
        <div className="flex-grow h-screen w-screen lg:w-full md:w-full  overflow-auto scrollbar  scrollbar-thumb-[#c5cff4] scrollbar-thumb-rounded-full scrollbar-w-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;
