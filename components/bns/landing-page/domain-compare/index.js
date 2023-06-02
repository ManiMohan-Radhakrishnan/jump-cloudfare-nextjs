import React from "react";
import Image from "next/future/image";
import web2Domain from "../../../../images/bns/web3domain_ico.svg";
import web3Domain from "../../../../images/bns/web3domain_ico.svg";

import style from "./style.module.scss";
import { BsArrowDown } from "react-icons/bs";
const DomainCompare = () => {
  return (
    <>
      <section className={`${style["domain-compare-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["sec-header"]}`}>
                <h2>Web2 Domain vs Web3 Domain</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <ul className={`${style["domain-compare-card-list"]} `}>
                <li>
                  <div className={`${style["domain-compare-card"]}`}>
                    <div className={`${style["content-box"]}`}>
                      <div className={`${style["img-block"]}`}>
                        <Image src={web2Domain} height={400} width={400} />
                      </div>
                      <h5>Web 2 Domains</h5>
                      <div
                        className={`${style["conversion-block"]}  ${style["dns"]}`}
                      >
                        <div className={`${style["conversion-input"]}`}>
                          <h6>192.xx.xxx.xxx</h6>
                        </div>
                        <BsArrowDown />
                        <div className={`${style["conversion-input"]}`}>
                          <h6>www.guardianlink.io</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className={`${style["domain-compare-card"]} ${style["dark-bg"]} `}
                  >
                    <div className={`${style["content-box"]}`}>
                      <div className={`${style["img-block"]}`}>
                        <Image src={web3Domain} height={400} width={400} />
                      </div>
                      <h5>Web 3 Domains</h5>
                      <div
                        className={`${style["conversion-block"]}  ${style["gns"]}`}
                      >
                        <div className={`${style["conversion-input"]}`}>
                          <h6>0xF1A6……7F3bAf</h6>
                        </div>
                        <BsArrowDown />
                        <div className={`${style["conversion-input"]}`}>
                          <h6>Guardian.wallet</h6>
                        </div>
                      </div>
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

export default DomainCompare;
