import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Header from "../components/header";
//const Header = dynamic(() => import("../components/header"));

import Footer from "../components/footer";
//const Footer = dynamic(() => import("../components/footer"));

// import MclGameButton from "../components/mcl-game-button";
// import ShowAll from "../components/show-all";
import MclTournaments from "../components/mcl-tournaments";
//const MclTournaments = dynamic(() => import("../components/mcl-tournaments"));
// import RecentlySoldListNft from "../components/recently-sold-nft";
// import Trending from "../components/trending";
import HeroBanner from "../components/hero-banner";
//const HeroBanner = dynamic(() => import("../components/hero-banner"));

// import LiveAuctions from "../components/live-auctions";
// import { tournamentsApi } from "../utils/base-methods";
import {
  liveAuctionNFTsApi,
  nftCategoriesApi,
  nftRecentlySoldApi,
  nftShowAllApi,
  trendingNFTsApi,
} from "../utils/methods";
import { errorRedirect } from "../utils/common";
import * as fbq from "../utils/fbpixel";
import Packs from "../components/packs";
import Winnings from "../components/winnings";
import Community from "../components/community";
//const Community = dynamic(() => import("../components/community"));
//import PteCarousel from "../components/pte-carousel";
const PteCarousel = dynamic(() => import("../components/pte-carousel"));
//import RareCollections from "../components/rare-collections";
const RareCollections = dynamic(() => import("../components/rare-collections"));
import DiscoverNFTs from "../components/discover-nfts";
import WhatsappChat from "../components/whatsapp";
import { useDispatch, useSelector } from "react-redux";
import {
  active_code_thunk,
  loot_details_thunk,
} from "../redux/thunk/user_thunk";
import DownloadGame from "../components/download-game";
import TrendingGames from "../components/trending-games";
import HotAndTrendings from "../components/hot-trending-nfts";
//const DiscoverNFTs = dynamic(() => import("../components/discover-nfts"));

export default function Home(props) {
  const router = useRouter();
  const [list, setList] = useState([]);
  const tournamentRef = useRef(null);
  const dispatch = useDispatch();
  const [lootItems, setLootItems] = useState({});
  const [fusorDetails, setFusorDetails] = useState({});
  const [lootItemsShots, setLootItemsShots] = useState(null);
  const { user, cart } = useSelector((state) => state);
  const User = user.data.user;

  const slug = process.env.NEXT_PUBLIC_DROP_MCL_GAME_CODE_SLUG;
  const slugRaddx = process.env.NEXT_PUBLIC_RADDX_LOOT_SLUG;
  const slugFusor = process.env.NEXT_PUBLIC_MCL_FUSOR_NFT_SLUG;

  const categoriesList = async (page) => {
    try {
      let response = await nftCategoriesApi({ page });
      setList([...list, ...response.data.data.categories]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    process.env.NEXT_PUBLIC_MARKETING_SCRIPT === "enabled" && fbq.pageview();

    const handleRouteChange = () => {
      process.env.NEXT_PUBLIC_MARKETING_SCRIPT === "enabled" && fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  const dispatchCallback = (result) => {
    if (result?.status === 200) {
      setLootItems(result?.data?.data?.loot);
    }
  };

  const fusorDispatchCallback = (result) => {
    if (result?.status === 200) {
      setFusorDetails(result?.data?.data?.loot);
    }
  };

  useEffect(() => {
    categoriesList(1);
    dispatch(
      loot_details_thunk({
        data: { slug: slugRaddx },
        callback: dispatchCallback,
      })
    );

    dispatch(
      loot_details_thunk({
        data: { slug: slugFusor },
        callback: fusorDispatchCallback,
      })
    );
    // setLootItems({
    //   slug: "eoX1rQ1Ji9aYE6wR",
    //   name: "Shots",
    //   auction_start_time: "2023-03-09T07:55:00.000Z",
    //   auction_end_time: "2023-03-09T07:56:00.000Z",
    //   preorder_start_time: "2023-03-09T07:53:00.000Z",
    //   preorder_og_start_time: "2023-03-09T07:52:00.000Z",
    //   preorder_end_time: "2023-03-09T07:54:00.000Z",
    //   og_user: User?.og_user,
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        title="Asia's Largest NFT Marketplace | Jump.trade"
        description="Jump.trade is Asia's largest NFT marketplace for you to trade exclusive digital collectibles. Buy your digital assets from the best NFT gaming marketplace."
        canonical={`${process.env.NEXT_PUBLIC_MARKETPLACE_URL}`}
        image="https://cdn.guardianlink.io/product-hotspot/images/JT_OG_image.jpg"
      />
      <main>
        <HeroBanner
          tournamentRef={tournamentRef}
          details={lootItems}
          fusorDetails={fusorDetails}
          preBookStartTime={
            User?.og_user
              ? lootItems.preorder_og_start_time
              : lootItems.preorder_start_time
          }
        />
        {/* <PteCarousel /> */}

        <TrendingGames />
        <DiscoverNFTs categories={list} />
        <HotAndTrendings categories={list} />
        {/* <RareCollections /> */}
        <DownloadGame />
        <MclTournaments ref={tournamentRef} />

        {/* <MclGameButton /> */}
        {/* <Trending data={props.trendingNFTs} /> */}
        {/* <LiveAuctions /> */}
        {/* <RecentlySoldListNft /> */}
        {/* <ShowAll categories={list} /> */}
        {/* <Packs /> */}
        {/* <Winnings /> */}
        <Community />
      </main>
      <Footer />
      {/* <WhatsappChat /> */}
    </>
  );
}

const getRecentlyListedRequest = (query) => {
  let page = 1;
  const category_filters = query.category ? query.category.split(",") : [];
  const sale_filters = query.sale ? query.sale.split(",") : [];
  const nft_filters = query.nft ? query.nft.split(",") : [];
  const sort_filters = query.sort ? query.sort : "recently_listed";
  const search_filter = query.search ? query.search : "";
  const sale_status = query.status ? query.status : "";
  const price_range = {
    from: query.minPrice ? query.minPrice : "",
    to: query.maxPrice ? query.maxPrice : "",
  };
  const sort = query.sort ? query.sort : "";
  const noMatchFound =
    sale_filters.length === 0 &&
    nft_filters.length === 0 &&
    price_range.from.length === 0 &&
    price_range.to.length === 0 &&
    sort.length === 0 &&
    category_filters.length === 0 &&
    search_filter.length === 0 &&
    sale_status.length === 0;

  if (noMatchFound && query.search) return false;

  let filter = {
    category: category_filters,
    type: nft_filters,
    sale_type: sale_filters,
    keyword: search_filter,
    sale_kind: sale_status,
    price_range,
  };

  return {
    page,
    per_page: 21,
    filter,
    sort: sort_filters === "relevance" ? null : sort_filters,
  };
};

// export async function getServerSideProps({ query }) {
//   let props = {};
//   try {
//     let page = 1;
//     let sort_by = "recently_sold";
//     let recentlyListedNFTreq = getRecentlyListedRequest(query);

//     if (!recentlyListedNFTreq)
//       return {
//         redirect: {
//           destination: "/",
//           permanent: false,
//         },
//       };

//     let [trendingNFTs] = await Promise.all([trendingNFTsApi(page)]);

//     props = {
//       trendingNFTs: trendingNFTs?.data,
//     };
//   } catch (err) {
//     console.error("Error", err, err.status);
//     return errorRedirect(err?.status);
//   }
//   return { props };
// }
