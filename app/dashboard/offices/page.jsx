"use client";
import { Offices } from "@/lib/DemoData/TableData/Offices";
import { DataTable } from "../components/Custom/DataTable/data-table";
import { columns } from "./components/DataTable/columns";
import CustomCard from "../components/Custom/Card/card";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";
import UsersModal from "../roles/Add-Edit-Users";
import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
// import { DataTable } from "./components/DataTable/data-table"

export default function DemoPage() {
  const [Offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchOffice = async () => {
      const res = await axios.get("http://128.199.31.7/api/admin/office",
        {
          headers:{
            'Authorization':`Bearer ${localStorage.getItem("token")}`
          },withXSRFToken:true,withCredentials:true
        }
      );

      if (res.status == 200) {
        console.log(res.data);
      }
    };
    fetchOffice()
  }, []);

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
          <DataTable columns={columns} data={Offices} />
        </CustomCard>
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </div>
  );
}
