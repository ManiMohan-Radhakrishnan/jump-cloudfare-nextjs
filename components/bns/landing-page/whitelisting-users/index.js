import React from "react";

import style from "./style.module.scss";
const WhitelistingUsers = () => {
  return (
    <>
      <section className={`${style["whitelisting-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["sec-header"]}`}>
                <h2>Offers for OG and Whitelisting Users</h2>
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
              <div className={`${style["content-block"]}`}>
                <ul className={`${style["free-domain-card-list"]}`}>
                  <li>
                    <div className={`${style["free-domain-card"]}`}>
                      <div className={`${style["content-box"]}`}>
                        <h6>FREE</h6>
                        <h4>Whitelist to claim your free IND domain</h4>
                        <p>
                          Users Get Access To Exclusive IND Domains* To Claim
                          For Free*!
                        </p>
                        <button className={`btn ${style["theme-btn"]}`}>
                          Claim here
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={`${style["free-domain-card"]}`}>
                      <div className={`${style["content-box"]}`}>
                        <h6>DOMAIN</h6>
                        <h4>Custom domain starts from $1</h4>
                        <p>
                          Our OG Users Get Access To Exclusive Domains* To Claim
                          For $1.
                        </p>
                        <button className={`btn ${style["theme-btn"]}`}>
                          Click here
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={style["join-waitlist-form-block"]}>
        <div
          className={`${style["join-waitlist-form"]} ${style["singleline"]}`}
        >
          <h6>Join the waitlist Now</h6>
          <input
            type="text"
            name="text"
            placeholder="Email"
            className={style["email-content"]}
          />

          <button type="button">Join Now</button>
        </div>
        {/* {success && (
        <div className={style["success-message"]}>
          {(() => {
            if (success === "new-signup") {
              return (
                <div>
                  {`You're now on the waitlist! While we send you updates, why don't you create an account on Jump.trade?`}
                  <span>
                    {" "}
                    <a
                      // href={`${
                      //   process.env.NEXT_PUBLIC_ACCOUNTS_URL
                      // }/signup?fsz=${sessionStorage.getItem("fsz")}`}
                      href={`${
                        process.env.NEXT_PUBLIC_ACCOUNTS_URL
                      }/signup${fsz ? `?fsz=${fsz}` : ""}`}
                      target="_self"
                    >
                      Sign up here
                    </a>
                  </span>
                </div>
              );
            } else if (success === "new-signup-repeat") {
              return (
                <div>
                  {`You're already on the waitlist! While we send you updates, why don't you create an account on Jump.trade?`}
                  <span>
                    {" "}
                    <a
                      // href={`${
                      //   process.env.NEXT_PUBLIC_ACCOUNTS_URL
                      // }/signup?fsz=${sessionStorage.getItem("fsz")}`}
                      href={`${
                        process.env.NEXT_PUBLIC_ACCOUNTS_URL
                      }/signup${fsz ? `?fsz=${fsz}` : ""}`}
                      target="_self"
                    >
                      Sign up here
                    </a>
                  </span>
                </div>
              );
            } else return success;
          })()}
        </div>
      )}
      {autoLogin && email && !loginStatus && (
        <div className={`${style["getappLinkCheckbox"]}  py-2`}>
          <input
            type="checkbox"
            name="termsConditions"
            checked={termsConditions}
            onClick={() => setTermsConditions(!termsConditions)}
          />{" "}
          I allow Jump.trade to create an account for me and I confirm
          that I am 18 years or older. View{" "}
          <a
            target="_blank"
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/terms-and-conditions`
              )
            }
            className={`${style["link"]} ${style["link-orange"]}`}
          >{`T&Cs`}</a>{" "}
          and
          <a
            target="_blank"
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_MARKETPLACE_URL}/privacy-policy`
              )
            }
            className={`${style["link"]} ${style["link-orange"]}`}
          >{` Privacy Policy.`}</a>
        </div>
      )} */}
      </div>
    </>
  );
};

export default WhitelistingUsers;
