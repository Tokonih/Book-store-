import { memo, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const data = [
  {
    massage: "Don't have an account?",
    link: "/auth/register",
    title: "Sign Up",
  },
  {
    massage: "Already have an account?",
    link: "/auth/login",
    title: "Sign In",
  },
];

interface WrapperProps {
  children: ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  const { pathname } = useLocation();

  const isSignUpPath = pathname.split("/")[2] === "register";
  const selectedData = data[isSignUpPath ? 1 : 0];

  return (
    <div className="h-[100vh] relative flex items-center justify-center">
      <Toaster position="bottom-left" />
      <div className="flex justify-between p-6 absolute top-0 left-0 right-0">
        <div className="flex items-center gap-3">
          <h2 className="hidden sm:block text-xl font-bold text-gray-900">
            logo
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden sm:block whitespace-nowrap">
            {selectedData.massage}
          </p>
          <Link
            to={selectedData.link}
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            {selectedData.title}
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}

export default memo(Wrapper);
