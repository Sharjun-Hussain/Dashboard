"use client";
import React, { useState, useEffect } from "react";
import CustomCard from "../../components/Custom/Card/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import axios from "axios";

import { toast } from "sonner";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MainCategoryComboBox } from "./MainCategoryComboBox";
import { SubCategoryComboBox } from "./SubCategoryComboBox";
import { UnitTypeComboBox } from "./UnitTypeComboBox";


const ProductUpdateSheet = ({ existingProduct, openSheet, setopenSheet }) => {
  console.log(existingProduct);
  
  const [SubCategoryData, setSubCategoryData] = useState([]);
  const [UnitTypeData, setUnitTypeData] = useState([]);
  const [MainCategory, setMainCategory] = useState(existingProduct?.main_category_id || null);
  const [unitType, setUnitType] = useState(existingProduct?.unitType_id || null);
  const [SubCategory, setSubCategory] = useState(existingProduct?.sub_category_id || null);
  const [name, setName] = useState(existingProduct?.name || "");
  const [code, setCode] = useState(existingProduct?.code || "");
  const [color, setColor] = useState(existingProduct?.color || "");
  const [low_stock_threshold, setLowStockThreshold] = useState(existingProduct?.low_stock_threshold || 0);
  const [size, setSize] = useState(existingProduct?.size || "");
  const [description, setDescription] = useState(existingProduct?.description || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubCategory = async () => {
      if (MainCategory) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-sub-category/${MainCategory}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withXSRFToken: true,
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setSubCategoryData(res.data.data);
        }
      }
    };
    fetchSubCategory();
  }, [MainCategory]);

  useEffect(() => {
    const fetchUnitType = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-unitType`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withXSRFToken: true,
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUnitTypeData(res.data.data);
      }
    };
    fetchUnitType();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${existingProduct?.id}`;
      const method = existingProduct ? "put" : "post";
      const res = await axios({
        method,
        url,
        data: {
          code,
          name,
          main_category_id: MainCategory,
          sub_category_id: SubCategory,
          unitType_id: unitType,
          color,
          size,
          low_stock_threshold,
          description,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Product Updated Successfully", {
          duration: 1600,
          position: "top-right",
        });
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        Object.entries(err.response.data.errors).forEach(([field, errors]) => {
          errors.forEach((message) => {
            toast.error(`${field}: ${message}`, { duration: 4000 });
          });
        });
      } else {
        toast.error("An unexpected error occurred.", { duration: 4000 });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (existingProduct) {
      setCode(existingProduct.code);
      setName(existingProduct.name);
      setDescription(existingProduct.description);
      setLowStockThreshold(existingProduct.low_stock_threshold);
      setMainCategory(existingProduct.main_category_id);
      setSubCategory(existingProduct.sub_category_id);
      setUnitType(existingProduct.unitType_id);

    } else {
      setCode("");
      setName("");
      setDescription("");
      setLowStockThreshold("");
      setMainCategory("");
      setSubCategory("");
      setUnitType("");
    }
  }, [existingProduct]);

  return (
    <Sheet open={openSheet} onOpenChange={setopenSheet}>
     
      <SheetContent  className="w-full   md:min-w-[85vw] overflow-auto">
        <div>
          <div className="flex">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">Update Product</h1>
              <h4 className="text-md font-semibold opacity-70">
                Edit the product details
              </h4>
            </div>
          </div>

          <CustomCard
            MoreOption={false}
            title="Basic Information"
            description="Basic product identification details"
            insideClassName="border border-black dark:border-gray-500 pb-3"
          >
            <div className="flex flex-row gap-4 pt-4">
              <div className="w-1/3">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-1/3">
                <Label htmlFor="code">Product Code</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="w-1/3">
                <Label htmlFor="mainCategory">Main Category</Label>
                <MainCategoryComboBox
                  categoryid={setMainCategory}
                  defaultValue={MainCategory}
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 pt-4">
              <div className="w-1/3">
                <Label htmlFor="subCategory">Sub Category</Label>
                <SubCategoryComboBox
                  data={SubCategoryData}
                  categoryid={setSubCategory}
                  defaultValue={SubCategory}
                />
              </div>
              <div className="w-1/3">
                <Label htmlFor="unitType">Unit Type</Label>
                <UnitTypeComboBox
                  data={UnitTypeData}
                  categoryid={setUnitType}
                  defaultValue={unitType}
                />
              </div>
              <div className="w-1/3">
                <Label htmlFor="threshold">Low Stock Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={low_stock_threshold}
                  onChange={(e) => setLowStockThreshold(e.target.value)}
                />
              </div>
            </div>
          </CustomCard>

          <CustomCard
            MoreOption={false}
            title="Dimension & Weights"
            description="Additional product details"
            insideClassName="border border-black dark:border-gray-500 pb-3"
          >
            <div className="flex flex-row gap-4 pt-4">
              <div className="flex flex-col space-y-2 w-2/3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="w-1/3">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <Label htmlFor="size" className="mt-3">Size</Label>
                <Input
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
                <Button onClick={handleSubmit} className="w-full mt-4">
                  {loading ? "Updating..." : "Update Product"}
                </Button>
              </div>
            </div>
          </CustomCard>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductUpdateSheet;
