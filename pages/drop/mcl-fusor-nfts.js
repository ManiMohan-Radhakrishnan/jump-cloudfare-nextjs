import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loot_details_thunk } from "../../redux/thunk/user_thunk";
import {
  getHideMenuStatus,
  setHideMenuStatus,
} from "../../redux/reducers/user_reducer";

import Header from "../../components/header";
import Footer from "../../components/footer";
import FusorBoxDetails from "../../components/fusor-nfts-box-components";
import ExampleSec from "../../components/fusor-nfts-box-components/example-sec";
import FaqSection from "../../components/fusor-nfts-box-components/faq-section";
import StaticFlows from "../../components/fusor-nfts-box-components/StaticFlows";
import FieldingSpecial from "../../components/fusor-nfts-box-components/fielding-special";
import store from "../../redux/store";

export async function getServerSideProps({ query }) {
  let { hideMenus } = query;
  if (!process.env.NEXT_PUBLIC_MCL_FUSOR_NFT_SLUG)
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  if (hideMenus === "true") store.dispatch(setHideMenuStatus(true));

  return { props: {} };
}

const MclFusorNfts = () => {
  const dispatch = useDispatch();
  const [lootItems, setLootItems] = useState({});
  const hideMenus = useSelector(getHideMenuStatus);

  const slugFusor = process.env.NEXT_PUBLIC_MCL_FUSOR_NFT_SLUG;

  const dispatchCallback = (result) => {
    if (result?.status === 200) {
      setLootItems(result?.data?.data?.loot);
    }
  };

  useEffect(() => {
    dataRefresh();
    // setLootItems({
    //   slug: "eoX1rQ1Ji9aYE6wR",
    //   name: "Shots",
    //   auction_start_time: "2023-06-10T13:30:00.000Z",
    //   auction_end_time: "2023-06-14T13:30:00.000Z",
    //   total_quantity: 10000,
    //   buy_amount: "5",
    //   qty_per_order: 1,
    //   available_qty: 10000,
    //   preorder_start_time: "2023-04-06T09:30:00.000Z",
    //   preorder_end_time: "2023-04-07T11:30:00.000Z",
    //   preorder_qty_per_user: 5,
    //   preorder_qty_per_order: 10000,
    //   current_time: "2023-01-09T08:01:45.301Z",
    //   purchased_qty: 0,
    //   preorder_reserved_qty: 1,
    // });
  }, []);

  const dataRefresh = () => {
    dispatch(
      loot_details_thunk({
        data: { slug: slugFusor },
        callback: dispatchCallback,
      })
    );
  };

  return (
    <>
      {hideMenus ? (
        <></>
      ) : (
        <>
          {" "}
          <div className="loader-container">
            <div className="top-loader"></div>
          </div>
          <Header
            title="MCL Fusor NFTs | MCL Premium Player NFTs | Jump.trade"
            description="Buy The MCL Fusor NFTs to Create Three New NFTs from Two Existing MCL NFTs. MCL Premium Player NFTs, Special Shots NFTs & Fielding Action NFT!"
            image="https://cdn.guardianlink.io/product-hotspot/images/jumptrade/Fusor_NFT_OG_Image.jpg"
          />
        </>
      )}

      <FusorBoxDetails buySuccess={dataRefresh} details={lootItems} />
      <ExampleSec />
      <StaticFlows />
      <FieldingSpecial />
      <FaqSection />
      {!hideMenus && <Footer />}
    </>
  );
};

export default MclFusorNfts;
