"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CheckCheck, PenOff, Plus, Send, ToggleRight } from "lucide-react";
import CustomCard from "../../components/Custom/Card/card";
import { MainCategoryTable } from "./components/DataTable/MainCategoryTable";
import MainCategoryModal from "./components/MainCategoryModal";
axios.defaults.withCredentials = true;

export default function DemoPage() {
  const [MainCategory, setMainCategory] = useState([]);
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);

  const handleChildData = (maincategory) => {
    setMainCategory((prevCategory) => {
      const categoryIndex = prevCategory.findIndex(
        (o) => o.id === maincategory.id
      );
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

  const handleDelete = (categoryid) => {
    setMainCategory((prev) =>
      prev.filter((category) => category.id !== categoryid)
    );
  };

  useEffect(() => {
    const fetchMainCategory = async () => {
      setloading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/MainCategory`,
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
        setMainCategory(res.data.data);
        setloading(false);
      }
    };
    fetchMainCategory();
  }, []);

  return (
    <div className="">
      <div className="">
        <CustomCard className="-mt-9" >
          <div className="flex md:flex-row flex-col -mt-5 ">
            <div className="flex flex-col">
              <h2 className="text-sm md:text-xl font-bold">Main category</h2>
              <h2 className="text-xs md:text-sm font-semibold text-gray-700">
                Manage your Main Category Here
              </h2>
            </div>
            <div className="md:ms-auto w-full md:w-auto">
              <Button
                className="pe-2 ps-1"
                onClick={() => setOpenModal(true)}
                variant="outline"
              >
                {" "}
                <Plus size={15} className="me-1" />
                Add Main Category
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
              <MainCategoryTable
                onDelete={handleDelete}
                data={MainCategory}
                loading={loading}
                onUpdate={handleChildData}
              />
            </div>
          </div>
          <MainCategoryModal
            onUpdate={handleChildData}
            OpenModal={OpenModal}
            setOpenModal={setOpenModal}
          />
        </CustomCard>
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </div>
  );
}
