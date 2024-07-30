"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/List?name=${name}`);
    }
  };

  return (
    <form
      className="bg-gray-200 p-2 rounded-md flex items-center justify-between flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="bg-transparent h-full flex-1 outline-none"
      />
      <button type="submit" className="cursor-pointer">
        <IoSearchOutline />
      </button>
    </form>
  );
};

export default Search;
