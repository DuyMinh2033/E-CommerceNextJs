"use client";
import Add from "@/app/Components/Add";
import { products } from "@wix/stores";
import React, { useEffect, useState } from "react";

interface props {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}
const CustomzeProduct: React.FC<props> = ({
  productId,
  variants,
  productOptions,
}) => {
  const [selectdOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoice = v.choices;
      if (!variantChoice) return false;
      return Object.entries(selectdOptions).every(
        ([key, value]) => variantChoice[key] === value
      );
    });
    setSelectedVariant(variant);
  }, [selectdOptions, variants]);
  const handleOptionSelected = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choice: { [key: string]: string | undefined }) => {
    return variants.some((variant) => {
      const variantChoice = variant.choices;
      if (!variantChoice) return false;

      const instock =
        Object.entries(choice).every(
          ([key, value]) => variantChoice[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0;
      return instock;
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        {productOptions.map((option, i) => (
          <div className="flex flex-col gap-5" key={option.name}>
            <h4>{option.name}</h4>
            <ul className="flex items-center gap-3">
              {option.choices?.map((choice: any, i) => {
                const disable = !isVariantInStock({
                  ...selectdOptions,
                  [option.name!]: choice.description,
                });
                const seleted =
                  selectdOptions[option.name!] === choice.description;
                console.log({
                  des: choice,
                  op: selectdOptions[option.name!],
                });
                const clickHandler = disable
                  ? undefined
                  : () =>
                      handleOptionSelected(option.name!, choice.description);
                return option.name === "Color" ? (
                  <li
                    key={choice.value}
                    className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
                    style={{
                      backgroundColor: choice.value,
                      cursor: disable ? "not-allowed" : "pointer",
                    }}
                    onClick={clickHandler}
                  >
                    {seleted && (
                      <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                    {disable && (
                      <div className="absolute w-10 h-[2px] bg-red-500 rotate-45 top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </li>
                ) : (
                  <li
                    key={choice.value}
                    className="text-white ring-1 ring-dm rounded-md px-6 py-2"
                    style={{
                      cursor: disable ? "not-allowed" : "pointer",
                      backgroundColor: seleted
                        ? "#f35c7a"
                        : disable
                        ? "#FBCFE8"
                        : "white",
                      color: seleted || disable ? "white" : "#f35c7a",
                    }}
                    onClick={clickHandler}
                  >
                    {choice.description}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <Add
          productId={productId}
          variantId={
            selectedVariant?._id || "00000000-000000-000000-000000000000"
          }
          stockNumber={selectedVariant?.stock?.quantity || 0}
        />
        {/* <div className="" key={option.name}>
            <h4 className="font-medium text-[17px]">{option.name}</h4>
            <ul className="flex items-center gap-3">
              <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
                <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2" />
              </li>
              <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
              <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-green-500">
                <div className="absolute w-10 h-[2px] bg-red-500 rotate-45 top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2" />
              </li>
            </ul>
          </div> */}

        {/* <h4 className="font-medium">Choose a size</h4>
        <ul className="flex items-center gap-3">
          <li className="text-white rounded-md bg-pink-200 px-6 py-2">Small</li>
          <li className="text-white rounded-md bg-blue-500 px-6 py-2">
            Medium
          </li>
          <li className="text-white rounded-md bg-green-500 px-6 py-2">
            Large
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default CustomzeProduct;
