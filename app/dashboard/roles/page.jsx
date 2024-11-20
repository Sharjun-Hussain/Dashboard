"use client";
import React, { Fragment, useState } from "react";
import { UsersTable } from "./components/DataTable/UsersTable";
import CustomCard from "../components/Custom/Card/card";
import { Button } from "@/components/ui/button";
import AddUserModal from "./roles/Components/AddUserModal";

const RoleManagementDashboard = () => {
  const [OpenModal, setOpenModal] = useState(false);

  return (
    <Fragment>
      <CustomCard className="-mt-9 ">
        <div className="flex -mt-4 items-center ">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Roles Managements</h1>
            <h2>Manage Permissions & Roles Here.</h2>
          </div>

          <div className="ms-auto">
            <Button onClick={() => setOpenModal(true)} variant="outline">
              Create Roles
            </Button>
          </div>
        </div>
        <UsersTable data={{}} />
      </CustomCard>
      <AddUserModal OpenModal={OpenModal} setOpenModal={setOpenModal} />
    </Fragment>
  );
};

export default RoleManagementDashboard;
