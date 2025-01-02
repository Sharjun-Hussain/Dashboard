import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const page = () => {
  return (
    <div className=" max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Configuration</h1>

      {/* Backend API URL Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="api-url" className="text-md font-medium">
            Backend API URL:
          </Label>
          <div className="flex w-[70%] space-x-4">
            <Input
              className="flex-1"
              id="api-url"
              defaultValue="125.133.122.11"
            />
            <Button>Save</Button>
          </div>
        </div>

        {/* API Key Section */}
        <div className="flex items-center justify-between">
          <Label htmlFor="api-key" className="text-md font-medium">
            API Key:
          </Label>
          <div className="flex w-[70%] space-x-4">
            <Input
              className="flex-1"
              id="api-key"
              defaultValue="XXX-XXXX-XXXXXXXXXXX-XXXXXXX"
            />
            <Button>Save</Button>
          </div>
        </div>

        {/* API Host Section */}
        <div className="flex items-center justify-between">
          <Label htmlFor="api-host" className="text-md font-medium">
            API Host:
          </Label>
          <div className="flex w-[70%] space-x-4">
            <Input
              className="flex-1"
              id="api-host"
              defaultValue="api.example.com"
            />
            <Button>Save</Button>
          </div>
        </div>

        {/* API Port Section */}
        <div className="flex items-center justify-between">
          <Label htmlFor="api-port" className="text-md font-medium">
            API Port:
          </Label>
          <div className="flex w-[70%] space-x-4">
            <Input className="flex-1" id="api-port" defaultValue="8080" />
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
