import Pagination from "@/app/Components/Pagination";
import { winxClientServer } from "@/app/libs/winxClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import React from "react";

interface Props {
  productID: string | undefined;
  limit?: number;
  searchParams?: any;
}

const PER_PAGE = 8;

const ProductList: React.FC<Props> = async ({
  productID,
  limit,
  searchParams,
}) => {
  const winxClient = await winxClientServer();
  const productQuery = winxClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .hasSome("productType", [searchParams?.type || "physical", "digital"])
    .eq("collectionIds", productID)
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 9999999999)
    .limit(limit || PER_PAGE)
    .skip(
      searchParams?.page ? parseInt(searchParams.page) * (limit || PER_PAGE) : 0
    );

  const res = await productQuery.find();

  // Thực hiện sắp xếp thủ công
  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");
    if (sortBy === "price") {
      res.items.sort((a, b) => {
        const priceA = a.priceData?.price ?? 0;
        const priceB = b.priceData?.price ?? 0;
        return sortType === "asc" ? priceA - priceB : priceB - priceA;
      });
    }
  }

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 px-3">
        {res.items.map((product: products.Product) => (
          <Link
            key={product._id}
            href={"/" + product._id}
            className="relative w-full flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
              <img
                src={product?.media?.mainMedia?.image?.url}
                alt=""
                sizes="25vw"
                className="h-[300px] w-full object-cover rounded-md z-10 hover:opacity-60 transition-opacity duration-500"
              />
              <div className="flex justify-between px-1">
                <span className="font-medium">{product?.name}</span>
                <span className="font-semibold">
                  {product?.priceData?.price} {product?.priceData?.currency}
                </span>
              </div>
              {product.additionalInfoSections && (
                <div
                  className="text-sm text-gray-500 truncate px-1"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      product.additionalInfoSections.find(
                        (section: any) => section.title === "Product"
                      )?.description || ""
                    ),
                  }}
                ></div>
              )}
              <button className="rounded-2xl ring-1 ring-dm text-dm py-2 px-4 text-xs hover:bg-dm hover:text-white w-1/2">
                Add to cart
              </button>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={res.currentPage || 0}
        hasPrev={res.hasPrev()}
        hasNext={res.hasNext()}
      />
    </div>
  );
};

export default ProductList;
