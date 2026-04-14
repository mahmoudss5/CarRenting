import Footer from "../footer";
import { useState } from "react";
import { INITIAL_USERS, INITIAL_CAR_POSTS } from "./mockData";
import AdminNavbar from "./components/AdminNavbar";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(12482);
  const [totalActiveCars, setTotalActiveCars] = useState(3105);
  const [pendingUsers, setPendingUsers] = useState(INITIAL_USERS);
  const [pendingCarPosts, setPendingCarPosts] = useState(INITIAL_CAR_POSTS);

  const pendingCount = pendingUsers.length + pendingCarPosts.length;

  const handleApproveUser = (id) => {
    setTotalUsers((p) => p + 1);
    setPendingUsers((p) => p.filter((u) => u.id !== id));
  };
  const handleRejectUser = (id) => setPendingUsers((p) => p.filter((u) => u.id !== id));
  const handleApproveCar = (id) => {
    setTotalActiveCars((p) => p + 1);
    setPendingCarPosts((p) => p.filter((c) => c.id !== id));
  };
  const handleRejectCar = (id) => setPendingCarPosts((p) => p.filter((c) => c.id !== id));

  return (
    <>
      <AdminNavbar />
      <div className="bg-[#f8f9fb] min-h-screen p-10">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <h1 className="text-[2rem] font-extrabold text-red-500 mb-2 ">
            Admin Approval Console v2 
          </h1>
          <p className="text-gray-500 mb-8">
            Review and manage incoming platform requests to maintain the high standards of the CarShare mobility fleet.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 mb-10">

            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <p className="text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">Total Users</p>
              <div className="flex items-center gap-3">
                <span className="text-[2rem] font-extrabold text-gray-900">{totalUsers.toLocaleString('en-US')}</span>
                <span className="text-sm text-emerald-500 font-semibold">+12%</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <p className="text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">Total Active Cars</p>
              <div className="flex items-center gap-3">
                <span className="text-[2rem] font-extrabold text-gray-900">{totalActiveCars.toLocaleString('en-US')}</span>
                <span className="text-sm text-emerald-500 font-semibold">+5.2%</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <p className="text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">Pending Approvals</p>
              <div className="flex items-center gap-3">
                <span className="text-[2rem] font-extrabold text-gray-900">{pendingCount}</span>
                <span className="text-xs bg-amber-100 text-amber-600 font-semibold px-2.5 py-1 rounded-full">Requires Action</span>
              </div>
            </div>

          </div>

          {/* Manage Users */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] mb-8">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[1.25rem] font-extrabold text-gray-900">Manage Users</h2>
              <span className="text-indigo-500 font-semibold text-[0.9rem] cursor-pointer hover:underline">View All Users</span>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  {["OWNER NAME", "EMAIL ADDRESS", "DATE REGISTERED", "ACTIONS"].map((h) => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 tracking-widest pb-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((u) => (
                  <tr key={u.id} className="border-b border-gray-50">
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-500 text-xs">
                        {u.ownerName.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-900">{u.fullName}</span>
                    </td>
                    <td className="text-gray-500 text-[0.9rem]">{u.email}</td>
                    <td className="text-gray-500 text-[0.9rem]">{u.dateRequested}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveUser(u.id)}
                          className="px-4 py-1.5 rounded-lg border border-indigo-500 bg-white text-indigo-600 font-semibold cursor-pointer text-sm transition-colors hover:bg-indigo-100"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectUser(u.id)}
                          className="px-4 py-1.5 rounded-lg border border-red-300 bg-white text-red-500 font-semibold cursor-pointer text-sm transition-colors hover:bg-red-50"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Manage Car Posts */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[1.25rem] font-extrabold text-gray-900">Manage Car Posts</h2>
              <div className="flex gap-2">
                <span className="bg-indigo-500 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold">Pending ({pendingCarPosts.length})</span>
                <span className="bg-gray-100 text-gray-500 px-3.5 py-1.5 rounded-full text-xs font-semibold">Approved</span>
              </div>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  {["STATUS", "CAR MODEL", "OWNER", "DATE SUBMITTED", "ACTIONS"].map((h) => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 tracking-widest pb-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pendingCarPosts.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50">
                    <td className="py-4">
                      <span className="bg-amber-100 text-amber-600 text-xs font-bold px-2.5 py-1 rounded-md">PENDING</span>
                    </td>
                    <td className="font-semibold text-gray-900">{c.carModel}</td>
                    <td className="text-gray-500 text-[0.9rem]">{c.owner}</td>
                    <td className="text-gray-500 text-[0.9rem]">{c.dateSubmitted}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="px-3.5 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold cursor-pointer text-sm transition-colors hover:bg-gray-100">
                          Review
                        </button>
                        <button
                          onClick={() => handleApproveCar(c.id)}
                          className="px-4 py-1.5 rounded-lg border border-indigo-500 bg-white text-indigo-600 font-semibold cursor-pointer text-sm transition-colors hover:bg-indigo-100"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectCar(c.id)}
                          className="px-4 py-1.5 rounded-lg border border-red-300 bg-white text-red-500 font-semibold cursor-pointer text-sm transition-colors hover:bg-red-50"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}