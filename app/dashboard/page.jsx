import React from "react";
import Breadcrumbs from "./components/Custom/Breadcrumb/Breadcrumbs";
import CustomCard from "./components/Custom/Card/card";
import { DataTable } from "./components/Custom/DataTable/data-table";
import { columns } from "./offices/components/DataTable/columns";
import { Offices } from "@/lib/DemoData/TableData/Offices";



const DashboardPage = () => {
  return (
    <div className="">
      <div className="flex ">
        {" "}
        <h1>Dashboard</h1>
        <div className="ms-auto">
          <Breadcrumbs />
        </div>
      </div>

      <div className=" flex gap-4  flex-col md:flex-row">
        <CustomCard className="w-full md:w-4/6 xl:w-1/3" title="Stats" />
        <CustomCard  className="w-full md:w-2/6 xl:w-1/3" title="Hello " />
        <CustomCard  className="w-full md:w-2/6 xl:w-1/3" title="Hello " />
   
      </div>
      <div className=" flex  gap-4  flex-col md:flex-row">
        <CustomCard className="w-full md:w-2/3" title="Stats">
        <DataTable columns={columns}  data={Offices}  />
        </CustomCard>
      </div>
    </div>
  );
};

export default DashboardPage;
