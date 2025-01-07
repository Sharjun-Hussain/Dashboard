"use client";
import React, { useState, useEffect } from "react";
import CustomCard from "../../components/Custom/Card/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Combobox } from "./components/ComboBox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MainCategoryComboBox } from "../sub-category/components/MainCategoryComboBox";
import { SubCategoryComboBox } from "./components/SubCategoryComboBox";
import axios from "axios";
import { UnitTypeComboBox } from "./components/UnitTypeComboBox";
import { toast } from "sonner";

const Page = () => {
  const [SubCategoryData, setSubCategoryData] = useState();
  const [UnitTypeData, setUnitTypeData] = useState();
  const [MainCategory, setMainCategory] = useState();
  const [unitType, setunitType] = useState();
  const [SubCategory, setSubCategory] = useState();
  const [name, setname] = useState(null);
  const [code, setcode] = useState(null);
  const [color, setcolor] = useState(null);
  const [low_stock_threshold, setlow_stock_threshold] = useState();
  const [size, setsize] = useState();
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);
  const [Error, setError] = useState(null);

  const HandleMainCategory = (categoryid) => setMainCategory(categoryid);
  const HandleSubCategory = (categoryid) => setSubCategory(categoryid);
  const HandleUnitType = (unitType) => setunitType(unitType);

  useEffect(() => {
    const fetchSubCategory = async () => {
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

      if (res.status == 200) {
        console.log(res.data);
        setSubCategoryData(res.data.data);
        console.log(res.data);
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

      if (res.status == 200) {
        console.log(res.data);
        setUnitTypeData(res.data.data);
      }
    };
    fetchUnitType();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`;
      const method = "post";
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
          warehouse_id: JSON.parse(localStorage.getItem("warehouse_id")),
          office_id: JSON.parse(localStorage.getItem("office_id")),
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast("Product Added Successfully", {
          duration: 1600,
          position: "top-right",
        });
        setloading(false);
        setcode(null);
        setname(null);
        setcolor(null);
        setdescription(null);
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
  return (
    <div>
      <div className="flex ">
        <div className="  flex flex-col  ">
          <h1 className="text-xl font-bold">Add Goods</h1>
          <h4 className="text-md font-semibold opacity-70 ">
            Add your Branch Goods Details
          </h4>
        </div>
        {/* <div className=" ms-auto space-x-4">
          <Combobox />
          <Combobox />
        </div> */}
      </div>

      <div>
        <CustomCard
          MoreOption={false}
          title="Basic Information"
          description="Basic product identification details"
          insideClassName="border border-black dark:border-gray-500 pb-3 "
        >
          <div className="flex flex-row gap-4 pt-4 space-x-4">
            <div className="items-center w-1/3 gap-4">
              <Label htmlFor="name" className="text-right">
                Product Name
              </Label>
              <Input
                id="name"
                onChange={(e) => setname(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="items-center w-1/3 gap-4 ">
              <Label htmlFor="branchcode" className="text-right">
                Product Code
              </Label>
              <Input
                id="branchcode"
                onChange={(e) => setcode(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="items-center w-1/3 gap-4 ">
              <Label htmlFor="branchcode" className="text-right">
                Main Category
              </Label>
              <MainCategoryComboBox
                className=""
                categoryid={HandleMainCategory}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-row gap-4 pt-4 space-x-4 ">
            <div className="items-center w-1/3 gap-4 ">
              <Label htmlFor="branchcode" className="text-right">
                Sub Category
              </Label>
              <SubCategoryComboBox
                data={SubCategoryData}
                className="w-full"
                categoryid={HandleSubCategory}
              />
            </div>
            <div className="items-center w-1/3 gap-4 ">
              <Label htmlFor="branchcode" className="text-right">
                Unit Type
              </Label>
              <UnitTypeComboBox
                data={UnitTypeData}
                className=""
                categoryid={HandleUnitType}
              />
            </div>
            <div className="items-center w-1/3 gap-4 ">
              <Label htmlFor="threshold" className="text-right">
                Product Threshold
              </Label>
              <Input
                type="number"
                onChange={(e) => setlow_stock_threshold(e.target.value)}
                id="threshold"
                className="col-span-3"
              />
            </div>
          </div>
        </CustomCard>

        <CustomCard
          MoreOption={false}
          title="Dimension & Weights"
          description="Basic product identification details"
          insideClassName="border border-black dark:border-gray-500 pb-3 "
        >
          <div className="flex flex-row gap-4 pt-4 space-x-4">
            <div className="flex flex-col space-y-2 w-2/3 gap-1.5">
              <Label htmlFor="message">Enter Description</Label>
              <Textarea
                placeholder="Type your message here."
                className="h-[160px]"
                onChange={(e) => setdescription(e.target.value)}
                id="message"
              />
            </div>
            <div className=" flex flex-col w-1/3 ">
              <div className="items-start flex flex-col w-full gap-4">
                <Label htmlFor="color" className="text-right">
                  Color
                </Label>
                <Input
                  id="color"
                  onChange={(e) => setcolor(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="items-start flex flex-col w-full mt-3 ">
                <Label htmlFor="size" className="text-right">
                  Size
                </Label>
                <Input
                  id="size"
                  onChange={(e) => setsize(e.target.value)}
                  className="col-span-3 mt-3"
                />
              </div>
              <div className="items-start flex flex-col w-full  ">
                <Button onClick={handleSubmit} className="w-full mt-2">
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};

export default Page;
