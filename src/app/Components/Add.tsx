"use client";
import { useCartStore } from "@/app/hooks/useCartStore";
import { useWinxClient } from "@/app/hooks/useWinxClient";
import React, { useState } from "react";

interface IProps {
  productId: string;
  variantId: string;
  stockNumber: number;
}
const Add: React.FC<IProps> = ({ productId, variantId, stockNumber }) => {
  console.log({ productId, variantId, stockNumber });
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "i" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "d" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const winxClient = useWinxClient();
  const { addItems, isLoading } = useCartStore();

  return (
    <div className="flex flex-col gap-4 w-full">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex items-center w-full">
        <div className="bg-slate-200 rounded-3xl w-[130px] flex justify-between items-center py-3 px-4 h-[45px] text-[18px]">
          <button
            className="text-lg text-[30px]"
            onClick={() => handleQuantity("i")}
          >
            -
          </button>
          <p className="mx-4">{quantity}</p>
          <button
            className="text-lg text-[30px]"
            onClick={() => handleQuantity("d")}
          >
            +
          </button>
        </div>
        <div className="flex justify-between items-center w-full">
          {stockNumber < 1 ? (
            <div className="ml-3 text-red-500">Product is out stock</div>
          ) : (
            <span className="w-[110px] ml-4 text-gray-400 mb-2">
              Only{" "}
              <span className="text-red-600 font-semibold">
                {stockNumber} items
              </span>{" "}
              product left{" "}
            </span>
          )}
          <button
            onClick={() => addItems(winxClient, productId, variantId, quantity)}
            className="w-36 h-12 text-sm rounded-3xl ring-1 ring-dm text-dm p-2 px-4 hover:bg-dm  hover:text-white disabled:opacity-45 disabled:cursor-not-allowed disabled:ring-none"
            disabled={isLoading}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
