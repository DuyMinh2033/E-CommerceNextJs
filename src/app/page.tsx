// "use client";
import CategoryList from "@/app/Components/CategoryList";
import ProductList from "@/app/Components/ProductList";
import Slider from "@/app/Components/Slider";
import { WinxClientContext } from "@/app/context/winxContext";
import { useWinxClient } from "@/app/hooks/useWinxClient";
import { winxClientServer } from "@/app/libs/winxClientServer";
import { Suspense, useContext, useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";

export default async function Home() {
  // const winxClient = useWinxClient();

  // useEffect(() => {
  //   const getProduct = async () => {FGHJKL
  //     try {
  //       const res = await winxClient.products.queryProducts().find();
  //       console.log(res);
  //     } catch (error) {
  //       console.error("Failed to fetch products:", error);
  //     }
  //   };
  //   getProduct();
  // }, [winxClient]);

  // const winxClient = await winxClientServer();
  // const res = await winxClient.products.queryProducts().find();

  return (
    <div>
      <Slider />
      <div className="max-w-[1300px] mx-auto">
        <h1 className="text-[25px] text-center my-11 text-amber-600 font-semibold">
          Featured Product
        </h1>
        <Suspense fallback={"...loading"}>
          <ProductList
            productID={process.env.NEXT_PUBLIC_FEATURED_CATEGORY_ID}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-16">
        <h3 className="text-[25px] ml-[120px] font-medium text-pink-600">
          Categories
        </h3>
        <Suspense fallback={"...loading"}>
          <CategoryList />
        </Suspense>
      </div>

      <div className="max-w-[1300px] mx-auto mb-20">
        <h1 className="text-[25px] text-center my-11 text-red-600 font-semibold">
          Products for you
        </h1>
        <ProductList
          productID={process.env.NEXT_PUBLIC_FEATURED_CATEGORY_ID}
          limit={8} // Corrected the typo here
        />
      </div>
    </div>
  );
}
