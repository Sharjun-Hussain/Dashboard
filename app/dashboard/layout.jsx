
import Header from "./components/Navigation/Header";
import Navbar from "./components/Navigation/HorizontalNavBar";
import Sidebar from "./components/Navigation/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div >
      <Header />
      <Navbar />
      <main className=" flex-1 w-[90%] mx-auto my-4">{children}</main>
    </div>
  );
}
