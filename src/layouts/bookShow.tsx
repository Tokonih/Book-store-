import { memo, ReactNode } from "react";

interface BookshowProps {
  children?: ReactNode;
}

function Bookshow({ children }: BookshowProps) {
  return (
    <div className="w-full p-6 mb-5">
      <div className="flex items-center justify-between mb-6">
        <p className="font-serif italic text-xl font-medium">Best seller</p>
        <button className="text-lg text-black underline font-sans font-normal hover:text-gray-700">
          See all
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default memo(Bookshow);
