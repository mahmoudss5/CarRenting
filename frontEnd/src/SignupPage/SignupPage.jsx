import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import SignupForm from "./components/SignupForm";
import AuthSidePanel from "../shared/AuthSidePanel";

function BrandMark() {
  return (
    <Link to="/" className="flex items-center gap-2 no-underline">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <Car size={16} className="text-white" strokeWidth={2} />
      </div>
      <span className="font-display font-bold text-xl text-on-surface">
        Drive<span className="text-primary">Share</span>
      </span>
    </Link>
  );
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen bg-surface-lowest">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col w-full lg:w-1/2 px-8 md:px-16 py-10 overflow-y-auto"
      >
        <BrandMark />
        <div className="flex-1 flex items-start lg:items-center justify-center pt-8 lg:pt-0">
          <div className="w-full max-w-[420px]">
            <SignupForm />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="hidden lg:block lg:w-1/2 sticky top-0 h-screen"
      >
        <AuthSidePanel />
      </motion.div>
    </div>
  );
}
