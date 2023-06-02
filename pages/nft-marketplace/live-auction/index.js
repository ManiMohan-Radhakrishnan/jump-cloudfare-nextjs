import { useRouter } from "next/router";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import LiveAuctionsList from "../../../components/live-auction-list";
// import { liveAuctionNFTsApi } from "../../../utils/methods";
import { filter } from "lodash";
import { errorRedirect } from "../../../utils/common";
const Page = () => {
  // const router = useRouter();
  return (
    <>
      <Header
        bgImage
        title="Live Auction |Jump.Trade"
        description="Find the most-desirable cricket NFTs on jump.trade marketplace that are live on auction here. Go make your bid now to own them!"
      />
      <LiveAuctionsList />
      <Footer />
    </>
  );
};
// export async function getServerSideProps(context) {
//   console.log("data",context.query.sort)
//   const sort_filters = context.query.sort
//     ? context.query.sort
//     : "auction_ending_soon";
//   const price_range = {
//     from: context.query.minPrice ? context.query.minPrice : "",
//     to: context.query.maxPrice ? context.query.maxPrice : "",
//   };
//   const price_filter = {
//     price_range,
//   };

//   const info = {
//     sort: [
//       {
//         name: "Auction Ending Soon",
//         value: "auction_ending_soon",
//         checked: true,
//       },
//       {
//         name: "Auction Starting Soon",
//         value: "auction_starting_soon",
//         checked: false,
//       },
//     ],
//   };

//   info.sort = info.sort.map((obj) => ({
//     ...obj,
//     checked: sort_filters ? sort_filters === obj.value : false,
//   }));
//   // setPage(1);
//   // setFilter(info);
//   // if (price_range.from || price_range.to) {
//   //   setPriceRangeFilter(price_range);
//   // }
//   let response = {};
//   try {
//     response = await liveAuctionNFTsApi(1, sort_filters, price_filter);
//   } catch (err) {
//     console.log(err);
//     // return errorRedirect(err?.status);
//   }

//   return {
//     props: {
//       input: response?.data,
//       filters: info,
//     },
//   };
// }

export default Page;
