import React, { useEffect, useState } from "react";
import NFTCounter from "../../../nft-counter";
import { IoIosTimer } from "react-icons/io";
import style from "./style.module.scss";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { dateFormat, validateName } from "../../../../utils/common";
import { lootPrebookStartsTimeApi } from "../../../../utils/methods";
import { LOOT_STATUS } from "../../../bat-nft-components/common";
import { toast } from "react-toastify";
const PrebookDomain = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [domain, setDomain] = useState({
    keyword: "",
  });
  const [error, setError] = useState(false);

  // const bnsDomainSlug = process.env.NEXT_PUBLIC_BNS_DOMAIN_SLUG;

  // const [orderDetails, setOrderDetails] = useState({});

  // const [eventInfo, setEventInfo] = useState({
  //   title: "DROP COMING SOON",
  //   status: LOOT_STATUS?.DROP_YTA,
  //   buttonTitle: "BUY NOW",
  //   buttonDisabled: true,
  // });

  // const initEventInfo = (showToast = false) => {
  //   const now = new Date().getTime(orderDetails?.current_time);
  //   let event_info = { ...eventInfo };
  //   let statusChangeMessage = "";
  //   if (parseInt(orderDetails?.available_qty) === 0) {
  //     event_info = {
  //       title: "SOLD OUT",
  //       status: LOOT_STATUS?.SOLD_OUT,
  //       buttonTitle: "SOLD OUT",
  //       buttonDisabled: true,
  //     };
  //   } else if (
  //     now <= new Date(orderDetails?.auction_start_time).getTime() &&
  //     orderDetails?.auction_start_time !== null
  //   ) {
  //     event_info = {
  //       title: "DROP STARTS IN",
  //       status: LOOT_STATUS?.DROP_YTS,
  //       endAt: dateFormat(orderDetails?.auction_start_time),
  //       buttonTitle: "BUY NOW",
  //       buttonDisabled: true,
  //     };
  //   } else if (
  //     now > new Date(orderDetails?.auction_start_time).getTime() &&
  //     now <= new Date(orderDetails?.auction_end_time).getTime() &&
  //     orderDetails?.flow_status === "buy" &&
  //     orderDetails?.auction_end_time !== null &&
  //     orderDetails?.auction_start_time !== null
  //   ) {
  //     {
  //       orderDetails?.purchased_qty === orderDetails?.qty_per_user
  //         ? (statusChangeMessage = "You bought")
  //         : "";
  //     }
  //     event_info = {
  //       title: "DROP ENDS IN",
  //       status: LOOT_STATUS?.DROP,
  //       endAt: dateFormat(orderDetails?.auction_end_time),
  //       buttonTitle: "BUY NOW",
  //       buttonDisabled:
  //         !orderDetails?.available_qty ||
  //         orderDetails?.purchased_qty === orderDetails?.qty_per_user,
  //     };
  //   } else if (
  //     now > new Date(orderDetails?.auction_end_time).getTime() &&
  //     orderDetails?.auction_end_time !== null
  //   ) {
  //     statusChangeMessage = "Drop ended";
  //     event_info = {
  //       title: "DROP ENDED",
  //       status: LOOT_STATUS?.SOLD_OUT,
  //       buttonTitle: "SOLD OUT",
  //       buttonDisabled: true,
  //     };
  //   }
  //   // if (statusChangeMessage) {
  //   //   toggleModal();
  //   //   showToast && toast.info(statusChangeMessage);
  //   // }
  //   setEventInfo(event_info);
  // };

  const [validation, setValidation] = useState({
    keyword: false,
    valid_keyword: false,
  });

  // const handleDomainPrebook = async () => {
  //   try {
  //     const response = await lootPrebookStartsTimeApi({ slug: bnsDomainSlug });
  //     // setOrderDetails(response?.data?.data?.loot);
  //   } catch (error) {
  //     console.log("errorprebook", error);
  //   }
  // };

  // useEffect(() => {
  //   initEventInfo();
  //   handleDomainPrebook();
  // }, []);
  const checkValidation = () => {
    let c_validation = { ...validation };

    if (!domain.keyword) {
      c_validation = { ...c_validation, keyword: true };
    } else {
      if (validateName(domain.keyword)) {
        c_validation = { ...c_validation, valid_keyword: false };
      } else {
        c_validation = { ...c_validation, valid_keyword: true };
      }
    }

    setValidation(c_validation);
    if (!c_validation.keyword && !c_validation.valid_keyword) {
      return true;
    } else {
      return false;
    }
  };

  // const handleDomain = async (domain_name) => {
  //   if (domain_name > 3) {
  //     try {
  //       const result = await lootDomainSearchApi({
  //         slug: bnsDomainSlug,
  //         domain_name: domain_name,
  //       });
  //       console.log(result, "resulteeeee");
  //       // setPaymentApproxUsd(result?.data?.data);
  //     } catch (error) {
  //       console.log("resultwww");

  //       setLoading(false);
  //       console.log(
  //         "🚀 ~ file: index.js ~ line 45 ~ lootDomainSearchApi ~ error",
  //         error
  //       );
  //     }
  //   }
  // };

  const handleSearchDomain = async (e) => {
    if (domain?.keyword?.length >= 3) {
      if (checkValidation()) {
        console.log("query_string");
        try {
          setLoading(true);
          let query_string = { ...domain };

          query_string = query_string?.keyword;

          if (query_string) {
            router.push(`/bns-buy?&searchTerm=${query_string}`);
          } else {
            router.push("/nft-marketplace/bns");
          }
        } catch (error) {
          setLoading(false);
          if (error?.data?.status === 422) {
            toast.error(error?.data?.message);
          }
          console.log(
            "🚀 ~ file: index.js ~ line 42 ~ handleSearchDomain ~ error",
            error
          );
        }
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <section className={`${style["prebookdomain-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["sec-header"]}`}>
                <h2>Prebook your web3 domain</h2>
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
                {/* <div className={`${style["timer-block"]}`}>
                  <h3>{eventInfo?.title}</h3>
                  <IoIosTimer />

                  <NFTCounter
                    className="bns-timer-prebook"
                    title="Prebook starts"
                    time={eventInfo?.endAt}
                    timeClass="alert-counter-time"
                    intervalClass="alert-counter-interval"
                    intervalGapClass="alert-counter-gap"
                  />
                </div> */}

                <div className={`${style["input-group"]} input-group `}>
                  <input
                    type="text"
                    title={"Search Web3 Domain Name"}
                    value={domain?.keyword}
                    required={validation.keyword}
                    grpClassName={`mb-0`}
                    className={`${style["form-control"]} form-control`}
                    placeholder=" Search Web3 Domain Name "
                    maxLength="11"
                    onChange={(e) => {
                      if (e?.target?.value) {
                        if (validateName(e.target.value)) {
                          setDomain({
                            ...domain,
                            keyword: e?.target?.value.trim(),
                          });
                          {
                            e.target?.value > 3 &&
                              handleDomain(e.target?.value);
                          }
                          if (e?.target?.value) {
                            setValidation({
                              ...validation,
                              keyword: false,
                            });
                          } else {
                            setValidation({
                              ...validation,
                              keyword: true,
                            });
                          }
                        }
                      } else {
                        setDomain({
                          ...domain,
                          keyword: "",
                        });
                        // handleDomain("");
                      }
                    }}
                  />
                  {/* {eventInfo?.buttonTitle && (
                    <Nav.Link
                      role="button"
                      disabled={eventInfo.buttonDisabled}
                      // onClick={() => router.push("/").then(() => router.reload())}
                      // href="/nft-marketplace"
                      onClick={() =>
                        // router.push(`/nft-marketplace/bns?${query_string}`)
                        handleSearchDomain()
                      }
                      className={`${style["input-group-text"]}  input-group-text `}
                    >
                      {eventInfo?.buttonTitle}
                    </Nav.Link>
                  )} */}
                  <Nav.Link
                    role="button"
                    onClick={() => handleSearchDomain()}
                    className={`${style["input-group-text"]}  input-group-text `}
                  >
                    GO
                  </Nav.Link>
                </div>
                {error && (
                  <div
                    className={`${style["input-group"]} ${style["error-msg"]} input-group `}
                  >
                    <h6 className={` text-danger `}>
                      (Required Minimum 3 letters)
                    </h6>
                  </div>
                )}
                {/* <a
                  href="javascript:void(0);"
                  className={`${style["domain-link"]}`}
                >
                  How to register your BNS domain <BsArrowRightShort />
                </a> */}

                {/* <ul className={`${style["domainlist"]}`}>
                  <li className={`${style["active"]}`}>
                    <div className={`${style["domain-info"]}`}>
                      <h6 className={`${style["title"]}`}>.gpt</h6>
                      <h6 className={`${style["domain-price"]}`}>
                        <span className={`${style["key"]}`}>
                          domain starts from
                        </span>
                        <span className={`${style["value"]}`}>$9.99</span>
                      </h6>
                    </div>
                  </li>
                  <li>
                    <div className={`${style["domain-info"]}`}>
                      <h6 className={`${style["title"]}`}>.ind</h6>
                      <h6 className={`${style["domain-price"]}`}>
                        <span className={`${style["key"]}`}>
                          domain starts from
                        </span>
                        <span className={`${style["value"]}`}>$0.99</span>
                      </h6>
                    </div>
                  </li>
                  <li>
                    <div className={`${style["domain-info"]}`}>
                      <h6 className={`${style["title"]}`}>.usa</h6>
                      <h6 className={`${style["domain-price"]}`}>
                        <span className={`${style["key"]}`}>
                          domain starts from
                        </span>
                        <span className={`${style["value"]}`}>$4.99</span>
                      </h6>
                    </div>
                  </li>
                  <li>
                    <div className={`${style["domain-info"]}`}>
                      <h6 className={`${style["title"]}`}>.identity</h6>
                      <h6 className={`${style["domain-price"]}`}>
                        <span className={`${style["key"]}`}>
                          domain starts from
                        </span>
                        <span className={`${style["value"]}`}>$19.99</span>
                      </h6>
                    </div>
                  </li>
                  <li>
                    <div className={`${style["domain-info"]}`}>
                      <h6 className={`${style["title"]}`}>.zk</h6>
                      <h6 className={`${style["domain-price"]}`}>
                        <span className={`${style["key"]}`}>
                          domain starts from
                        </span>
                        <span className={`${style["value"]}`}>$49.99</span>
                      </h6>
                    </div>
                  </li>
                </ul> */}

                {/* <div className={`${style["btn-block"]}`}>
                  <button className={`${style["theme-btn"]} btn`}>
                    Preebook Now
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrebookDomain;
