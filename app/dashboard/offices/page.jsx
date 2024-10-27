"use client";
import { Offices } from "@/lib/DemoData/TableData/Offices";
import { DataTable } from "../components/Custom/DataTable/data-table";
import { columns } from "./components/DataTable/columns";
import CustomCard from "../components/Custom/Card/card";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";
import UsersModal from "../roles/Add-Edit-Users";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CheckCheck, PenOff, Send, ToggleRight } from "lucide-react";
import AddOfficeModal from "./components/addbranchmodal";
axios.defaults.withCredentials = true;
// import { DataTable } from "./components/DataTable/data-table"

export default function DemoPage() {
  const [Offices, setOffices] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchOffice = async () => {
      setloading(true)
      const res = await axios.get("http://128.199.31.7/api/admin/office", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withXSRFToken: true,
        withCredentials: true,
      });

      if (res.status == 200) {
        console.log(res.data);
        setOffices(res.data.data)
        setloading(false)
      }
    };
    fetchOffice();
  }, []);

  console.log("office data " + Offices);
  

  // const data = await getData()

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
                <AddOfficeModal />
              </div>
              {/* <Button className=" ms-auto" variant="outline" ><Plus size={14} className='me-[2px]'/> Add Users</Button> */}
            </div>
            <div>
              <DataTable  columns={columns} data={Offices} loading={loading} />
            </div>
          </div>
        </CustomCard>
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </div>
  );
}
