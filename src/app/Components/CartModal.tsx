"use client";
import { useCartStore } from "@/app/hooks/useCartStore";
import { useWinxClient } from "@/app/hooks/useWinxClient";
import React, { useEffect } from "react";
import { media as wixMedia } from "@wix/sdk";
import { currentCart } from "@wix/ecom";

const CartModal = () => {
  const winxClient = useWinxClient();
  const { cart, isLoading, removeItem } = useCartStore();
  console.log("cart", cart);

  const handleCheckOut = async () => {
    try {
      const checkout =
        await winxClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });
      const { redirectSession } =
        await winxClient.redirects.createRedirectSession({
          ecomCheckout: {
            checkoutId: checkout.checkoutId,
          },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });
      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute p-4 rounded-md top-12 right-0 text-sm bg-slate-100 z-20  text-black font-medium text-[17px] w-[300px]">
      <h2>Shopping Cart</h2>
      {cart.lineItems?.length === 0 ? (
        <div className="flex justify-center mt-2 text-red-500">
          Cart is empty
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-7 mt-3 ">
            {cart?.lineItems?.map((item) => (
              <div className="flex gap-4">
                {item.image && (
                  <img
                    src={wixMedia.getScaledToFitImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt="Photo"
                    className="h-[90px] rounded-md w-[80px] object-center"
                  />
                )}
                <div className="flex flex-col w-full gap-[14px]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      {item.productName?.original}
                    </h3>
                    <p>{item.price?.amount}</p>
                  </div>

                  <div className="text-[14px] text-gray-500">
                    {item.availability?.status}
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="text-[14px] text-gray-500">
                      Qty.{item.quantity}
                    </span>
                    <span
                      className="text-[14px] text-blue-600"
                      onClick={() => removeItem(winxClient, item._id!)}
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col ">
              <div className="h-[2px] bg-gray-200 mb-2" />
              <div className=" flex justify-between font-semibold">
                <p>Subtotal</p>
                <span className="text-[14px]">
                  {cart?.subtotal?.amount || 0}
                </span>
              </div>
              <span className="text-sm text-gray-500 mt-2 mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
              <div className="flex justify-between mt-3">
                <button className="rounded-md px-3 ring-1 ring-gray-300">
                  View
                </button>
                <button
                  className="rounded-md py-2 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-50 "
                  // disabled={isLoading}
                  onClick={handleCheckOut}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
