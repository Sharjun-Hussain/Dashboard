"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductTable } from "./Components/DataTable/ProductTable";
import { Combobox } from "./Components/ComboBox";

const StockPage = () => {
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  return (
    <div>
      <div className="flex ">
        <div className="  flex flex-col  ">
          <h1 className="text-xl font-bold">Stock Details</h1>
          <h4 className="text-md font-semibold opacity-70 ">
            View and Review the Stock Details here
          </h4>
        </div>
        <div className=" ms-auto space-x-4">
          <Combobox name="Select Office" />
          <Combobox name="Select WareHouse" />
          <Button onClick={() => setOpenModal(true)} variant="outline">
            Export as PDF
          </Button>
        </div>
      </div>
      <div>
        <ProductTable data={[]} />
      </div>
    </div>
  );
};

export default StockPage;
