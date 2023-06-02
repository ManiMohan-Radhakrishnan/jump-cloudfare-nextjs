import { createSlice } from "@reduxjs/toolkit";
import { LOOT_STATUS } from "../../components/bat-nft-components/common";

const initialState = {
  data: {},
  login: false,
  loading: false,
  error: false,
  errorData: {},
  marketLive: false,
  mfaEnabled: false,
  androidAPK: null,
  windowsEXE: null,
  cryptoBatDropLive: null,
  playPassDropLive: null,
  shotsDropLive: null,
  fusorsDropLive: null,
  hideMenuStatus: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state) {
      return { ...state, loading: true };
    },
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loading: false,
        login: true,
        data: payload,
      };
    },
    loginFailure(state, { payload }) {
      return { ...state, loading: false, error: true, errorData: payload };
    },
    loginReset(state) {
      return { ...state, loading: false, login: false };
    },
    logout() {
      return initialState;
    },
    walletUpdate(state, { payload }) {
      return {
        ...state,
        data: {
          user: {
            ...state.data.user,
            balance: payload.balance,
            locked: payload.locked,
          },
        },
      };
    },
    marketLive(state) {
      return { ...state, marketLive: true };
    },
    marketLiveOff(state) {
      return { ...state, marketLive: false };
    },
    loginWithOTP(state) {
      return { ...state, loading: false, login: false };
    },
    loginWithGoogleOTP(state) {
      return { ...state, loading: false, login: false, mfaEnabled: true };
    },
    setCryptoBatDropLive(state, { payload = LOOT_STATUS.DROP_YTS }) {
      return { ...state, cryptoBatDropLive: payload };
    },
    setMclPlayPassDropLive(state, { payload = LOOT_STATUS.DROP_YTS }) {
      return { ...state, playPassDropLive: payload };
    },
    setMclShotsDropLive(state, { payload = LOOT_STATUS.DROP_YTS }) {
      return { ...state, shotsDropLive: payload };
    },
    setFusorsDropLive(state, { payload = LOOT_STATUS.DROP_YTS }) {
      return { ...state, fusorsDropLive: payload };
    },
    setAndroidAPK(state, { payload }) {
      return { ...state, androidAPK: payload };
    },
    setWindowsEXE(state, { payload }) {
      return { ...state, windowsEXE: payload };
    },
    setHideMenuStatus(state, { payload }) {
      return { ...state, hideMenuStatus: payload };
    },
  },
});

// Selectors
export const getUser = (state) => state.user.data?.user;
export const getMarketLive = (state) => state.user.marketLive;
export const isUserLoggedIn = (state) => state.user?.login;
export const isLoading = (state) => state.user?.loading;
export const cryptoBatDropLiveStatus = (state) => state.user?.cryptoBatDropLive;
export const mclPlayPassDropLiveStatus = (state) =>
  state.user?.playPassDropLive;
export const mclPlayShotsDropLiveStatus = (state) => state.user?.shotsDropLive;
export const getAndroidAPK = (state) => state.user?.androidAPK;
export const getWindowsEXE = (state) => state.user?.windowsEXE;
export const getHideMenuStatus = (state) => state.user?.hideMenuStatus;
export const mclFusorsLootStatus = (state) => state?.user?.fusorsDropLive;

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginReset,
  logout,
  walletUpdate,
  marketLive,
  marketLiveOff,
  loginWithOTP,
  loginWithGoogleOTP,
  setCryptoBatDropLive,
  setMclPlayPassDropLive,
  setMclShotsDropLive,
  setAndroidAPK,
  setWindowsEXE,
  setHideMenuStatus,
  setFusorsDropLive,
} = userSlice.actions;

export default userSlice.reducer;
