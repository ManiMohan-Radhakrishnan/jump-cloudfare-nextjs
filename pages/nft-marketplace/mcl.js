import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Footer from "../../components/footer";
import { setCookiesByName } from "../../utils/cookies";
import ExploreAllNFT from "../../components/explore/explore-all-nft.js";
import listedNftRequest from "../../utils/request-config";
import { nftShowAllApi } from "../../utils/internal-methods";
import { CELEBRITIES } from "../../utils/celebrity-config";

const ExploreAll = ({ listedNFTs, celebrity }) => {
  const router = useRouter();
  const fsz = router.fsz;
  useEffect(() => {
    if (fsz) {
      sessionStorage.setItem("fsz", fsz);
      setCookiesByName("fsz", fsz);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ExploreAllNFT data={listedNFTs} celebrity={celebrity} />
      <Footer />
    </>
  );
};

export default ExploreAll;

export async function getServerSideProps({ query }) {
  let props = { celebrity: CELEBRITIES.mcl.name };
  try {
    let listedNFTreq = listedNftRequest(query, CELEBRITIES.mcl.name);
    if (!listedNFTreq)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };

    let showNFTs = await nftShowAllApi(listedNFTreq);
    props = {
      ...props,
      listedNFTs: showNFTs?.data,
    };
  } catch (err) {
    console.error("Error", err);
  }
  return { props };
}
