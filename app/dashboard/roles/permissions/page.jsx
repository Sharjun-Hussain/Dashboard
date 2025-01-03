"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PermissionTable } from "./Components/DataTable/PermissionTable";
import AddPermissionModal from "./Components/AddPermissionModal";
import axios from "axios";

const PermissionPage = () => {
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [permissions, setpermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      setloading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/permission`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withXSRFToken: true,
          withCredentials: true,
        }
      );

      if (res.status == 200) {
        console.log(res.data);
        setpermissions(res.data.data);
        setloading(false);
      }
    };
    fetchPermissions();
  }, []);

  const handleDelete = (permissionid) => {
    setpermissions((prev) =>
      prev.filter((permission) => permission.id !== permissionid)
    );
  };

  const handleChildData = (permission) => {
    setpermissions((prev) => {
      const permissionIndex = prev.findIndex((o) => o.id === permission.id);
      if (permissionIndex >= 0) {
        // Update existing office
        const updatedPermissions = [...prev];
        updatedPermissions[permissionIndex] = permission;
        return updatedPermissions;
      } else {
        // Add new office
        return [...prev, permission];
      }
    });
  };

  return (
    <div className="">
      <div className="md:flex md:space-x-6 -mx-4 md:mx-0 -mt-8 md:-mt-4">
        <div className="flex flex-col mb-3 md:mb-0  md:space-y-0 w-full">
          <h1 className="text-xl font-bold">Permissions</h1>
          <h4 className="text-sm font-semibold text-opacity-70">
            Manage Permissions for roles here
          </h4>
        </div>

        {/* Add the correct flex and ms-auto classes to align the button right on large screens */}
        <div className="flex md:ms-auto items-center md:w-auto w-full justify-end">
          <Button
            onClick={() => setOpenModal(true)}
            variant="outline"
            className="w-full md:w-auto"
          >
            Create Permissions
          </Button>
        </div>
      </div>

      <div className="mt-8">
        {/* Users Table */}
        <PermissionTable
          data={permissions}
          onDelete={handleDelete}
          onUpdate={handleChildData}
        />
      </div>

      {/* Add User Modal */}
      <AddPermissionModal
        OpenModal={OpenModal}
        onUpdate={handleChildData}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default PermissionPage;
