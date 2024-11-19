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
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // ShadCN Dropdown

export default function AddUserModal({
  onUpdate,
  OpenModal,
  setOpenModal,
  existingOffice,
}) {
  const [code, setCode] = useState(existingOffice?.code || "");
  const [office_name, setOfficeName] = useState(existingOffice?.office_name || "");
  const [address, setAddress] = useState(existingOffice?.address || "");
  const [phone_number, setPhoneNumber] = useState(existingOffice?.phone_number || "");
  const [email, setEmail] = useState(existingOffice?.email || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]); // List of products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on search
  const [searchTerm, setSearchTerm] = useState(""); // For storing search input
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product
  const isEditing = !!existingOffice;

  useEffect(() => {
    // Fetch product list from API or static data
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data); // Initially set all products to be available
      })
      .catch((err) => setError(err.message));
  }, []);

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
            <DialogTitle>{isEditing ? "Update Stocks" : "Add Stocks"}</DialogTitle>
            <DialogDescription className="text-gray-600">
              Make changes here. Click save when done.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-row gap-4 pt-4">
            {/* Searchable Dropdown */}
            <div className="flex-row w-full">
              <div className="items-center gap-4">
                <Label htmlFor="product" className="text-right">
                  Search Product
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Input
                      id="product"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Search products"
                      className="w-full"
                    />
                  </DropdownMenuTrigger>
                  {filteredProducts.length > 0 && (
                    <div className="dropdown-content">
                      {filteredProducts.map((product) => (
                        <DropdownMenuItem
                          key={product.id}
                          onClick={() => handleProductSelect(product)}
                          className="cursor-pointer hover:bg-gray-200 p-2"
                        >
                          {product.name}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  )}
                </DropdownMenu>
              </div>
            </div>

            {/* Other Fields for Product */}
            <div className="flex-row w-full">
              <div className="items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Product Code
                </Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  value={email} // Using email state for weight
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
                ? "Update Branch"
                : "Add Stock"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
