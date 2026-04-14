import { Link } from "react-router-dom";
import Navbar from "../HomePage/components/Navbar";
import Footer from "../footer";

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f5f5ff]">
        <div className="bg-white p-12 rounded-3xl shadow-[0_8px_32px_rgba(99,102,241,0.1)] w-full max-w-md">
          <h2 className="text-[1.75rem] font-extrabold text-[#1e1b4b] mb-2">
            Create account
          </h2>
          <p className="text-gray-500 mb-8">Join CarShare today</p>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full name"
              className="px-4 py-3 rounded-xl border-2 border-gray-200 text-base outline-none focus:border-indigo-500 transition-colors"
            />
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-3 rounded-xl border-2 border-gray-200 text-base outline-none focus:border-indigo-500 transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-3 rounded-xl border-2 border-gray-200 text-base outline-none focus:border-indigo-500 transition-colors"
            />
            <button className="mt-2 bg-indigo-500 text-white py-3.5 rounded-xl text-base font-bold cursor-pointer hover:bg-indigo-600 transition-colors">
              Sign Up
            </button>
          </div>

          <p className="text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 font-semibold no-underline hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}