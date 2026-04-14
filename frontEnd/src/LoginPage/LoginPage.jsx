import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AuthSidePanel from "../shared/AuthSidePanel";

function BrandMark() {
  return (
    <Link to="/" className="font-display font-bold text-xl no-underline text-on-surface">
      Drive<span className="text-primary">Share</span>
    </Link>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-surface-lowest">
      <div className="flex flex-col w-full lg:w-1/2 px-8 md:px-16 py-10">
        <BrandMark />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[400px]">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 sticky top-0 h-screen">
        <AuthSidePanel />
      </div>
    </div>
  );
}
