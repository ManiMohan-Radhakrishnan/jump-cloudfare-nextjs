import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loot_details_thunk } from "../../redux/thunk/user_thunk";
import { isUserLoggedIn } from "../../redux/reducers/user_reducer";
import Header from "../../components/header";
import Footer from "../../components/footer";
import BatNftSection from "../../components/bat-nft-components";
import GetAppLinkSection from "../../components/bat-nft-components/GetAppLinkSection";
import Faq from "../../components/bat-nft-components/faq";
import StaticFlows from "../../components/bat-nft-components/StaticFlows";

import "react-phone-input-2/lib/bootstrap.css";

export async function getServerSideProps() {
  if (!process.env.NEXT_PUBLIC_DROP_CATEGORY_SLUG)
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  return { props: {} };
}

const BatNFTsDrop = () => {
  const dispatch = useDispatch();
  const [lootItems, setLootItems] = useState(null);
  const slug = process.env.NEXT_PUBLIC_DROP_CATEGORY_SLUG;
  const loginStatus = useSelector(isUserLoggedIn);

  const dispatchCallback = (result) => {
    if (result?.status === 200) {
      setLootItems(result?.data?.data?.loot);
    }
  };

  const fetchBatNftDropInfo = () => {
    dispatch(
      loot_details_thunk({ data: { slug }, callback: dispatchCallback })
    );
  };

  useEffect(() => {
    fetchBatNftDropInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);

  return (
    <>
      <Header
        title="Crypto Bat NFT Drop | Buy Cricket Bat NFTs | Jump.trade"
        description="Jump.trade presents an exclusive collection of playable crypto cricket bat NFTs with tradable crypto assets embedded. Buy cricket bat NFTs now!"
        image="https://cdn.guardianlink.io/product-hotspot/images/Crypto_bat_OG_Image.jpg"
      />
      <BatNftSection
        refetch={fetchBatNftDropInfo}
        slug={slug}
        details={lootItems}
      />
      <StaticFlows />
      <Faq />
      <GetAppLinkSection />
      <Footer />
    </>
  );
};

export default BatNFTsDrop;
