"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import AddStockModal from "./components/addstockmodal";
import { Combobox } from "./Components/ComboBox";
import { ProductTable } from "./Components/DataTable/ProductTable";
import axios from "axios";
import Link from "next/link";
import { GitCommitHorizontal } from "lucide-react";
import { WarehouseCompoBox } from "./Components/WarehouseCompoBox";

const AddStockPage = () => {
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [FetchedProducts, setFetchedProducts] = useState([]);
  const [fetchedwarehouse, setfetchedwarehouse] = useState([]);
  const [userofficeid, setuserofficeid] = useState(
    localStorage.getItem("office_id")
      ? JSON.parse(localStorage.getItem("office_id")) ?? null
      : null
  );
  const [userofficename, setuserofficename] = useState(
    localStorage.getItem("office_name")
  );
  const [userwarehousename, setuserwarehousename] = useState(
    localStorage.getItem("warehouse_name")
  );
  const [userwarehouseid, setuserwarehouseid] = useState(
    JSON.parse(localStorage.getItem("warehouse_id")) ?? null
  );

  const handleDelete = (productid) => {
    setFetchedProducts((prev) =>
      prev.filter((product) => product.id !== productid)
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setloading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withXSRFToken: true,
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setFetchedProducts(res.data?.data ?? []);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setloading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchwarehouse = async () => {
      setloading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-warehouse/${userofficeid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withXSRFToken: true,
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setfetchedwarehouse(res.data?.data ?? []);
        }
      } catch (error) {
        console.error("Failed to fetch warehouse:", error);
      } finally {
        setloading(false);
      }
    };
    fetchwarehouse();
  }, [userofficeid]);

  const officeid = (officeid) => {
    setuserofficeid(officeid);
  };
  const warehouseid = (warehouseid) => {
    setuserwarehouseid(warehouseid);
  };

  return (
    <div className="">
      <div className="md:flex md:justify-between  md:space-x-6 -mx-4 md:mx-0 -mt-8 md:-mt-4">
        <div className="flex flex-col mb-3 md:mb-0  md:space-y-0 w-full">
          <h1 className="text-xl font-bold">Stock Details</h1>
          <h4 className="text-sm font-semibold text-opacity-70">
            View and Review the Stock Details here
          </h4>
        </div>
        <div className="xxl:w-full md:flex space-y-2 md:space-y-0 md:space-x-2 xxl:ms-auto items-center">
          <Combobox
            Officeid={officeid}
            name={userofficename ? userofficename : "Select Office"}
            officedata={userofficeid}
          />
          <GitCommitHorizontal scale={2} />
          <WarehouseCompoBox
            warehousedata={fetchedwarehouse}
            warehouseid={warehouseid}
            disable={!userofficeid ? true : false}
          />
          <Link href="/dashboard/assets/add-product">
            {" "}
            <Button variant="outline" className="w-full md:w-auto">
              Add Stock
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        {/* Stock Table */}
        <ProductTable data={FetchedProducts} onDelete={handleDelete} />
      </div>

      {/* Add Stock Modal */}
      {/* <AddStockModal OpenModal={OpenModal} setOpenModal={setOpenModal} /> */}
    </div>
  );
};

export default AddStockPage;
