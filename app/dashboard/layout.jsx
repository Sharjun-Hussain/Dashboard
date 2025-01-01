"use client";

import { useSession } from "next-auth/react";
import Header from "./components/Navigation/Header";

import Sidebar from "./components/Navigation/Sidebar";
import CreativeShapeLoader from "@/components/loaders/loader";
import { Navbar } from "./components/Navigation/HorizontalNavBar";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <CreativeShapeLoader />;
  }

  return (
    <div>
      <Header />
      <Navbar />
      <main className=" flex-1 w-[90%] mx-auto my-4">{children}</main>
    </div>
  );
}
