import { Button } from "@/components/ui/button";
import React from "react";
import { DeletePopUp } from "./components/DeletePopup";

const page = () => {
  return (
    <div>
      <div className="space-y-2">
        <div className="flex justify-between border border-primary p-3 items-center rounded-lg">
          <div>
            <ul>
              <li className="text-lg">Delete Stocks</li>
              <li className="text-xs text-gray-900 font-bold dark:text-gray-300">
                Once you delete a repository, there is no going back. Please be
                certain.
              </li>
            </ul>
          </div>
          <DeletePopUp text="Delete All Stocks" />{" "}
        </div>
        <div className="flex justify-between border border-primary p-3 items-center rounded-lg">
          <div>
            <ul>
              <li className="text-lg">Delete Offices</li>
              <li className="text-xs text-gray-900 font-bold dark:text-gray-300">
                Once you delete all offices, there is no going back. Please be
                certain.
              </li>
            </ul>
          </div>
          <DeletePopUp text="Delete All Offices" />
        </div>
        <div className="flex justify-between border border-primary p-3 items-center rounded-lg">
          <div>
            <ul>
              <li className="text-lg">Delete Warehouses</li>
              <li className="text-xs text-gray-900 font-bold dark:text-gray-300">
                Once you delete Warehouses, there is no going back. Please be
                certain.
              </li>
            </ul>
          </div>
          <DeletePopUp text="Delete All Warehouses" />
        </div>
      </div>
    </div>
  );
};

export default page;
