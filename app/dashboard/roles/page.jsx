"use client";

import React, { Fragment } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { UsersTable } from "./components/DataTable/UsersTable";
import CustomCard from "../components/Custom/Card/card";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";

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
  <Breadcrumbs/>
  <CustomCard title="Role Management" description=" Manage user roles and permissions effectively.">
      <div className=" space-y-8">
     
      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">User List</TabsTrigger>
          <TabsTrigger value="permissions">Role Permissions</TabsTrigger>
        </TabsList>

        {/* Tab 1: User List */}
        <TabsContent value="users">
          <div className="space-y-4">
            <UsersTable data={{}} />
          </div>
        </TabsContent>

        {/* Tab 2: Role Permissions */}
        <TabsContent value="permissions">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[1fr_repeat(3,_minmax(150px,_1fr))] gap-4">
              {/* Header Row */}
              <div className="font-medium dark:text-gray-300">Actions / Roles</div>
              {roles.map((role, index) => (
                <div
                  key={index}
                  className="font-medium  dark:text-gray-300 text-center"
                >
                  {role}
                </div>
              ))}

              <Separator className="col-span-full my-2" />

              {/* Action Rows */}
              {actions.map((action, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <div className="font-medium dark:text-gray-300">{action}</div>
                  {roles.map((_, colIndex) => (
                    <div
                      key={colIndex}
                      className="flex justify-center items-center"
                    >
                      <Checkbox id={`action-${rowIndex}-role-${colIndex}`} />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </CustomCard>
 </Fragment>
  );
};

export default RoleManagementDashboard;
