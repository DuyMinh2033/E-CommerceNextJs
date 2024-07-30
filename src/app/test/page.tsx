"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const variants = [
  {
    choices: { Color: "Red", Size: "M" },
    stock: { inStock: true, quantity: 5 },
  },
  {
    choices: { Color: "Blue", Size: "L" },
    stock: { inStock: false, quantity: 0 },
  },
  {
    choices: { Color: "Red", Size: "L" },
    stock: { inStock: true, quantity: 3 },
  },
];

const isVariantInStock = (choice) => {
  return variants.some((variant) => {
    const variantChoice = variant.choices;
    if (!variantChoice) return false;

    const instock =
      Object.entries(choice).every(([key, value]) => {
        console.log("key", key);
        console.log({
          data: variantChoice[key],
          value: value,
        });
        return variantChoice[key] === value;
      }) &&
      variant.stock?.inStock &&
      variant.stock?.quantity &&
      variant.stock?.quantity > 0;
    return instock;
  });
};

const ProductCustomization = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelected = (optionType, choice) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const handleCheckStock = () => {
    const inStock = isVariantInStock(selectedOptions);
    toast.success("Login succeed!");
  };

  return (
    <div className="text-center">
      <h4>Màu sắc</h4>
      <button onClick={() => handleOptionSelected("Color", "Red")}>Đỏ</button>
      <button onClick={() => handleOptionSelected("Color", "Blue")}>
        Xanh dương
      </button>

      <h4>Kích thước</h4>
      <button onClick={() => handleOptionSelected("Size", "M")}>M</button>
      <button onClick={() => handleOptionSelected("Size", "L")}>L</button>

      <button onClick={handleCheckStock}>Kiểm tra kho</button>
    </div>
  );
};

export default ProductCustomization;
