import React from "react";
import Image from "next/future/image";
import imgOne from "../../../../images/bns/one-identity/one.png";
import imgTwo from "../../../../images/bns/one-identity/two.png";
import imgThree from "../../../../images/bns/one-identity/three.png";
import imgFour from "../../../../images/bns/one-identity/four.png";
import imgFive from "../../../../images/bns/one-identity/five.png";
import style from "./style.module.scss";
const OneIdentity = () => {
  return (
    <>
      <section className={`${style["one-identity-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["sec-header"]}`}>
                <h2>One identity across internet</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-12 order-2 order-md-1 col-md-6 col-lg-5">
              <div className={`${style["content-block"]}`}>
                <h3>A wallet tailored to your domain, wide open for you!</h3>
                <p>
                  This smart wallet offers top-notch security through OTP login
                  and easy account recovery. It also comes with handy support
                  for ENS and GNS domains.
                </p>
              </div>
            </div>
            <div className="col-sm-12 order-1 order-md-2 col-md-6 col-lg-7">
              <div className={`${style["img-block"]}`}>
                <Image src={imgOne.src} height={500} width={600} />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 col-md-6 col-lg-7">
              <div className={`${style["img-block"]}`}>
                <Image src={imgTwo.src} height={500} width={600} />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-5">
              <div className={`${style["content-block"]}`}>
                <h3>A wallet tailored to your domain, wide open for you!</h3>
                <p>
                  This smart wallet offers top-notch security through OTP login
                  and easy account recovery. It also comes with handy support
                  for ENS and GNS domains.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 order-2 order-md-1 col-md-6 col-lg-5">
              <div className={`${style["content-block"]}`}>
                <h3>A wallet tailored to your domain, wide open for you!</h3>
                <p>
                  This smart wallet offers top-notch security through OTP login
                  and easy account recovery. It also comes with handy support
                  for ENS and GNS domains.
                </p>
              </div>
            </div>
            <div className="col-sm-12 order-1 order-md-2 col-md-6 col-lg-7">
              <div className={`${style["img-block"]}`}>
                <Image
                  src={imgThree.src}
                  height={500}
                  width={600}
                  className={`${style["three"]}`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 col-md-6 col-lg-7">
              <div className={`${style["img-block"]}`}>
                <Image src={imgFour.src} height={500} width={600} />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-5">
              <div className={`${style["content-block"]}`}>
                <h3>A wallet tailored to your domain, wide open for you!</h3>
                <p>
                  This smart wallet offers top-notch security through OTP login
                  and easy account recovery. It also comes with handy support
                  for ENS and GNS domains.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-sm-12 order-2 order-md-1 col-md-6 col-lg-5">
              <div className={`${style["content-block"]}`}>
                <h3>A wallet tailored to your domain, wide open for you!</h3>
                <p>
                  This smart wallet offers top-notch security through OTP login
                  and easy account recovery. It also comes with handy support
                  for ENS and GNS domains.
                </p>
              </div>
            </div>
            <div className="col-sm-12 order-1 order-md-2 col-md-6 col-lg-7">
              <div className={`${style["img-block"]}`}>
                <Image src={imgFive.src} height={500} width={600} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OneIdentity;
