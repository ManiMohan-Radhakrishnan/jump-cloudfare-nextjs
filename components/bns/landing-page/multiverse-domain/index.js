import React from "react";

import style from "./style.module.scss";
const MultiverseDomain = () => {
  return (
    <>
      <section className={`${style["multiverse-domain-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["sec-header"]}`}>
                <h2>Multiverse Domine</h2>
                <p>
                  Empower with universal identity that represents all your
                  assets and qualities, secured across multiple blockchain
                  networks!
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <video
                loop
                muted
                autoPlay
                playsInline
                src={
                  "https://cdn.guardianlink.io/product-hotspot/videos/bns/MultiverseDomain_NEW.mp4"
                }
                className={style["bns-multiverseldomain-video"]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MultiverseDomain;
