"use client";

import CustomCard from "../components/Custom/Card/card";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CheckCheck, PenOff, Plus, Send, ToggleRight } from "lucide-react";
import { ProductTable } from "./Components/DataTable/ProductTable";

axios.defaults.withCredentials = true;

export default function ProductPage() {
  const [Offices, setOffices] = useState([]);
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false)

  const handleChildData = (office) => {
    setOffices((prevOffices) => {
      const officeIndex = prevOffices.findIndex((o) => o.id === office.id);
      if (officeIndex >= 0) {
        // Update existing office
        const updatedOffices = [...prevOffices];
        updatedOffices[officeIndex] = office;
        return updatedOffices;
      } else {
        // Add new office
        return [...prevOffices, office];
      }
    });
  };


  const handleDelete = (officeId) => {
    setOffices((prev) => prev.filter((office) => office.id !== officeId));
  };

  useEffect(() => {
    const fetchOffice = async () => {
      setloading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withXSRFToken: true,
        withCredentials: true,
      });

      if (res.status == 200) {
        console.log(res.data);
        setOffices(res.data.data);
        setloading(false);
      }
    };
    fetchOffice();
  }, []);

  return (
    <div className="-mt-9">
      <div className="container mx-auto">
        <CustomCard
          title="Goods & Items"
          description="Manage your Goods & Items here"
          className=""
        >
          <div>
            <div className="flex">
              <div className="flex justify-start space-x-1">
                <Button variant="outline">
                  {" "}
                  <CheckCheck size={14} className="me-[2px]" /> All
                </Button>
                <Button variant="outline">
                  <Send size={14} className="me-[2px]" /> Invited
                </Button>
                <Button variant="outline">
                  <ToggleRight size={14} className="me-[2px]" /> Disabled
                </Button>
                <Button variant="outline">
                  <PenOff size={14} className="me-[2px]" /> Resticted
                </Button>
              </div>
              <div className="ms-auto">
              <Button className="pe-2 ps-1" onClick={() => setOpenModal(true)} variant="outline">

                  {" "}
                  <Plus size={15} className="me-1" />
                  Add Branch Office
                </Button>
                {/* <AddOfficeModal sendDatatoParent={handleChildData} /> */}
              </div>
              {/* <Button className=" ms-auto" variant="outline" ><Plus size={14} className='me-[2px]'/> Add Users</Button> */}
            </div>
            <div>
              <ProductTable
                onDelete={handleDelete}
                data={Offices}
                loading={loading}
                onUpdate={handleChildData}
              />
            </div>
          </div>
          {/* <AddOfficeModal onUpdate={handleChildData}  OpenModal={OpenModal} setOpenModal={setOpenModal} /> */}
        </CustomCard>
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </div>
  );
}
