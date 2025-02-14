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

export default function UnitTypeModal({
  onUpdate,
  OpenModal,
  setOpenModal,
  existingUnitType,
}) {
  const [abbreviation, setAbbreviation] = useState("");
  const [name, setName] = useState(existingUnitType?.name || "");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditing = !!existingUnitType;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/unitType${
        isEditing ? `/${existingUnitType.id}` : ""
      }`;
      const method = isEditing ? "put" : "post";
      const res = await axios({
        method,
        url,
        data: { abbreviation, name },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast(
          `$${
            isEditing
              ? "Unit Type Updated Successfully"
              : "Unit Type Added Successfully"
          }`,
          { duration: 1600, position: "top-right" }
        );
        setLoading(false);

        onUpdate(res.data.data);

        setOpenModal(false);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = err.response.data.errors;

        Object.keys(errorMessages).forEach((field) => {
          const fieldErrors = errorMessages[field];

          fieldErrors.forEach((errorMessage) => {
            toast.error(`${field}: ${errorMessage}`, {
              duration: 4000,
              position: "top-right",
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
    if (existingUnitType) {
      setAbbreviation(existingUnitType.abbreviation);
      setName(existingUnitType.name);
    } else {
      setAbbreviation("");
      setName("");
    }
  }, [existingUnitType]);

  if (!OpenModal) return null;

  return (
    <Dialog open={OpenModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[455px] w-full bg-card dark:bg-accent">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Unit Type" : "Add Unit Type"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Make changes to your unit type here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-row gap-4 pt-4">
            <div className="flex-row flex-1">
              <div className="items-center gap-4">
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
              <div className="items-center gap-4 pt-4">
                <Label htmlFor="abbreviation" className="text-right">
                  Abbreviation
                </Label>
                <Input
                  id="abbreviation"
                  value={abbreviation}
                  onChange={(e) => setAbbreviation(e.target.value)}
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
                ? "Update Unit Type"
                : "Add Unit Type"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
