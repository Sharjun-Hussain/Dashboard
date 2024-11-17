import { Terminal } from "lucide-react";
import React from "react";

const CustomAlert = ({
  type,
  name,
  className,
  alert,
  description,
  element,
}) => {
  return (
    <div
      className={`border p-3 rounded-lg my-2 border-black dark:border-pink-700 ${className}`}
    >
      <div>
        <div className="flex items-center justify-between space-x-2 ">
          <div className="flex space-x-2 items-center">
            <Terminal size={32} />
            <div className="flex flex-col">
              <h1>{alert}</h1>
              <h1>{description}</h1>
            </div>
          </div>
          <div className={`ms-auto  ${type ==="warning" ? "text-yellow-600" : `text-green-400`}  `}>{element}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
