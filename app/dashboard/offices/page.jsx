import { Offices } from "@/lib/DemoData/TableData/Offices"
import { DataTable } from "../components/Custom/DataTable/data-table"
import {  columns } from "./components/DataTable/columns"
import CustomCard from "../components/Custom/Card/card"
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

export default async function DemoPage() {
  // const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <CustomCard title="Branches and Offices" className="">

      <DataTable columns={columns} data={Offices}  />
      </CustomCard>
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  )
}
