"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { use } from "react";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams); // Tạo một đối tượng URLSearchParams mới với các tham số hiện tại
    params.set(name, value); // Cập nhật hoặc thêm tham số mới
    replace(`${pathname}?${params.toString()}`); // Thay đổi URL mà không tải lại trang
  };
  return (
    <div className="mt-7 flex justify-center px-3 mx-auto mb-6">
      <div className="flex gap-6">
        <select
          name="type"
          id=""
          className="py-3 px-5 rounded-2xl text-xs font-medium bg-[#EBEDBD] outline-none"
          onChange={handleFilter}
        >
          <option value="">Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="outline-none rounded-2xl p-2 ring-1 ring-gray-500 "
          onChange={handleFilter}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="outline-none rounded-2xl p-2 ring-1 ring-gray-500 "
          onChange={handleFilter}
        />
        <select
          name="cat"
          id=""
          className="py-3 px-6 rounded-2xl text-xs font-medium bg-[#EBEDBD] outline-none"
          onChange={handleFilter}
        >
          <option value="">Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <select
          name="product"
          id=""
          className="py-3 px-8 rounded-2xl text-xs font-medium bg-[#EBEDBD] outline-none"
          onChange={handleFilter}
        >
          <option value="">Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>

        <select
          name="sort"
          id=""
          className="py-3 px-12 rounded-2xl text-xs font-medium bg-slate-200 outline-none"
          onChange={handleFilter}
        >
          <option value="">Sort By</option>
          <option value="asc price">Price (low to hight)</option>
          <option value="desc price">Price (hight to low)</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
