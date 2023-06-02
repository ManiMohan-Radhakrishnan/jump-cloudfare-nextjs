import React from "react";
import Image from "next/future/image";
import walletDomain from "../../../../images/bns/web3-decent.svg";
import web3Decent from "../../../../images/bns/web3-decent.svg";

import style from "./style.module.scss";
import { IoMdAdd } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
const BlockchainAgnostic = () => {
  return (
    <>
      <section className={`${style["blockchain-agnostic-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["sec-header"]}`}>
                <h2>Multi-Blockchain Compatible Name Service</h2>
                <p>Blockchain-Agnostic… With A Human Touch!</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <ul className={`${style["multi-blockchain-card-list"]} `}>
                <li>
                  <div
                    className={`${style["multi-blockchain-card"]} ${style["light-bg"]}`}
                  >
                    <div className={`${style["content-box"]}`}>
                      <div className={`${style["img-block"]}`}>
                        <Image src={walletDomain} height={400} width={400} />
                      </div>
                      <p>
                        Users Get Access To Exclusive IND Domains* To Claim For
                        Free*!
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className={`${style["multi-blockchain-card"]} ${style["light-bg"]} `}
                  >
                    <div className={`${style["content-box"]}`}>
                      <div className={`${style["img-block"]}`}>
                        <Image src={walletDomain} height={400} width={400} />
                      </div>
                      <p>
                        Users Get Access To Exclusive IND Domains* To Claim For
                        Free*!
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={`${style["multi-blockchain-card"]}`}>
                    <div className={`${style["content-box"]}`}>
                      <div className={`${style["img-block"]}`}>
                        <IoMdAdd />
                      </div>
                      <p>
                        Our OG Users Get Access To Exclusive Domains* To Claim
                        For $1.
                      </p>
                      <button className={`btn ${style["theme-btn"]}`}>
                        Click here for Whitelist <BsArrowRight />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlockchainAgnostic;
