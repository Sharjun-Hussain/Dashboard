import { Offices } from "@/lib/DemoData/TableData/Offices"
import { DataTable } from "../components/Custom/DataTable/data-table"
import {  columns } from "./components/DataTable/columns"
// import { DataTable } from "./components/DataTable/data-table"



export default async function WareHouses() {
  // const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={Offices} />
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  )
}
