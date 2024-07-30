"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const sliders = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! up to 50% off",
    img: "https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "/",
    bg: "bg-stone-300",
  },
  {
    id: 2,
    title: "Summer Sale Collections",
    description: "Sale! up to 50% off",
    img: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "/",
    bg: " bg-gray-300",
  },
];
const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {sliders.map((item) => {
          return (
            <div
              key={item.id}
              className={`w-screen h-full flex flex-col gap-16 xl:flex-row ${item.bg}`}
            >
              <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center  gap-8 2xl:gap-12 text-center">
                <h2 className="text-xl  lg:text-3xl 2xl:text-4xl">
                  {item.description}
                </h2>
                <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                  {item.title}
                </h1>
                <Link href={item.url}>
                  <button className="rounded-md bg-black text-white py-3 px-4">
                    Shop Now
                  </button>
                </Link>
              </div>

              <div className="h-1/2 xl:w-1/2 xl:h-full relative">
                <img
                  src={item.img}
                  alt="full"
                  sizes="100%"
                  className="object-cover w-full "
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 gap-4 flex ">
        {sliders.map((item, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center"
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full mx-auto"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
