import React from "react";
import style from "./style.module.scss";
import Image from "next/future/image";
import Marquee from "react-fast-marquee";
import DummyLogo from "../../../../images/bns/dummylogo.png";

const DomainEvolution = () => {
  return (
    <>
      <section className={`${style["domain-evolution-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["sec-header"]}`}>
                <h2>Join the Web3 domain evolution!</h2>
                <p>
                  Experience seamless integration of all Web3 name services like
                  .gpt, .zk and .ind, with just one incredible service!
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["content-block"]}`}>
                <ul className={`${style["evolution-info-list"]}`}>
                  <li>Onestop domain Needs</li>
                  <li>15 Minutes Integration time</li>
                  <li>Integration ongoing with 100+ partners</li>
                </ul>
                <Marquee
                  pauseOnHover="true"
                  className={`${style["evolution-marque"]}`}
                >
                  <ul className={`${style["marquee-logo-list"]}`}>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>

                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                    <li>
                      <Image src={DummyLogo.src} height={50} width={150} />
                    </li>
                  </ul>
                </Marquee>

                <div className={`${style["evolution-btn-group"]}`}>
                  <button className={`btn ${style["theme-btn"]}`}>
                    Build with us
                  </button>
                  <button className={`btn ${style["secondary-btn"]}`}>
                    Partner with us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DomainEvolution;
