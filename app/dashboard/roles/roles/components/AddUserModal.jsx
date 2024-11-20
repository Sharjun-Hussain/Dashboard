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
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // ShadCN Dropdown

export default function AddUserModal({
  onUpdate,
  OpenModal,
  setOpenModal,
  existingRole,
}) {
  const [role, setrole] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // For storing search input
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product
  const isEditing = !!existingRole;

  // Handle product selection
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCode(product.code);
    setEmail(product.weight); // Assuming weight is stored in email field
  };

  // Filter products based on search term
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/roles${
        isEditing ? `/${existingRole.id}` : ""
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
              ? "Role Updated Successfully"
              : "Role Created Successfully"
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
    if (existingRole) {
    } else {
    }
  }, [existingRole]);

  if (!OpenModal) return null;

  return (
    <Dialog open={OpenModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[455px] w-full bg-card dark:bg-accent">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Update Role" : "Create Role"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Make changes here. Click save when done.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-row gap-4 pt-4">
            <div className="flex-row w-full">
              <div className="items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Role
                </Label>
                <Input
                  id="code"
                  value={role}
                  onChange={(e) => setCode(e.target.value)}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Permissions
                </Label>
                <Input
                  id="weight"
                  value={role} // Using email state for weight
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                  disabled
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
                ? "Update Role"
                : "Create Role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
