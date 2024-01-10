import React from "react";
import { Button } from "./ui/button";
import Container from "./ui/container";

export default function CompanyTable() {
  return (
    <Container>
      <div className="pt-6 pb-8 rounded-xl bg-gray-900 my-24">
        <div className="px-6">
          <div className="mb-6">
            <h4 className="text-lg text-gray-100 font-semibold mb-6">Users</h4>
          </div>
          <div className="w-full pb-6 overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="text-left">
                  <th className="p-0">
                    <div className="flex items-center h-11 py-3 px-6 rounded-l-xl bg-gray-800">
                      <label className="ml-2 text-xs text-gray-300 font-semibold">
                        NAME
                      </label>
                    </div>
                  </th>
                  <th className="p-0">
                    <div className="flex items-center h-11 py-3 px-6 bg-gray-800">
                      <span className="text-xs text-gray-300 font-semibold">
                        COMPANY
                      </span>
                    </div>
                  </th>
                  <th className="p-0">
                    <div className="flex items-center h-11 py-3 px-6 bg-gray-800">
                      <span className="text-xs text-gray-300 font-semibold">
                        ROLE
                      </span>
                    </div>
                  </th>
                  <th className="p-0">
                    <div className="flex items-center h-11 py-3 px-6 bg-gray-800">
                      <span className="text-xs text-gray-300 font-semibold">
                        STATUS
                      </span>
                    </div>
                  </th>
                  <th className="p-0">
                    <div className="flex items-center h-11 py-3 px-6 rounded-r-xl bg-gray-800">
                      <span className="text-xs text-gray-300 font-semibold">
                        ACTIONS
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-0">
                    <div className="flex items-center h-16 px-6">
                      <div className="flex h-full items-center">
                        <img
                          className="w-8 h-8 mr-3 rounded-full object-cover"
                          src="https://shuffle.dev/trizzle-assets/images/avatar-men-circle-border.png"
                          alt=""
                        />
                        <span className="text-sm font-medium text-gray-100">
                          John Doe
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="flex items-center h-16 px-6">
                      <span className="inline-block px-2 py-1 text-xs text-gray-300 font-medium bg-gray-700 rounded-full">
                        Explicitway
                      </span>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="flex items-center h-16 px-6">
                      <span className="text-sm font-medium text-gray-100">
                        Front-end Developer
                      </span>
                    </div>
                  </td>
                  <td className="p-0">
                    <div className="flex items-center h-16 px-6">
                      <span className="inline-block py-1 px-2 text-xs leading-5 font-medium text-green-500 bg-green-800 rounded-full">
                        ACTIVE
                      </span>
                    </div>
                  </td>
                  <td>
                    <Button size={"sm"}>Start stream</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between px-6 pt-8 border-t border-gray-400">
          <div className="w-full sm:w-auto mb-6 sm:mb-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-400">
                <span>Showing</span>
                <span className="px-px text-gray-200">1</span>
                <span>to</span>
                <span className="px-px text-gray-200">10</span>
                <span>of 20 results</span>
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto mb-6 sm:mb-0">
            <div className="flex flex-wrap items-center -m-1.5">
              <div className="w-auto p-1.5">
                <a
                  className="inline-flex items-center h-9 py-1 px-4 text-xs text-gray-400 font-semibold bg-gray-600 hover:bg-gray-700 rounded-lg transition duration-200"
                  href="#"
                >
                  Previous
                </a>
              </div>
              <div className="w-auto p-1.5">
                <a
                  className="inline-flex items-center h-9 py-1 px-4 text-xs text-blue-50 font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
                  href="#"
                >
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
