import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagramSquare, FaPhone } from "react-icons/fa";
import { MdAddLocationAlt, MdAttachEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="h-600px 2xl:h-[350px] bg-gray-200 mt-5 px-12">
      <div className="max-w-[1300px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-auto h-full gap-3 py-6">
        <div className="flex items-center w-full">
          <Link href="">
            <div className="tracking-wide flex flex-col gap-5 text-gray-600">
              <h1 className="text-center text-[25px] text-red-600 font-semibold">
                Contact
              </h1>
              <div className="flex items-center ">
                <span>
                  <MdAttachEmail />
                </span>
                <span className="ml-[9px] mb-[6px]">
                  tdminh334546@gmail.com
                </span>
              </div>

              <div className="flex items-center">
                <span>
                  <FaFacebook />
                </span>
                <span className="ml-3">facebook</span>
              </div>
              <div className="flex items-center">
                <span>
                  <FaPhone />
                </span>
                <span className="ml-2">+84 9338119296</span>
              </div>
              <div className="flex items-center">
                <span>
                  <MdAddLocationAlt />
                </span>
                <span className="ml-2"> Ho Chi Minh City</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link href="" className="w-full">
            <div className="tracking-wide flex flex-col  gap-5 text-gray-600 ml-6">
              <h1 className="text-[25px] text-red-600 font-semibold">
                Company
              </h1>
              <span>About us</span>
              <span>Blogs</span>
              <span>Active</span>
              <span>Contact us</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link href="" className="w-full">
            <div className="tracking-wide flex flex-col  gap-5 text-gray-600 ml-6">
              <h1 className="text-[25px] text-red-600 font-semibold">Shop</h1>
              <span>News arrival</span>
              <span>Men</span>
              <span>Women</span>
              <span>Featured</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <Link href="" className="w-full">
            <div className="tracking-wide flex flex-col  gap-5 text-gray-600 ml-6">
              <h1 className="text-[25px] text-red-600 font-semibold">Help</h1>
              <span>Customer service</span>
              <span>My account</span>
              <span>Find a shop</span>
              <span>Gift card</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-full">
          <div className="tracking-wide flex flex-col  gap-3 text-gray-600 ml-6">
            <h1 className="text-[25px] text-red-600 font-semibold">Payment</h1>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            <div className="flex">
              <div className="bg-slate-300 h-[35px] w-1/2 rounded-md">
                <input
                  type="text"
                  className="bg-transparent border-none h-full w-full outline-none"
                />
              </div>
              <button className="ml-2 rounded-md bg-dm w-1/3 text-white">
                Join
              </button>
            </div>
            <h3>Secure payment</h3>
            <div className="flex">
              <img
                src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8"
                alt=""
              />
              <img
                src="https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06"
                alt=""
                className="mx-3"
              />
              <img
                src="https://down-vn.img.susercontent.com/file/b8348201b4611fc3315b82765d35fc63"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
