import { configureStore } from "@reduxjs/toolkit";
import lang_reducer from "./reducers/lang_reducer";
import user_cart_reducer from "./reducers/user_cart_reducer";
import user_reducer from "./reducers/user_reducer";
import bns_cart_reducer from "./reducers/bns_cart_reducer";

const store = configureStore({
  reducer: {
    lang: lang_reducer,
    user: user_reducer,
    cart: user_cart_reducer,
    bns_cart: bns_cart_reducer,
  },
});

export default store;
