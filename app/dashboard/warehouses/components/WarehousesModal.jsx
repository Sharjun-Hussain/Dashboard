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
import { Combobox } from "./ComboBox";

export default function WarehouseModal({
  onUpdate,
  OpenModal,
  setOpenModal,
  existingWareHouse,
}) {
  const [code, setCode] = useState(existingWareHouse?.code || "");
  const [warehouse_name, setOfficeName] = useState(
    existingWareHouse?.warehouse_name || ""
  );
  const [address, setAddress] = useState(existingWareHouse?.address || "");
  const [phone_number, setPhoneNumber] = useState(
    existingWareHouse?.phone_number || ""
  );
  const [email, setEmail] = useState(existingWareHouse?.email || "");
  const [selectedofficeid, setselectedofficeid] = useState()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditing = !!existingWareHouse;

  const officeid = (officeid) =>{
    setselectedofficeid(officeid)
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/office${
        isEditing ? `/${existingWareHouse.id}` : ""
      }`;
      const method = isEditing ? "put" : "post";
      const res = await axios({
        method,
        url,
        data: { code, warehouse_name, address, phone_number, email },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast(
          `${
            isEditing
              ? "Office Branch Updated Successfully"
              : "Office Branch Added Successfully"
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

  useEffect(() => {
    if (existingWareHouse) {
      setCode(existingWareHouse.code);
      setOfficeName(existingWareHouse.warehouse_name);
      setAddress(existingWareHouse.address);
      setPhoneNumber(existingWareHouse.phone_number);
      setEmail(existingWareHouse.email);
    } else {
      setCode("");
      setOfficeName("");
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
              <div className="items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  WareHouse Name
                </Label>
                <Combobox Officeid={officeid} />
              </div>
              <div className="items-center gap-4 pt-4">
                <Label htmlFor="branchcode" className="text-right">
                  WareHouse Code
                </Label>
                <Input
                  id="branchcode"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex-row">
              <div className="items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  WareHouse Name
                </Label>
                <Input
                  id="name"
                  value={warehouse_name}
                  onChange={(e) => setOfficeName(e.target.value)}
                  className="col-span-3"
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
