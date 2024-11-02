

import Header from "./components/Navigation/Header";
import Navbar from "./components/Navigation/HorizontalNavBar";
import Sidebar from "./components/Navigation/Sidebar";
// import CreativeShapeLoader from "@/components/loaders/loader";

export default function DashboardLayout({ children }) {
  // const { data: session, status } = useSession()

  // if (status === "loading") {
  //   return <CreativeShapeLoader/>
  // }

  
  // if (status === "unauthenticated") {
  //   return <p>Access Denied</p>
  // }

  return (
    <div >
      <Header />
      <Navbar />
      <main className=" flex-1 w-[90%] mx-auto my-4">{children}</main>
    </div>
  );
}
