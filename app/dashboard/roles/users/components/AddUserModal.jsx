"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { RoleCombobox } from "./ComboBox/RoleComboBox";
import { WareHouseComboBox } from "./ComboBox/WareHouseComboBox";
import { OfficeComboBox } from "./ComboBox/OfficeComboBox";

export default function AddUserModal({
  onUpdate,
  OpenModal,
  setOpenModal,
  existingUser,
}) {
  console.log(existingUser);

  const [name, setName] = useState(existingUser?.name || "");
  const [email, setEmail] = useState(existingUser?.email || "");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState(existingUser?.role || null);
  const [RoleData, setRoleData] = useState("");
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [fetchedWarehouses, setfetchedWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]); // Roles for selection
  const isEditing = !!existingUser;

  const handleRoleChange = (newRole) => {
    if (newRole !== role) setRole(newRole);
  };

  useEffect(() => {
    if (role) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/roles/${role}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withXSRFToken: true,
          withCredentials: true,
        })
        .then((res) => setRoleData(res?.data?.data?.role))
        .catch((err) =>
          setError(err.response?.data?.message || "Error fetching data")
        );
    }
  }, [role]);

  useEffect(() => {
    setName(existingUser?.name);
    setEmail(existingUser?.email);
    setSelectedOffice(existingUser?.office_id);
    setSelectedWarehouse(existingUser?.warehouse_id);
    setRole(existingUser?.role_id);
    setRoleData(existingUser?.role);
    // }
  }, [existingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!name || !email) {
        setError("Please fill in all required fields");
        return;
      }
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users${
        isEditing ? `/${existingUser.id}` : ""
      }`;
      const method = isEditing ? "put" : "post";
      const res = await axios({
        method,
        url,
        data: {
          name,
          email,
          password: "password",
          password_confirmation: "password",
          role: RoleData?.name,
          office_id: selectedOffice,
          warehouse_id: selectedWarehouse,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast(
          `${
            isEditing ? "User Updated Successfully" : "User Added Successfully"
          }`,
          { duration: 1600, position: "top-right" }
        );
        setLoading(false);
        onUpdate(res.data.data);
        setOpenModal(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const officeid = (officeid) => {
    setSelectedOffice(officeid);
  };

  const warehouseid = (warehouseid) => {
    setSelectedWarehouse(warehouseid);
  };
  // // Role-based disabling logic
  // const trimmedRole = RoleData?.name?.replace(/\s/g, "").toLowerCase();

  // // Disable both office and warehouse for these roles
  // const isOfficeAndWarehouseDisabled = [
  //   "superadmin",
  //   "systemadmin",
  //   "headofficechairman",
  // ].includes(trimmedRole);

  // // Disable warehouse for branch manager
  // const isWarehouseDisabled = trimmedRole === "branch manager";

  return (
    <Dialog open={OpenModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[455px] w-full bg-card dark:bg-accent">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Update User" : "Add User"}</DialogTitle>
            <DialogDescription className="text-gray-600">
              Make changes here. Click save when done.
            </DialogDescription>
          </DialogHeader>

          {/* User Information */}
          <div className="flex flex-row gap-4 pt-4">
            <div className="flex-row w-full">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="flex-row w-full">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                disabled
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <Label htmlFor="warehouse">Select Role</Label>
            <RoleCombobox name="Select Role" roleid={handleRoleChange} />
          </div>

          <div className="flex flex-row gap-4 pt-4"></div>

          <div className="flex flex-row gap-4 pt-4">
            <div className="flex-row w-full">
              <Label htmlFor="office" className="text-right">
                Select Office
              </Label>
              <OfficeComboBox Officeid={officeid} name="Select Office" />
            </div>
            <div className="flex-row w-full">
              <Label htmlFor="warehouse" className="text-right">
                Select Warehouse
              </Label>
              <WareHouseComboBox
                warehouseid={warehouseid}
                data={fetchedWarehouses}
                name="Select Warehouse"
                selectedOffice={selectedOffice}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              className="mt-4"
              disabled={loading}
              variant="outline"
              type="submit"
            >
              {loading ? "Loading..." : isEditing ? "Update User" : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
