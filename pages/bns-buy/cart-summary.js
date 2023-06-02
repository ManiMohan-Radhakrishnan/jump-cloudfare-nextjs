import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/header";
import Footer from "../../components/footer";
import CartSummary from "../../components/bns/bns-cart-summary";

const ExploreAll = ({ listedNFTs, celebrity }) => {
  return (
    <>
      <Header />
      <CartSummary buySuccess={dataRefresh} details={lootDomain} />
      <Footer />
    </>
  );
};

export default ExploreAll;
