"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";
import { redirects } from "@wix/redirects";
const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    redirects,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WINX_ID!,
    tokens: {
      refreshToken,
      accessToken: { value: "", expiresAt: 0 },
    },
  }),
});

export type WinxClient = typeof wixClient;
export const WinxClientContext = createContext<WinxClient>(wixClient);

export const WinxClientContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <WinxClientContext.Provider value={wixClient}>
      {children}
    </WinxClientContext.Provider>
  );
};
