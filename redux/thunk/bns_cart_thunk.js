import { toast } from "react-toastify";

import {
  bnsAddToCartFailure,
  bnsAddToCartSuccess,
} from "../reducers/bns_cart_reducer";

import * as fbq from "../../utils/fbpixel";

export const bns_add_to_cart_thunk = (doamin, tld) => {
  return async (dispatch) => {
    try {
      console.log(doamin, "domaintld");
      const temp = {};
      const bns_data = store.getStae();
      console.log(bns_data, "bns_data");
      //dispatch(bnsAddToCartRequest());
      //const result = await addToCartApi({ order_slug, quantity });
      dispatch(bnsAddToCartSuccess({ doamin, tld }));
      //dispatch(get_bns_cart_list_thunk());
      toast.success("The NFT is successfully added to your cart.", {
        autoClose: 2000,
      });

      // Meta Pixel
      if (process.env.NEXT_PUBLIC_MARKETING_SCRIPT === "enabled") {
        fbq.pageView();
        fbq.event("AddToCart");
      }
    } catch (err) {
      console.log(err?.response?.status);
      if (err?.response?.status === 404) {
        toast.error("The NFT has either been sold or no longer listed.", {
          autoClose: 2000,
        });
      }
      dispatch(bnsAddToCartFailure(err));
    }
  };
};
