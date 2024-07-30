"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface IProps {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}
const Pagination: React.FC<IProps> = ({ currentPage, hasPrev, hasNext }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const createPageURl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  console.log({
    pathname,
    searchParams,
  });
  if (pathname != "/List") {
    return null;
  }
  return (
    <div className="flex justify-center w-full">
      <button
        className="bg-gray-400 text-white px-5 py-2 rounded-md font-medium"
        onClick={() => createPageURl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="bg-pink-500 text-white px-7 py-2 rounded-md ml-5 font-medium"
        onClick={() => createPageURl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
