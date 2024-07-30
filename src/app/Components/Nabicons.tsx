"use client";
import CartModal from "@/app/Components/CartModal";
import { useWinxClient } from "@/app/hooks/useWinxClient";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useCartStore } from "@/app/hooks/useCartStore";
const Navicons = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const winxClient = useWinxClient();
  const isLoginIn = winxClient.auth.loggedIn();

  const { cart, getCart, counter } = useCartStore();
  useEffect(() => {
    getCart(winxClient);
  }, [winxClient, getCart]);
  console.log("cart", cart);

  const hadleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await winxClient.auth.logout(window.location.href);
    toast.info("Logout success");
    setIsLoading(false);
    setOpenProfile(false);
  };

  const handleProfile = () => {
    if (!isLoginIn) {
      router.push("/login");
    } else {
      setOpenProfile((prev) => !prev);
    }
  };

  //authLogin
  // const winxClient = useWinxClient();
  // const login = async () => {
  //   const loginData = winxClient.auth.generateOAuthData(
  //     "http://localhost:3000"
  //   );
  //   console.log(loginData);
  //   localStorage.setItem("oAthRedirectData", JSON.stringify(loginData));
  //   const { authUrl } = await winxClient.auth.getAuthUrl(loginData);
  //   window.location.href = authUrl;
  // };

  return (
    <div className="flex items-center gap-5 cursor-pointer relative">
      <FaRegUser
        size={21}
        onClick={handleProfile}
        // onClick={() => login()}
      />
      {openProfile && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm bg-slate-300 z-20 px-6 text-black font-medium text-[17px]">
          <Link href={"/"}>Profile</Link>
          <div className="mt-2" onClick={() => hadleLogout()}>
            {isLoading ? "Loading..." : "Logout"}
          </div>
        </div>
      )}
      <IoIosNotificationsOutline size={28} />
      <div className="relative">
        <BsCart size={21} onClick={() => setOpenCart((prev) => !prev)} />
        <div className="absolute -top-4 -right-3 w-5 h-5 bg-dm rounded-full text-white text-sm flex justify-center items-center">
          {counter}
        </div>
      </div>
      {openCart && <CartModal />}
    </div>
  );
};

export default Navicons;
