import Add from "@/app/Components/Add";
import ContentComponent from "@/app/Components/Comment";
import CustomzeProduct from "@/app/Components/CustomzeProduct";
import ProductImage from "@/app/Components/ProductImage";
import { winxClientServer } from "@/app/libs/winxClientServer";
import DOMPurify from "isomorphic-dompurify";
import { notFound } from "next/navigation";
import React from "react";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const winxClient = await winxClientServer();
  const products = await winxClient.products
    .queryProducts()
    .eq("_id", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }
  const product = products.items[0];

  return (
    <div className="max-w-[1300px] mx-auto grid grid-cols-2">
      {/*  img */}
      <div>
        <ProductImage items={product.media?.items} />
      </div>
      {/* text */}
      <div className="flex flex-col gap-4 px-9">
        <h1 className="text-4xl font-medium text-center">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-200" />
        <div className="flex items-center h-[30px] px-1">
          <h3 className="text-xl text-gray-500 line-through">
            {product.priceData?.discountedPrice}
          </h3>
          <h4 className="text-2xl font-medium ml-3">
            {product.priceData?.price}
          </h4>
        </div>
        <div className="h-[2px] bg-gray-200" />
        {product.variants && product.productOptions ? (
          <CustomzeProduct
            productId={product._id!}
            variants={product.variants!}
            productOptions={product.productOptions!}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="00000000-000000-000000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )}

        <div className="h-[2px] bg-gray-200" />
        {product.additionalInfoSections?.map((section: any) => {
          return (
            <div className="text-sm" key={section.title || "title"}>
              <h4 className="font-medium">{section.title}</h4>

              <ContentComponent content={section.description} />
              {/* {section.description} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SinglePage;
