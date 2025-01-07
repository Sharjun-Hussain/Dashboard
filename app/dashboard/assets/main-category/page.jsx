"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomCard from "../../components/Custom/Card/card";
import { MainCategoryTable } from "./components/DataTable/MainCategoryTable";
import MainCategoryModal from "./components/MainCategoryModal";

axios.defaults.withCredentials = true;

export default function DemoPage() {
  const [mainCategory, setMainCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChildData = (mainCategory) => {
    console.log(mainCategory);
    if (!mainCategory) {
      console.log("No data to update or create.");
      return;
    }

    if (mainCategory.length === 0) {
      setMainCategory(mainCategory);
      return;
    }

    setMainCategory((prevCategories) => {
      const categoryIndex = prevCategories.findIndex(
        (category) => category.id === mainCategory.id
      );

      // Changed condition from categoryIndex > 0 to categoryIndex !== -1
      if (categoryIndex !== -1) {
        // Update existing category
        const updatedCategories = [...prevCategories];
        updatedCategories[categoryIndex] = mainCategory;
        return updatedCategories;
      } else {
        // Add new category
        return [...prevCategories, mainCategory];
      }
    });
  };

  const handleDelete = (categoryId) => {
    setMainCategory((prev) =>
      prev.filter((category) => category.id !== categoryId)
    );
  };

  useEffect(() => {
    const fetchMainCategory = async () => {
      try {
        setLoading(true);
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

        if (res.status === 200) {
          console.log(res.data);
          setMainCategory(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching main categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMainCategory();
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="flex md:flex-row flex-col">
          <div className="flex flex-col">
            <h2 className="text-sm md:text-xl font-bold">Main Category</h2>
            <h2 className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-400">
              Manage your Main Category Here
            </h2>
          </div>
          <div className="md:ms-auto w-full md:w-auto">
            <Button
              className="pe-2 ps-1"
              onClick={() => setOpenModal(true)}
              variant="outline"
            >
              <Plus size={15} className="me-1" />
              Add Main Category
            </Button>
          </div>
        </div>

        <div>
          <div>
            <MainCategoryTable
              onDelete={handleDelete}
              data={mainCategory}
              loading={loading}
              onUpdate={handleChildData}
            />
          </div>
        </div>
        <MainCategoryModal
          onUpdate={handleChildData}
          OpenModal={openModal}
          setOpenModal={setOpenModal}
        />
      </div>
    </div>
  );
}
