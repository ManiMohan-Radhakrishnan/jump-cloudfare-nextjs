import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Header from "../../components/header";
import Footer from "../../components/footer";
import BnsExplore from "../../components/bns/bns-explore";
import { setCookiesByName } from "../../utils/cookies.js";

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
      <Header />
      <BnsExplore data={listedNFTs} celebrity={celebrity} />

      <Footer />
    </>
  );
};

export default ExploreAll;
