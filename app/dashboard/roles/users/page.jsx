"use client";
import React, { useState } from "react";
import CustomCard from "../../components/Custom/Card/card";
import { Button } from "@/components/ui/button";

import { Combobox } from "./components/ComboBox";
import AddUserModal from "./Components/AddUserModal";
import { UsersTable } from "./Components/DataTable/UsersTable";

const AddStockPage = () => {
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);

  return (
    <div className="">
      <div className="md:flex md:justify-between  md:space-x-6 -mx-4 md:mx-0 -mt-8 md:-mt-4">
        <div className="flex flex-col mb-3 md:mb-0  md:space-y-0 w-full">
          <h1 className="text-xl font-bold">Users</h1>
          <h4 className="text-sm font-semibold text-opacity-70">
            Manage your users here
          </h4>
        </div>
        <div className="md:w-full md:flex space-y-2 md:space-y-0 md:space-x-2 md:ms-auto items-center">
          <Combobox name="Select Office" />
          <Combobox name="Select Warehouse" />
          <Button onClick={() => setOpenModal(true)} variant="outline" className="w-full md:w-auto">
            Invite Users
          </Button>
        </div>
      </div>

      <div className="mt-8">
        {/* Stock Table */}
        <UsersTable data={[]} />
      </div>

      {/* Add Stock Modal */}
      <AddUserModal OpenModal={OpenModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default AddStockPage;
