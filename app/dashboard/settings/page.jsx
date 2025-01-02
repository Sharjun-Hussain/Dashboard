"use client";

import CustomCard from "../components/Custom/Card/card";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CheckCheck, PenOff, Plus, Send, ToggleRight } from "lucide-react";

import useMediaQuery from "@/Hooks/useMediaQuery";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
axios.defaults.withCredentials = true;

export default function DemoPage() {
  const [SystemName, setSystemName] = useState(
    "Railway Asset Management System"
  );
  const [HeadOffice, setHeadOffice] = useState("");
  const [SystemMail, setSystemMail] = useState("mail.softexpertz@gmail.com");
  const [CompanyName, setCompanyName] = useState("SoftXpertz (PVT) Ltd");

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="space-y-3">
      <div className=" w-full ">
        <div className="gap-4">
          <Label htmlFor="name" className="text-right">
            System Name
          </Label>
          <Input
            id="name"
            value={SystemName}
            onChange={(e) => setSystemName(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className=" w-full ">
        <div className="gap-4">
          <Label htmlFor="name" className="text-right">
            Head Office
          </Label>
          <Input
            id="name"
            value={HeadOffice}
            onChange={(e) => setHeadOffice(e.target.value)}
          />
        </div>
      </div>
      <div className=" w-full ">
        <div className="gap-4">
          <Label htmlFor="name" className="text-right">
            System Mail
          </Label>
          <Input
            id="name"
            value={SystemMail}
            onChange={(e) => setSystemMail(e.target.value)}
          />
        </div>
      </div>
      <div className=" w-full ">
        <div className="gap-4">
          <Label htmlFor="name" className="text-right">
            Company Name
          </Label>
          <Input
            id="name"
            value={CompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
      </div>
      <Button className="flex justify-self-end w-[100px]">Save</Button>
    </div>
  );
}
