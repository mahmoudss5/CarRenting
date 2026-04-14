import { Link } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import AuthSidePanel from "../shared/AuthSidePanel";

function BrandMark() {
  return (
    <Link to="/" className="font-display font-bold text-xl no-underline text-on-surface">
      Drive<span className="text-primary">Share</span>
    </Link>
  );
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen bg-surface-lowest">
      <div className="flex flex-col w-full lg:w-1/2 px-8 md:px-16 py-10 overflow-y-auto">
        <BrandMark />
        <div className="flex-1 flex items-start lg:items-center justify-center pt-8 lg:pt-0">
          <div className="w-full max-w-[420px]">
            <SignupForm />
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 sticky top-0 h-screen">
        <AuthSidePanel />
      </div>
    </div>
  );
}
