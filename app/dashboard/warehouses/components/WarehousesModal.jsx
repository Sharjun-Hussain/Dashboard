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
import { Combobox, FetchOfficeComboBox } from "./fetchOfficeComboBox";

export default function WarehouseModal({
  onUpdate,
  OpenModal,
  setOpenModal,
  existingWareHouse,
}) {
  const [warehouse_code, setwarehouse_Code] = useState(
    existingWareHouse?.warehouse_code || ""
  );
  const [warehouse_name, setwarehouse_name] = useState(
    existingWareHouse?.warehouse_name || ""
  );
  const [address, setAddress] = useState(existingWareHouse?.address || "");
  const [phone_number, setPhoneNumber] = useState(
    existingWareHouse?.phone_number || ""
  );
  const [email, setEmail] = useState(existingWareHouse?.email || "");
  const [selectedofficeid, setselectedofficeid] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditing = !!existingWareHouse;

  const officeid = (officeid) => {
    setselectedofficeid(officeid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/warehouse${
        isEditing ? `/${existingWareHouse.id}` : ""
      }`;
      const method = isEditing ? "put" : "post";
      const res = await axios({
        method,
        url,
        data: {
          office_id: selectedofficeid,
          warehouse_code,
          warehouse_name,
          address,
          phone_number,
          email,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast(
          `${
            isEditing
              ? "WareHouse Updated Successfully"
              : "WareHouse Added Successfully"
          }`,
          { duration: 1600, position: "top-right" }
        );
        setLoading(false);

        onUpdate(res.data.data);
        setwarehouse_Code("");
        setwarehouse_name("");
        setAddress("");
        setPhoneNumber("");
        setEmail("");

        setOpenModal(false);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = err.response.data.errors;

        // Loop through each field in the error object
        Object.keys(errorMessages).forEach((field) => {
          const fieldErrors = errorMessages[field];

          // Show a toast for each error message related to the field
          fieldErrors.forEach((errorMessage) => {
            toast.error(`${field}: ${errorMessage}`, {
              duration: 4000, // Duration for each toast
              position: "top-right", // Position of the toast
            });
          });
        });
      } else {
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.", {
          duration: 4000,
          position: "top-right",
        });
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (existingWareHouse) {
      setwarehouse_Code(existingWareHouse.warehouse_code);
      setwarehouse_name(existingWareHouse.warehouse_name);
      setAddress(existingWareHouse.address);
      setPhoneNumber(existingWareHouse.phone_number);
      setEmail(existingWareHouse.email);
    } else {
      setwarehouse_Code("");
      setwarehouse_name("");
      setAddress("");
      setPhoneNumber("");
      setEmail("");
    }
  }, [existingWareHouse]);

  if (!OpenModal) return null;

  return (
    <Dialog open={OpenModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[455px] w-full bg-card dark:bg-accent">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Branch Warehosuse " : "Add Branch WareHouse"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Make changes to your profile here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row gap-4 pt-4">
            <div className="flex-row">
              <div className="gap-4">
                <Label htmlFor="name" className="text-right">
                  Select Office Branch
                </Label>
                <FetchOfficeComboBox Officeid={officeid} />
              </div>

              <div className="items-center gap-4 pt-4">
                <Label htmlFor="warehouse_name" className="text-right">
                  Warehouse Name
                </Label>
                <Input
                  id="warehouse_name"
                  value={warehouse_name}
                  onChange={(e) => setwarehouse_name(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex-row">
              <div className="gap-4">
                <Label htmlFor="name" className="text-right">
                  Warehouse Code
                </Label>
                <Input
                  id="name"
                  value={warehouse_code}
                  onChange={(e) => setwarehouse_Code(e.target.value)}
                  className=""
                />
              </div>

              <div className="items-center gap-4 pt-4">
                <Label htmlFor="phone_number" className="text-right">
                  Phone Number
                </Label>
                <Input
                  id="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="items-center gap-4">
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
            <div className="items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="col-span-3"
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
              {loading
                ? "Loading..."
                : isEditing
                ? "Update WareHouse"
                : "Add WareHouse"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
