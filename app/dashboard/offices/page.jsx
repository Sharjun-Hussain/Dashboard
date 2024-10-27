"use client";

import CustomCard from "../components/Custom/Card/card";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CheckCheck, PenOff, Plus, Send, ToggleRight } from "lucide-react";
import AddOfficeModal from "./components/addbranchmodal";
import { OfficeTable } from "./components/DataTable/officeTable";
axios.defaults.withCredentials = true;

export default function DemoPage() {
  const [Offices, setOffices] = useState([]);
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false)

  const handleChildData = (office) => {
    setOffices((prev) => [...prev, office]);
  };

  const handleDelete = (officeId) => {
    setOffices((prev) => prev.filter((office) => office.id !== officeId));
  };

  useEffect(() => {
    const fetchOffice = async () => {
      setloading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/office`, {
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
    <div>
      <div className="flex ">
        <Breadcrumbs />
      </div>

      <div className="container mx-auto">
        <CustomCard
          title="Branches and Offices"
          description="Manage your Branch offices here"
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
              <OfficeTable
                onDelete={handleDelete}
                data={Offices}
                loading={loading}
              />
            </div>
          </div>
          <AddOfficeModal sendDatatoParent={handleChildData} OpenModal={OpenModal} setOpenModal={setOpenModal} />
        </CustomCard>
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </div>
  );
}
