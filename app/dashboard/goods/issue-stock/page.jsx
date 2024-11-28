"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { MainCategoryComboBox } from "./components/MainCategoryComboBox";
import { UnitTypeComboBox } from "./components/UnitTypeComboBox";
import SubcategoryCombobox from "./components/SubCategoryComboBox";



// todo : get data from sub category and store here for super admin manually select

const StockIssuePage = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [UnitValue, setUnitValue] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [finalSearchedProductData, setfinalSearchedProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.status === 200) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.length >= 2) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.code.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
      setName("");
      setCode("");
    }
  };

  const handleSelectItem = (item) => {
    const fetchProductBySearch = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-product`, // Endpoint
          {
            // Config object
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            params: {
              code: item.code, // Data sent as query parameters
            },
          }
        );

        if (res.status === 200) {
          const product = res.data.data;
          setName(product.name);
          setCode(product.code);
          setfinalSearchedProductData(res.data.data); // Update state or handle response
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch products."); // Display error message
      }
    };

    fetchProductBySearch();
    setSearch(item.name); // Fill the input with the selected product name
    setFilteredProducts([]); // Clear the dropdown
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stock-out`,
        {
          product_id: finalSearchedProductData.id,
          warehouse_id: sessionStorage.getItem("warehouse_id"),
          transaction_type:"out",
          quantity: UnitValue,
          remarks: description,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.status === 201) {
        toast.success("Product Added Successfully!");
        setCode("");
        setName("");
        setDescription("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Stocks Issue</h1>
          <h4 className="text-md font-semibold opacity-70">
            Add your Stock Updates Details Here
          </h4>
        </div>
      </div>

      <div className="relative">
        <Input
          type="search"
          placeholder="Search by Product Name or Code"
          onChange={handleSearch}
          value={search}
          className="w-full"
        />

        {filteredProducts.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelectItem(item)}
            className="cursor-pointer p-1 border-4 hover:border-l-pink-600  "
          >
            {item.name} ({item.code})
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              disabled
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="code">Product Code</Label>
            <Input
              id="code"
              value={code}
              disabled
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="color">Main Category </Label>
            <MainCategoryComboBox
              CategoryName={
                search ? finalSearchedProductData?.main_category?.name : ""
              }
            />
          </div>
          <div>
            <Label htmlFor="size">Sub Category</Label>
            <SubcategoryCombobox
              CategoryName={
                search ? finalSearchedProductData?.sub_category?.name : ""
              }
              mainCategoryId={finalSearchedProductData?.main_category?.id}
            />
          </div>
          <div>
            <Label htmlFor="lowStockThreshold">Unit Type</Label>
            <UnitTypeComboBox
              UnitType={search ? finalSearchedProductData?.unit_type?.name : ""}
            />
          </div>
          {/* <div className="items-center mt-8">
            <RadioGroup className="flex gap-5" defaultValue="m">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in" id="option-one" />
                <Label htmlFor="option-one">Inch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="m" id="option-two" />
                <Label htmlFor="option-two">Meter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yrd" id="option-two" />
                <Label htmlFor="option-two">Yard</Label>
              </div>
            </RadioGroup>
          </div> */}
        </div>
        <div>
          <Label htmlFor="Value">Quantity</Label>
          <Input
            id="name"
            value={UnitValue}
            onChange={(e) => setUnitValue(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-[120px]"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading... Please Wait!" : "Update Stock"}
        </Button>
      </form>
    </div>
  );
};

export default StockIssuePage;
