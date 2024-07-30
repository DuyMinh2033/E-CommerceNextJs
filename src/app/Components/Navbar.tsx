import Menu from "@/app/Components/Menu";
import Search from "@/app/Components/Search";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { TbShoppingCartHeart } from "react-icons/tb";
import Navicons from "@/app/Components/Nabicons";

const Navbar = () => {
  return (
    <div className="h-20 relative max-w-[1300px] mx-auto ">
      <div className="h-full flex justify-between items-center  md:hidden">
        {/* mobile */}
        <Link href={""}>
          <div className="text-2xl tracking-wide">TDM</div>
        </Link>
        <Menu />
      </div>
      {/* Bigger */}
      <div
        className="hidden md:grid grid-cols-2 lg:grid-cols-3 h-full"
        style={{ gridTemplateColumns: "100px 1fr 250px" }}
      >
        <div className="flex items-center text-[30px]">
          <div className="mr-1">
            <TbShoppingCartHeart />
          </div>
          <Link href={"/"}>
            <div className="tracking-wide">TDM</div>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="hidden lg:flex w-1/2 justify-around items-center text-[19px] font-normal">
            <Link className="" href="/">
              HomePage
            </Link>
            <Link href="/">Shop</Link>
            <Link href="/">Contact</Link>
            <Link href="/">About</Link>
          </div>
          <Search />
        </div>

        <div className="flex items-center justify-center">
          <Navicons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
