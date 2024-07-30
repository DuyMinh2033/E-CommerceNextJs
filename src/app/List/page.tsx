import Filter from "@/app/Components/Filter";
import ProductList from "@/app/Components/ProductList";
import { winxClientServer } from "@/app/libs/winxClientServer";
import React, { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const winxClient = await winxClientServer();
  const res = await winxClient.collections.getCollectionBySlug(
    searchParams.cart || "all-products"
  );

  return (
    <div className="max-w-[1300px] mx-auto relative">
      <div className="bg-pink-100 flex justify-between">
        <div className="w-2/3 flex justify-center items-center flex-col gap-5">
          <h1 className="text-6xl text-gray-700">Get to up 50% off</h1>
          <h4 className="text-4xl text-gray-700">Selected Product</h4>
          <button className="bg-dm py-2 px-3 rounded-md">Buy now</button>
        </div>
        <div className="w-1/3">
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.XU2FngHtqScowndTqs2h7AHaHa&pid=Api&P=0&h=180"
            alt=""
            className="h-[300px] w-full object-center"
          />
        </div>
      </div>
      <div className="my-7 pl-4">
        <h1 className="text-[30px] font-semibold">
          {res.collection?.name} for you!
        </h1>
      </div>
      <Filter />
      <Suspense fallback={"...loading"}>
        <ProductList
          productID={
            res.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
