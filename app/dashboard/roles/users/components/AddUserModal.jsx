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
    setSelectedWarehouse(null); // Reset selected warehouse
    setfetchedWarehouses([]); // Clear previous warehouses
    if (selectedOffice) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-warehouse/${selectedOffice}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => setfetchedWarehouses(res?.data?.data))
        .catch((err) => setError(err.message));
    }
  }, [selectedOffice]);

  useEffect(() => {
    if (!fetchedWarehouses.some((wh) => wh.id === selectedWarehouse)) {
      setSelectedWarehouse(null); // Ensure warehouse is valid
    }
  }, [fetchedWarehouses, selectedWarehouse]);

  useEffect(() => {
    // Fetch roles from API
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
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
          password,
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

  // Role-based disabling logic
  const trimmedRole = RoleData?.name?.replace(/\s/g, "").toLowerCase();

  // Disable both office and warehouse for these roles
  const isOfficeAndWarehouseDisabled = [
    "superadmin",
    "systemadmin",
    "headofficechairman",
  ].includes(trimmedRole);

  // Disable warehouse for branch manager
  const isWarehouseDisabled = trimmedRole === "branch manager";

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
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 pt-4">
            <div className="flex-row w-full">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="flex-row w-full">
              <Label htmlFor="warehouse" className="text-right">
                Select Role
              </Label>
              <RoleCombobox name="Select Role" roleid={handleRoleChange} />
            </div>
          </div>

          <div className="flex flex-row gap-4 pt-4">
            <div className="flex-row w-full">
              <Label htmlFor="office" className="text-right">
                Select Office
              </Label>
              <OfficeComboBox
                name="Select Office"
                Officeid={(id) => setSelectedOffice(id)}
                disabled={isOfficeAndWarehouseDisabled}
              />
            </div>
            <div className="flex-row w-full">
              <Label htmlFor="warehouse" className="text-right">
                Select Warehouse
              </Label>
              <WareHouseComboBox
                data={fetchedWarehouses}
                name="Select Warehouse"
                warehouseid={(id) => setSelectedWarehouse(id)}
                selectedOffice={selectedOffice}
                disabled={isOfficeAndWarehouseDisabled || isWarehouseDisabled}
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
