import React from "react";
import Breadcrumbs from "./components/Custom/Breadcrumb/Breadcrumbs";
import CustomCard from "./components/Custom/Card/card";
import CustomAlert from "./components/Custom/Alert/Alert";
import { AlertCircle, Bell } from "lucide-react";
import BarChart from "./components/Charts/Barchart";
import Doughnut from "./components/Charts/dognut";
import AssetInventoryDashboard from "./components/inventory";
import AssetComponent from "./components/inventory";
import ElegantCardComponent from "./components/inventory";

const DashboardPage = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 3000, 5000, 24000],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Green
          "rgba(255, 159, 64, 0.6)", // Orange
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(153, 102, 255, 0.6)", // Purple
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="">
      <div className="flex ">
        {" "}
        <Breadcrumbs />
        <div className="ms-auto"></div>
      </div>

      <CustomCard>{/* <ElegantCardComponent /> */}</CustomCard>
      <div className=" flex gap-4   flex-col md:flex-row">
        <CustomCard
          element={<Bell className="mx-2" strokeWidth={3} size={18} />}
          className="w-full flex  md:w-4/6 xl:w-2/3"
          title="Notifications"
        >
          <div>
            <CustomAlert
              type="warning"
              element={<AlertCircle />}
              alert="You can add your custom alert"
              description="This is sample description This is sample descriptionThis is sample description "
            />
            <CustomAlert
              type="warning"
              element={<AlertCircle />}
              alert="You can add your custom alert"
              description="This is sample description This is sample descriptionThis is sample description "
            />
            <CustomAlert
              type="success"
              element={<AlertCircle />}
              alert="You can add your custom alert"
              description="This is sample description This is sample descriptionThis is sample description "
            />
          </div>
        </CustomCard>

        <CustomCard
          className="w-full md:w-2/6 xl:w-1/3"
          title="Recent Good Issues "
        >
          <Doughnut data={data} />
        </CustomCard>
      </div>
      <div className=" flex  gap-4  flex-col md:flex-row">
        <CustomCard className="w-full md:w-full h-[400px]" title="Stats">
          <BarChart data={data} />
        </CustomCard>
      </div>
    </div>
  );
};

export default DashboardPage;
