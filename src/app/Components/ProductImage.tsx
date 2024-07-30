"use client";
import React, { useState } from "react";
const images = [
  // {
  //   id: 1,
  //   url: "https://images.pexels.com/photos/6020918/pexels-photo-6020918.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  // },
  // {
  //   id: 2,
  //   url: "https://images.pexels.com/photos/26861781/pexels-photo-26861781/free-photo-of-a-person-paragliding-in-the-sky-with-an-orange-parachute.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  // },
  // {
  //   id: 3,
  //   url: "https://images.pexels.com/photos/10320111/pexels-photo-10320111.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  // },
  // {
  //   id: 4,
  //   url: "https://images.pexels.com/photos/17740434/pexels-photo-17740434/free-photo-of-ain-dubai-ferris-wheel-against-clear-blue-sky-dubai-united-arab-emirates.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  // },
];
const ProductImage = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
  
  return (
    <div className="h-[500px] relative w-full mt-3">
      <div className="flex justify-center">
        <img
          src={items[index].image?.url}
          alt=""
          className="max-h-[350px] max-w-full object-center rounded-md w-full"
        />
      </div>
      <div className="w-full flex justify-between gap-4 mt-5">
        {items.map((item: any, i: number) => (
          <div className="" key={item._id}>
            <img
              src={item.image?.url}
              alt=""
              className="h-[100px] w-[200px] object-cover rounded-md cursor-pointer"
              onClick={() => setIndex(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
