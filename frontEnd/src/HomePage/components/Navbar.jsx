import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full box-border bg-white border-b border-gray-200 shadow-md">
      <div className="flex justify-between items-center px-10 py-5">

        <Link to="/" className="font-bold text-[1.75rem] no-underline text-black">
          Car<span className="text-indigo-500">Share</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/signup"
            className="px-[18px] py-2 border-2 border-indigo-500 rounded-xl text-indigo-500 font-medium no-underline transition-colors duration-300 hover:bg-indigo-800 hover:text-white"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-[18px] py-2 border-2 border-indigo-500 rounded-xl text-indigo-500 font-medium no-underline transition-colors duration-300 hover:bg-indigo-500 hover:text-white"
          >
            Login
          </Link>
        </div>

      </div>
    </header>
  );
}