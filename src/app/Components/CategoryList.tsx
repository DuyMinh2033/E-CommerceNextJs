import { winxClientServer } from "@/app/libs/winxClientServer";
import { collections } from "@wix/stores";
import Link from "next/link";
import React from "react";

const CategoryList = async () => {
  const winxClient = await winxClientServer();
  const res = await winxClient.collections.queryCollections().find();

  return (
    <div className="px-2 overflow-x-scroll scrollbar-hidden bg-slate-100 h-[450px]">
      <div className="flex items-center h-full gap-4  md:gap-4 ">
        {res?.items?.map((product: collections.Collection) => (
          <Link
            key={product._id}
            href={`/List?cart=${product.slug}`}
            className="flex-shrink-0 "
          >
            <div className="relative bg-gray-200 rounded-md w-[255px] h-96">
              <img
                src={product.media?.mainMedia?.image?.url}
                alt="photo"
                className="h-[330px] w-full rounded-t-md"
              />
              <h2 className="text-gray-500 text-[18px] px-4 mt-4">
                {product.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
