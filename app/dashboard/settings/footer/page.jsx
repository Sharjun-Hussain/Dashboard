import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <Label htmlFor="footer" className="text-lg font-medium">
          Footer Content :
        </Label>
        <div className="flex w-[70%] space-x-4">
          <Input
            className="flex-1"
            id="footer"
            value="Powered By SoftExpertz (PVT) Ltd"
          />
          <Button>Save</Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="footer" className="text-lg font-medium">
          Copyright :
        </Label>
        <div className="flex w-[70%] space-x-4">
          <Input className="flex-1" id="footer" value="2025" />
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
