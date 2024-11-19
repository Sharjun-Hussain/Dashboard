"use client";

import React, { Fragment } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { UsersTable } from "./components/DataTable/UsersTable";
import CustomCard from "../components/Custom/Card/card";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";
import { Button } from "@/components/ui/button";

const RoleManagementDashboard = () => {
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      branch: "Head Office",
      warehouse: "Central Warehouse",
      permissions: ["Create Office", "Update Stock"],
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      branch: "Branch A",
      warehouse: "Warehouse A",
      permissions: ["View Office", "Issue Products"],
    },
  ];

  const actions = [
    "Create Office",
    "Update Office",
    "Delete Office",
    "View Office",
    "Add Products",
    "Update Stock",
    "Issue Products",
  ];

  const roles = ["Super Admin", "Branch Manager", "Warehouse Admin"];

  return (
    <Fragment>
      <CustomCard className="-mt-9 " >
        <div className="flex -mt-4 items-center ">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Roles Managements</h1>
            <h2>Manage Permissions & Roles Here.</h2>
          </div>
          <div className="ms-auto">
            <Button variant="outline">Create Roles</Button>
          </div>
        </div>
        <UsersTable data={{}} />
      </CustomCard>
    </Fragment>
  );
};

export default RoleManagementDashboard;
