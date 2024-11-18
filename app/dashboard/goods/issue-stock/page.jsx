"use client"
import React ,{useState} from "react";

import { Button } from "@/components/ui/button";
import { Combobox } from "./Components/ComboBox";
import { ProductTable } from "./Components/DataTable/ProductTable";
import AddStockModal from "./Components/addstockmodal";



const AddStockPage = () => {
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false)
  return (
    <div>
      <div className="flex ">
        <div className="  flex flex-col  ">
          <h1 className="text-xl font-bold">Issue Stock</h1>
          <h4 className="text-md font-semibold opacity-70 ">
            Update the stock Values here
          </h4>
        </div>
        <div className=" ms-auto space-x-4">
          <Combobox name="Select Office" />
          <Combobox name="Select WareHouse" />
          <Button onClick={() => setOpenModal(true)} variant="outline"  >Add Stock</Button>
        </div>
      </div>

      <div>
        
         <ProductTable data={[]} />
      </div>
      <AddStockModal  OpenModal={OpenModal} setOpenModal={setOpenModal} />

    </div>
  );
};

export default AddStockPage;
