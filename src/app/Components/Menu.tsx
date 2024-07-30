"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
const Menu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <MdMenu
        size={35}
        className="cursor-pointer "
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-slate-700 text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center gap-4 text-xl z-10 ">
          <Link className="mt-5" href="/">
            HomePage
          </Link>
          <Link href="/">Shop</Link>
          <Link href="/">Contact</Link>
          <Link href="/">About</Link>
          <Link href="/">Logout</Link>
          <Link href="/">Cart</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
