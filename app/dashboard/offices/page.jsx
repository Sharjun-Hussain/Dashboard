'use client'
import { Offices } from "@/lib/DemoData/TableData/Offices"
import { DataTable } from "../components/Custom/DataTable/data-table"
import {  columns } from "./components/DataTable/columns"
import CustomCard from "../components/Custom/Card/card"
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs"
import UsersModal from "../roles/Add-Edit-Users"
import { useEffect, useState } from "react"
import axios from "axios"
// import { DataTable } from "./components/DataTable/data-table"


// async function getData() {
//   // Fetch data from your API here.
//   return [
    
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
   

//     // ...
//   ]
// }

// eslint-disable-next-line @next/next/no-async-client-component
export default function DemoPage() {

  const [Offices, setOffices] = useState([]);
  useEffect(() => {
    
    const fetchOffice = async () =>{
      await axios.get("http://128.199.31.7/api/admin/office")
    }
  }, [])
  
  // const data = await getData()

  return (
    <div>
      <div className="flex ">
        <Breadcrumbs />
       
      </div>

    <div className="container mx-auto">
      <CustomCard title="Branches and Offices" description="Manage your Branch offices here" className="">

      <DataTable columns={columns} data={Offices}   />
      </CustomCard>
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
    </div>
  )
}
