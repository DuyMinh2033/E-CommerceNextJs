import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WinxClient } from "@/app/context/winxContext";

interface ICartStore {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (winxClient: WinxClient) => void;
  addItems: (
    winxClient: WinxClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (winxClient: WinxClient, itemId: string) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,
  getCart: async (winxClient) => {
    const cart = await winxClient.currentCart.getCurrentCart();
    set({
      cart: cart || [],
      isLoading: false,
      counter: cart?.lineItems.length || 0,
    });
  },
  addItems: async (winxClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await winxClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WINX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });
    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });
  },
  removeItem: async (winxClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    const response =
      await winxClient.currentCart.removeLineItemsFromCurrentCart([itemId]);

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });
  },
}));
