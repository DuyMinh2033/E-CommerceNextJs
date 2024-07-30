"use client";

import { WinxClientContext } from "@/app/context/winxContext";
import { useContext } from "react";

export const useWinxClient = () => {
  return useContext(WinxClientContext);
};
