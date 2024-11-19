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

export default function AddPermissionModal({
  onUpdate,
  OpenModal,
  setOpenModal,
  existingPermission,
}) {
  const [group_name, setgroup_name] = useState(
    existingPermission?.group_name || ""
  );
  const [name, setname] = useState(existingPermission?.name || "");
  const [guard_name, setguard_name] = useState(
    existingPermission?.guard_name || ""
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditing = !!existingPermission;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/permission${
        isEditing ? `/${existingPermission.id}` : ""
      }`;
      const method = isEditing ? "put" : "post";
      const res = await axios({
        method,
        url,
        data: { group_name, name },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast(
          `${
            isEditing
              ? "Updating Permission Successfully"
              : "Create Permission Successfully"
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
    if (existingPermission) {
      setguard_name(existingPermission.guard_name);
      setgroup_name(existingPermission.group_name);
      setname(existingPermission.name);
    } else {
      setguard_name("");
      setgroup_name("");
      setname("");
    }
  }, [existingPermission]);

  if (!OpenModal) return null;

  return (
    <Dialog open={OpenModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[455px] w-full bg-card dark:bg-accent">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Update Permission" : "Create Permission"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Make changes to your profile here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full  flex-row gap-4 pt-4">
            <div className="flex-row flex-1">
              <div className="items-center  gap-4">
                <Label htmlFor="name" className="text-right">
                  Permission Group Name
                </Label>
                <Input
                  id="name"
                  value={group_name}
                  onChange={(e) => setgroup_name(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="items-center gap-4 pt-4">
                <Label htmlFor="branchcode" className="text-right">
                  Permission
                </Label>
                <Input
                  id="branchcode"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="col-span-3"
                />
              </div>
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
                ? "Update Permissions"
                : "Create Permission"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
