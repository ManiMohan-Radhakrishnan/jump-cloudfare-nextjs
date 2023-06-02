import React from "react";
// import Image from "next/future/image";
import { BsArrowRight, BsAsterisk } from "react-icons/bs";
// import heroImg from "../../../images/bns/hero-flow.svg";
import Lottie from "lottie-react";
import searchLottie from "../../../../images/bns/lottie/Search.json";
import registerLottie from "../../../../images/bns/lottie/Reg.json";
import tradeLottie from "../../../../images/bns/lottie/Trade.json";
import manageLottie from "../../../../images/bns/lottie/Manage.json";

import style from "./style.module.scss";
const HeroSection = () => {
  return (
    <>
      <section className={`${style["hero-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["content-block"]}`}>
                <h5>
                  <BsAsterisk /> ONE IDENTITY ACROSS INTERNET <BsAsterisk />
                </h5>
                <h1>
                  <i>B</i>lockchain <i>N</i>ame <i>S</i>ervice
                </h1>

                <video
                  loop
                  muted
                  autoPlay
                  playsInline
                  src={
                    "https://cdn.guardianlink.io/product-hotspot/vidoes/bns/BNS_Intro_optimized.mp4"
                  }
                  className={style["bns-domain-video"]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${style["info-img-set"]}`}>
          <ul className={`${style["lottie-list"]}`}>
            <li>
              {" "}
              <div className={`${style["cotent-box"]}`}>
                <Lottie animationData={searchLottie} loop={true} />
                <h6>Search</h6>
              </div>
              <BsArrowRight className={`${style["arrow-icon"]}`} />
            </li>
            <li>
              {" "}
              <div className={`${style["cotent-box"]}`}>
                <Lottie animationData={registerLottie} loop={true} />
                <h6>Register</h6>
              </div>
              <BsArrowRight className={`${style["arrow-icon"]}`} />
            </li>
            <li>
              {" "}
              <div className={`${style["cotent-box"]}`}>
                <Lottie animationData={tradeLottie} loop={true} />
                <h6>Trade</h6>
              </div>
              <BsArrowRight className={`${style["arrow-icon"]}`} />
            </li>
            <li>
              {" "}
              <div className={`${style["cotent-box"]}`}>
                <Lottie animationData={manageLottie} loop={true} />
                <h6>Manage</h6>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
