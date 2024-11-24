"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import AddStockModal from "./components/addstockmodal";
import { Combobox } from "./components/ComboBox";
import { ProductTable } from "./Components/DataTable/ProductTable";
import axios from "axios";
import Link from "next/link";

const AddStockPage = () => {
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [FetchedProducts, setFetchedProducts] = useState([])
  console.log(FetchedProducts);
  
  const handleDelete = (productid) => {
    setFetchedProducts((prev) => prev.filter((product) => product.id !== productid));
  };

  useEffect(() => {
    const fetchGoods = async () => {
      setloading(true);
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

      if (res.status == 200) {
        console.log(res.data);
        setFetchedProducts(res.data.data);
        setloading(false);
      }
    };
    fetchGoods();
  }, []);

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
          <Combobox name="Select Office" />
          <Combobox name="Select Warehouse" />
         <Link href="/dashboard/goods/add-product"> <Button  variant="outline" className="w-full md:w-auto">
            Add Stock
          </Button></Link>
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
