"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CheckCheck, PenOff, Plus, Send, ToggleRight } from "lucide-react";

import useMediaQuery from "@/Hooks/useMediaQuery";
import { RolesTable } from "./components/DataTable/RolesTable";
import RolesAddModal from "./components/RolesAddModal";
import { RolesAddSheet } from "./components/RolesAddSheet";
axios.defaults.withCredentials = true;

export default function DemoPage() {
  const [Roles, setRoles] = useState([]);
  const [loading, setloading] = useState(false);
  const [OpenSheet, setOpenSheet] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleChildData = (role) => {
    setRoles((prev) => {
      const RoleIndex = prev.findIndex((o) => o.id === role.id);
      if (RoleIndex >= 0) {
        // Update existing office
        const updatedRole = [...prev];
        updatedRole[RoleIndex] = role;
        return updatedRole;
      } else {
        // Add new office
        return [...prev, role];
      }
    });
  };

  const handleDelete = (roleId) => {
    setRoles((prev) => prev.filter((role) => role.id !== roleId));
  };

  useEffect(() => {
    const fetchRoles = async () => {
      setloading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/roles`,
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
        setRoles(res.data.data);
        setloading(false);
      }
    };
    fetchRoles();
  }, []);

  return (
    <div className="">
      <div className="md:flex md:space-x-6 -mx-4 md:mx-0 -mt-8 md:-mt-4">
        <div className="flex flex-col mb-3 md:mb-0  md:space-y-0 w-full">
          <h1 className="text-xl font-bold">Roles</h1>
          <h4 className="text-sm font-semibold text-opacity-70">
            Manage Roles & Permissions here
          </h4>
        </div>

        {/* Add the correct flex and ms-auto classes to align the button right on large screens */}
        <div className="flex md:ms-auto items-center md:w-auto w-full justify-end">
          <Button
            onClick={() => setOpenSheet(true)}
            variant="outline"
            className="w-full md:w-auto"
          >
            Create Role
          </Button>
          <RolesAddSheet
            openSheet={OpenSheet}
            setOpenSheet={setOpenSheet}
            onUpdate={handleChildData}
          />
        </div>
      </div>

      <div className="mt-8">
        {/* Users Table */}
        <RolesTable
          data={Roles}
          onDelete={handleDelete}
          onUpdate={handleChildData}
        />
      </div>

      {/* Add User Modal */}
      {/* <RolesAddModal
        OpenModal={OpenModal}
        onUpdate={handleChildData}
        setOpenModal={setOpenModal}
      /> */}
    </div>
  );
}
