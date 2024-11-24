"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CheckCheck, PenOff, Plus, Send, ToggleRight } from "lucide-react";
import CustomCard from "../../components/Custom/Card/card";
import { MainCategoryTable, SubCategoryTable, UnitTypeTable } from "./components/DataTable/UnitTypeTable";

import UnitTypeModal from "./components/unitTypeModal";
axios.defaults.withCredentials = true;

export default function DemoPage() {
  const [unitType, setunitType] = useState([]);
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);

  const handleChildData = (maincategory) => {
    setunitType((prevCategory) => {
      const categoryIndex = prevCategory.findIndex((o) => o.id === maincategory.id);
      if (categoryIndex >= 0) {
        // Update existing office
        const updatedCategories = [...prevCategory];
        updatedCategories[categoryIndex] = maincategory;
        return updatedCategories;
      } else {
        // Add new office
        return [...prevCategory, maincategory];
      }
    });
  };

  const handleDelete = (unitId) => {
    setunitType((prev) => prev.filter((category) => category.id !== unitId));
  };

  useEffect(() => {
    const fetchUnitType = async () => {
      setloading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/unitType`,
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
        setunitType(res.data.data);
        setloading(false);
      }
    };
    fetchUnitType();
  }, []);

  return (
    <div className="">
      <div className="container mx-auto">
        <CustomCard className="-mt-9">
          <div className="flex ">
           <div className="flex flex-col">
           <h2 className="text-xl font-bold">Unit Type</h2>
           <h2 className="text-sm font-semibold ">Manage your Sub Category Here</h2>
           </div>
           <div className="ms-auto">
           <Button
              className="pe-2 ps-1"
              onClick={() => setOpenModal(true)}
              variant="outline"
            >
              {" "}
              <Plus size={15} className="me-1" />
              Add Unit Types
            </Button>
           </div>
          </div>

          <div>
            <div className="flex">
              <div className="ms-auto">
                {/* <AddOfficeModal sendDatatoParent={handleChildData} /> */}
              </div>
              {/* <Button className=" ms-auto" variant="outline" ><Plus size={14} className='me-[2px]'/> Add Users</Button> */}
            </div>
            <div>
              <UnitTypeTable
                onDelete={handleDelete}
                data={unitType}
                loading={loading}
                onUpdate={handleChildData}
              />
            </div>
          </div>
          <UnitTypeModal onUpdate={handleChildData} OpenModal={OpenModal} setOpenModal={setOpenModal} />
        </CustomCard>
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </div>
  );
}
