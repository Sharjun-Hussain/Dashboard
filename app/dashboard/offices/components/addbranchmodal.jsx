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

export default function AddOfficeModal({
  onUpdate,
  OpenModal,
  setOpenModal,
  existingOffice,
}) {
  const [code, setCode] = useState(existingOffice?.code || "");
  const [office_name, setOfficeName] = useState(
    existingOffice?.office_name || ""
  );
  const [address, setAddress] = useState(existingOffice?.address || "");
  const [phone_number, setPhoneNumber] = useState(
    existingOffice?.phone_number || ""
  );
  const [email, setEmail] = useState(existingOffice?.email || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditing = !!existingOffice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/office${
        isEditing ? `/${existingOffice.id}` : ""
      }`;
      const method = isEditing ? "put" : "post";
      const res = await axios({
        method,
        url,
        data: { code, office_name, address, phone_number, email },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast(
          `${
            isEditing
              ? "Office Branch Updated Successfully"
              : "Office Branch Added Successfully"
          }`,{duration:1600,position:"top-right"}
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
    if (existingOffice) {
      setCode(existingOffice.code);
      setOfficeName(existingOffice.office_name);
      setAddress(existingOffice.address);
      setPhoneNumber(existingOffice.phone_number);
      setEmail(existingOffice.email);
    } else {
      setCode("");
      setOfficeName("");
      setAddress("");
      setPhoneNumber("");
      setEmail("");
    }
  }, [existingOffice]);

  if (!OpenModal) return null;

  return (
    <Dialog open={OpenModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[455px] w-full bg-card dark:bg-accent">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Branch Office" : "Add Branch Office"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Make changes to your profile here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row gap-4 pt-4">
            <div className="flex-row">
              <div className="items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Branch Name
                </Label>
                <Input
                  id="name"
                  value={office_name}
                  onChange={(e) => setOfficeName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="items-center gap-4 pt-4">
                <Label htmlFor="branchcode" className="text-right">
                  Branch Code
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
                ? "Update Branch"
                : "Add Branch"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
