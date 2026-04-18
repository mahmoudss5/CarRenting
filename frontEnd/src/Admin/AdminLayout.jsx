import Navbar from "../shared/components/Navbar";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f8]">
      <Navbar />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 min-w-0 px-8 lg:px-12 py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
