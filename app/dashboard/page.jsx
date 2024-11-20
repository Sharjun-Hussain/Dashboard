import React from "react";
import Breadcrumbs from "./components/Custom/Breadcrumb/Breadcrumbs";
import CustomCard from "./components/Custom/Card/card";
import CustomAlert from "./components/Custom/Alert/Alert";
import { AlertCircle, Bell } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="">
      <div className="flex ">
        {" "}
        <Breadcrumbs />
        <div className="ms-auto"></div> 
      </div>

      <div className=" flex gap-4  flex-col md:flex-row">
        <CustomCard element={<Bell className="mx-2"strokeWidth={3} size={18}/>} className="w-full md:w-4/6 xl:w-2/3" title="Notifications" >
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

        <CustomCard className="w-full md:w-2/6 xl:w-1/3" title="Recent Good Issues " >
        
        </CustomCard>
      </div>
      <div className=" flex  gap-4  flex-col md:flex-row">
        <CustomCard className="w-full md:w-2/3" title="Stats">
          <barCharrrrt />
        </CustomCard>
      </div>
    </div>
  );
};

export default DashboardPage;
