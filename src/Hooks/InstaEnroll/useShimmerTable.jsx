import React from "react";

const ShimmerTable = () => {
  return (
    <div className="bg-color-white  shadow-md p-2 mt-2 rounded-md">
      <div className="animate-pulse  mt-2 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex items-center">
            <div className="absolute left-2 text-color-dark-gray" />
            <div className=" bg-gray-200 shimmer outline-none border rounded p-2 pl-10 w-56 h-10" />
          </div>
        </div>

        <div className="relative w-full mt-0">
          <div className=" max-h-[32rem] overflow-y-auto scrollbar scrollbar-thumb-slate-400  scrollbar-thumb-rounded-full scrollbar-w-2">
            <table className="w-full   table-fixed">
              <thead className="bg-color-dim-gray sticky top-0 z-10">
                <tr className="">
                  <th className="text-base font-bold  text-color-header-dark-gray tracking-wider py-2 px-4">
                    <div className="h-8 bg-gray-200 shimmer rounded w-32 "></div>
                  </th>
                  <th className="font-bold text-color-header-dark-gray tracking-wider  py-2 px-4">
                    <div className="h-8 bg-gray-200 shimmer rounded w-32"></div>
                  </th>
                  <th className="text-base font-bold text-color-header-dark-gray tracking-wider  py-2 px-4">
                    <div className="h-8 bg-gray-200 shimmer rounded w-32"></div>
                  </th>
                  <th className="text-base font-bold text-color-header-dark-gray tracking-wider  py-2 px-4">
                    <div className="h-8 bg-gray-200 shimmer rounded w-32"></div>
                  </th>
                  <th className="text-base font-bold text-color-header-dark-gray tracking-wider  py-2 px-4">
                    <div className="h-8 bg-gray-200 shimmer rounded w-32"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-color-white divide-y divide-color-gray-200 ">
                {Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap  text-sm font-medium text-gray-900 py-2 px-4">
                      <div className="h-8 bg-gray-200 shimmer rounded w-32 "></div>
                    </td>
                    <td className="whitespace-nowrap  text-sm text-color-dark-gray py-2 px-4">
                      <div className="h-8 bg-gray-200 shimmer rounded w-32"></div>
                    </td>
                    <td className="whitespace-nowrap  text-sm text-color-dark-gray py-2 px-4 text-wrap">
                      <div className="h-8 bg-gray-200 shimmer rounded w-32"></div>
                    </td>
                    <td className="whitespace-nowrap text-sm  text-color-dark-gray py-2 px-4">
                      <div className="h-8 bg-gray-200 shimmer rounded w-32"></div>
                    </td>
                    <td className="whitespace-nowrap text-sm  text-color-dark-gray py-2 px-4">
                      <div className="h-8 bg-gray-200 shimmer rounded w-32"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerTable;
