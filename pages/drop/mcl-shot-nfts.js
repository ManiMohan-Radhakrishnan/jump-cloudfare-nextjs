import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loot_details_thunk } from "../../redux/thunk/user_thunk";
import Header from "../../components/header";
import Footer from "../../components/footer";
import BatNftSection from "../../components/mcl-action-nfts-components";
import Faq from "../../components/mcl-action-nfts-components/faq";
import StaticFlows from "../../components/mcl-action-nfts-components/StaticFlows";

import "react-phone-input-2/lib/bootstrap.css";
import { isUserLoggedIn } from "../../redux/reducers/user_reducer";
import ReferWin from "../../components/mcl-action-nfts-components/refer-win";

export async function getServerSideProps() {
  if (!process.env.NEXT_PUBLIC_DROP_MCL_SHOTS_SLUG)
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  return { props: {} };
}

const MclActions = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(isUserLoggedIn);

  const [lootItems, setLootItems] = useState(null);
  const slugShots = process.env.NEXT_PUBLIC_DROP_MCL_SHOTS_SLUG;

  const dispatchCallback = (result) => {
    if (result?.status === 200) {
      setLootItems(result?.data?.data?.loot);
    }
  };

  useEffect(() => {
    dataReload();
    // setLootItems({
    //   slug: "eoX1rQ1Ji9aYE6wR",
    //   name: "Shots",
    //   auction_start_time: "2023-01-13T13:30:00.000Z",
    //   auction_end_time: "2023-01-14T13:30:00.000Z",
    //   total_quantity: 10000,
    //   buy_amount: "1.0",
    //   qty_per_order: 1,
    //   qty_per_user: 1,
    //   available_qty: 10000,
    //   preorder_start_time: "2023-01-09T16:30:00.000Z",
    //   preorder_end_time: "2023-01-20T16:30:00.000Z",
    //   preorder_qty_per_user: 1,
    //   preorder_qty_per_order: 1,
    //   current_time: "2023-01-09T08:01:45.301Z",
    //   purchased_qty: 0,
    //   preorder_reserved_qty: 1,
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);
  const dataReload = () => {
    dispatch(
      loot_details_thunk({
        data: { slug: slugShots },
        callback: dispatchCallback,
      })
    );
  };

  return (
    <>
      <Header
        title="MCL Signature Shots — Mystery Box | Jump.trade"
        description="The MCL Signature Shot NFTs are motion-captured batting shots that are tradeable, collectible, and playable. Buy your MCL Signature Shots — Mystery Box today!"
        image="https://cdn.guardianlink.io/product-hotspot/images/MCL-Action-Shots-banner-with-padding.png"
      />
      {lootItems && (
        <BatNftSection buySuccess={dataReload} details={lootItems} />
      )}
      <StaticFlows />
      <ReferWin />
      <Faq />
      <Footer />
    </>
  );
};

export default MclActions;
