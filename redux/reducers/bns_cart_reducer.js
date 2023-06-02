import { createSlice } from "@reduxjs/toolkit";
import store from "../store";

const initialState = {
  data: {},
  checkout: false,
  loading: false,
  error: false,
  errorData: {},
  bns_cart_data: [
    // {
    //   domain: "ManimohanDev",
    //   domain_id: 1,
    //   domain_price: 25,
    //   domain_tld: "zk",
    // },
    // {
    //   domain: "ManimohanDev",
    //   domain_id: 1,
    //   domain_price: 25,
    //   domain_tld: "zk",
    // },
  ],
};

const bnsCartSlice = createSlice({
  name: "BnsCart",
  initialState,
  reducers: {
    bnsAddToCartRequest(state) {
      return { ...state, loading: true };
    },
    bnsAddToCartSuccess(state, { payload }) {
      const bns_data = new Set(
        state.bns_cart_data.map((item) => item.domain_id)
      );
      if (bns_data.has(payload.domain_id)) {
        return state;
      }
      return {
        ...state,
        bns_cart_data: [...state.bns_cart_data, payload],
      };
    },

    bnsAddToCartFailure: (state) => {
      return {
        ...state,
        bns_cart_data: [],
      };
    },
    bnsRemoveFromCartRequest(state) {
      return { ...state, loading: true };
    },
    // bnsRemoveFromCartSuccess(state, { payload }) {
    //   return {
    //     ...state,
    //     loading: false,
    //     data: {
    //       ...state.data,
    //       total_count: payload.count,
    //     },
    //   };
    // },
    bnsRemoveFromCartSuccess(state, { payload }) {
      // console.log(payload, "payload");
      // const bns_data = new Set(
      //   state.bns_cart_data.map((item) => item.domain_id)
      // );
      // let new_bns_data;
      // if (bns_data.has(payload.domain_id)) {
      //   console.log("here");
      //   // new_bns_data = store.getState().filter(function (obj) {
      //   //   return obj.domain_id !== payload.domain_id;
      //   // });

      //   console.log(state.bns_cart_data, " store.getState()");
      // }
      // console.log(payload, ";payload");
      // console.log(bns_data, ";bns_data");
      return {
        ...state,
        bns_cart_data: [...payload],
      };
    },
  },
});

// Selectors
export const getBCart = (state) => state.BnsCart;

export const {
  bnsAddToCartRequest,
  bnsAddToCartSuccess,
  bnsAddToCartFailure,
  bnsRemoveFromCartRequest,
  bnsRemoveFromCartSuccess,
} = bnsCartSlice.actions;

export default bnsCartSlice.reducer;
