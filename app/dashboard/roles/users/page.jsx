"use client";
import React, { useEffect, useState } from "react";
import CustomCard from "../../components/Custom/Card/card";
import { Button } from "@/components/ui/button";
import AddUserModal from "./components/AddUserModal";
import { UsersTable } from "./components/DataTable/UsersTable";
import { RoleCombobox } from "./components/ComboBox/RoleComboBox";
import axios from "axios";

const UsersPage = () => {
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [FetchedUsersData, setFetchedUsersData] = useState([]);

  const handleChildData = (user) => {
    setFetchedUsersData((prev) => {
      const userindex = prev.findIndex((o) => o.id === user.id);
      if (userindex >= 0) {
        // Update existing office
        const updatedusers = [...prev];
        updatedusers[userindex] = user;
        return updatedusers;
      } else {
        // Add new office
        return [...prev, user];
      }
    });
  };

  const handleDelete = (userid) => {
    setFetchedUsersData((prev) => prev.filter((user) => user.id !== userid));
  };

  useEffect(() => {
    const fetchusers = async () => {
      setloading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
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
        setFetchedUsersData(res.data.data);
        setloading(false);
      }
    };
    fetchusers();
  }, []);

  return (
    <div className="">
      <div className="md:flex md:space-x-6 -mx-4 md:mx-0 -mt-8 md:-mt-4">
        <div className="flex flex-col mb-3 md:mb-0  md:space-y-0 w-full">
          <h1 className="text-xl font-bold">Users</h1>
          <h4 className="text-sm font-semibold text-opacity-70">
            Manage your users here
          </h4>
        </div>
        <div className="md:w-full md:flex space-y-2 md:space-y-0 md:space-x-2 md:ms-auto items-center">
          <RoleCombobox name="Select Office" />
          <RoleCombobox name="Select Warehouse" />
          <Button
            onClick={() => setOpenModal(true)}
            variant="outline"
            className="w-full md:w-auto"
          >
            Invite Users
          </Button>
        </div>
      </div>

      <div className="mt-8">
        {/* Stock Table */}
        <UsersTable
          loading={loading}
          data={FetchedUsersData}
          onUpdate={handleChildData}
          onDelete={handleDelete}
        />
      </div>

      {/* Add Stock Modal */}
      <AddUserModal
        OpenModal={OpenModal}
        onUpdate={handleChildData}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default UsersPage;
