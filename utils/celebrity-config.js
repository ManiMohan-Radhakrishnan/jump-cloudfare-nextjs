import Details from "../components/details";
import DetailsRaddx from "../components/raddx/details";
import OrderDetails from "../components/order-details";
import OrderDetailsRaddx from "../components/raddx/order-details";

import DetailsBns from "../components/bns/details";

import OrderDetailsBns from "../components/bns/order-details";

export const CELEBRITIES = Object.freeze({
  mcl: {
    name: "mcl",
    gameName: "mcl",
    exploreUrl: "/nft-marketplace/mcl",
    celebrityName: "Cricket Jump",
    orderdetails: OrderDetails,
    details: Details,
  },
  raddx: {
    name: "raddx",
    gameName: "raddx",
    exploreUrl: "/nft-marketplace/raddx",
    celebrityName: "Raddx", //! TEMPORARY CELEBRITY NAME - THIS MIGHT CHANGE IN THE FUTURE
    orderdetails: OrderDetailsRaddx,
    details: DetailsRaddx,
  },
  bns: {
    name: "bns",
    gameName: "bns",
    exploreUrl: "/nft-marketplace/bns",
    celebrityName: "BNS", //! TEMPORARY CELEBRITY NAME - THIS MIGHT CHANGE IN THE FUTURE
    orderdetails: OrderDetailsBns,
    details: DetailsBns,
  },
  DEFAULT: {
    name: "mcl",
    gameName: "mcl",
    exploreUrl: "/nft-marketplace/mcl",
    celebrityName: "Cricket Jump",
    orderdetails: OrderDetails,
    details: Details,
  },
});

export const VALID_CELEBRITIES = [
  CELEBRITIES.mcl.name,
  CELEBRITIES.raddx.name,
  CELEBRITIES.bns.name,
];

export const isValidCelebrity = (celebrity) =>
  VALID_CELEBRITIES.includes(celebrity);

export const getCelebrityNameByUrl = (url) => {
  const [_, celebrity = CELEBRITIES.DEFAULT] = Object.entries(CELEBRITIES).find(
    ([_, celebrity]) => celebrity?.exploreUrl === url
  );
  return celebrity?.name;
};

export const getOrderDetailsComponent = (page, game_name) => {
  const CURRENT_PAGE = "orderdetails";
  if (CURRENT_PAGE !== page) return null;
  let celebrityObj =
    Object.values(CELEBRITIES).find(
      (celebrity) => celebrity.gameName === game_name
    ) || CELEBRITIES.DEFAULT;

  return celebrityObj[CURRENT_PAGE] || null;
};

export const getDetailsComponent = (page, game_name) => {
  const CURRENT_PAGE = "details";
  if (CURRENT_PAGE !== page) return null;
  let celebrityObj =
    Object.values(CELEBRITIES).find(
      (celebrity) => celebrity.gameName === game_name
    ) || CELEBRITIES.DEFAULT;
  return celebrityObj[CURRENT_PAGE] || null;
};
