"use client";

import CustomCard from "../components/Custom/Card/card";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CheckCheck, PenOff, Plus, Send, ToggleRight } from "lucide-react";

import useMediaQuery from "@/Hooks/useMediaQuery";
axios.defaults.withCredentials = true;

export default function DemoPage() {
  const [Offices, setOffices] = useState([]);
  const [loading, setloading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      <div className="flex "></div>
    </div>
  );
}
