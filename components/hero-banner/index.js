import { useState, useEffect, useRef, useCallback } from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import Image from "next/future/image";
import { useDispatch, useSelector } from "react-redux";

import FlipTimer from "../flip-timer";

import {
  setFusorsDropLive,
  setMclPlayPassDropLive,
  setMclShotsDropLive,
} from "../../redux/reducers/user_reducer";
import { dateFormat, getOS } from "../../utils/common";
import {
  lootAvailableQty,
  gameCodesAvailableQty,
} from "../../utils/actioncable-methods";
import useWindowSize from "../../hooks/useWindowSize";
import images from "../../utils/images-new.json";
import HeroContentBg from "../../images/hero-content-bg.svg";
import HeroRaddxContentBg from "../../images/jump-trade/hero-banner/raddx/Jump-Page_Raddx-banner_Front.png";
import HeroRaddxContentBgLeft from "../../images/jump-trade/hero-banner/raddx/Jump-Page_Raddx-banner_Front-left.png";
import RaddxMob from "../../images/drop/car-nft-images/final-mob-raddx.jpg";
import RaddxTab from "../../images/drop/car-nft-images/fianal-tab-image.jpg";

import style from "./style.module.scss";
import CarImages from "../../utils/images.json";
import "swiper/css/pagination";
import { LOOT_STATUS } from "../mcl-game-code-components/common";
import NFTCounter from "../nft-counter";

const HeroBanner = ({
  tournamentRef,
  details,
  shotsDetails,
  preBookStartTime,
  fusorDetails,
}) => {
  const { user } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const router = useRouter();
  const swiperRef = useRef();
  // const isCryptoBatDropLive = useSelector(cryptoBatDropLiveStatus);
  const [loadingVideoFirst, setLoadingVideoFirst] = useState(false);
  // const [loadingVideoSec, setLoadingVideoSec] = useState(false);
  const [live, setLive] = useState(false);
  const market_start_date = "May 4, 2022 12:30:00";
  const [bannerImage, setBannerImage] = useState({
    src: CarImages.car_raddx_web,
    height: 1920,
    width: 1080,
  });
  const [eventInfo, setEventInfo] = useState({});
  const [fusorEventInfo, setFusorEventInfo] = useState({});

  // useEffect(() => {
  //   initEventInfo();
  // }, [details]);

  // const initEventInfo = () => {
  //   const now = new Date().getTime();
  //   let event_info = {
  //     // title: "PRE-BOOK STARTS IN",
  //     // // status: LOOT_STATUS?.PRE_BOOK,
  //     // endAt: dateFormat(preBookStartTime),
  //     // buttonTitle: "Pre-Book",
  //     // buttonDisabled: true,
  //   };
  //   let statusChangeMessage = "";
  //   if (now < new Date(preBookStartTime).getTime()) {
  //     event_info = {
  //       title: "PRE-BOOK STARTS IN",
  //       status: LOOT_STATUS?.YTS,
  //       endAt: dateFormat(preBookStartTime),
  //       buttonTitle: "Explore",
  //     };
  //   } else if (
  //     now >= new Date(preBookStartTime).getTime() &&
  //     now <= new Date(details?.preorder_end_time).getTime()
  //   ) {
  //     event_info = {
  //       title: "PRE-BOOK ENDS IN",
  //       status: LOOT_STATUS?.PRE_BOOK,
  //       endAt: dateFormat(details?.preorder_end_time),
  //       buttonTitle: "PRE-BOOK NOW",
  //     };
  //   } else if (
  //     parseInt(details?.available_qty) === 0 &&
  //     now < new Date(details?.auction_end_time).getTime()
  //   ) {
  //     statusChangeMessage = "Crypto Bat NFTs are sold out!";
  //     // dispatch(setCryptoBatDropLive(LOOT_STATUS?.SOLD_OUT));
  //     event_info = {
  //       title: "DROP ENDED",
  //       status: LOOT_STATUS?.SOLD_OUT,
  //       buttonTitle: "SOLD OUT",
  //     };
  //   } else if (
  //     details?.auction_start_time === null ||
  //     details?.auction_end_time === null
  //   ) {
  //     event_info = {
  //       title: "DROP COMING SOON",
  //       status: LOOT_STATUS?.DROP_YTA,
  //       buttonTitle: "Buy Now",
  //     };
  //   } else if (
  //     now > new Date(details?.preorder_end_time).getTime() &&
  //     now < new Date(details?.auction_start_time).getTime()
  //   ) {
  //     // dispatch(setCryptoBatDropLive(LOOT_STATUS?.DROP_YTS));
  //     event_info = {
  //       title: "DROP STARTS IN",
  //       status: LOOT_STATUS?.DROP_YTA,
  //       endAt: dateFormat(details?.auction_start_time),
  //       buttonTitle: "Explore Now",
  //     };
  //   } else if (
  //     now >= new Date(details?.auction_start_time).getTime() &&
  //     now < new Date(details?.auction_end_time).getTime()
  //   ) {
  //     // dispatch(setCryptoBatDropLive(LOOT_STATUS?.DROP));
  //     event_info = {
  //       title: "DROP ENDS IN",
  //       status: LOOT_STATUS?.DROP,
  //       endAt: dateFormat(details?.auction_end_time),
  //       buttonTitle: "Buy Now",
  //     };
  //   } else if (now >= new Date(details?.auction_end_time).getTime()) {
  //     statusChangeMessage = "Drop ended";
  //     // dispatch(setCryptoBatDropLive(LOOT_STATUS?.SOLD_OUT));
  //     event_info = {
  //       title: "DROP ENDED",
  //       status: LOOT_STATUS?.SOLD_OUT,
  //       buttonTitle: "SOLD OUT",
  //     };
  //   }

  //   setEventInfo(event_info);
  // };

  const fusorInitEventInfo = (showToast = false) => {
    const now = new Date().getTime();
    let event_info = { ...fusorEventInfo };
    if (parseInt(fusorDetails?.available_qty) === 0) {
      event_info = {
        title: "DROP SOLD OUT",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "DROP SOLD OUT",
        buttonDisabled: true,
      };
    } else if (now < new Date(fusorDetails?.preorder_start_time).getTime()) {
      event_info = {
        title: "PRE-BOOK STARTS IN",
        status: LOOT_STATUS?.YTS,
        endAt: dateFormat(fusorDetails?.preorder_start_time),
        buttonTitle: "PRE-BOOK",
        buttonDisabled: true,
      };
    } else if (
      now >= new Date(fusorDetails?.preorder_start_time).getTime() &&
      now <= new Date(fusorDetails?.preorder_end_time).getTime()
    ) {
      event_info = {
        title: "PRE-BOOK ENDS IN",
        status: LOOT_STATUS?.PRE_BOOK,
        endAt: dateFormat(fusorDetails?.preorder_end_time),
        buttonTitle: "PRE-BOOK NOW",
        buttonDisabled: false,
      };
    } else if (
      fusorDetails?.auction_start_time === null ||
      fusorDetails?.auction_end_time === null
    ) {
      statusChangeMessage = "Pre-book ended";
      event_info = {
        title: "DROP COMING SOON",
        status: LOOT_STATUS?.DROP_YTA,
        buttonTitle: "EXPLORE",
        buttonDisabled: true,
      };
    } else if (
      now > new Date(fusorDetails?.preorder_end_time).getTime() &&
      now <= new Date(fusorDetails?.auction_start_time).getTime()
    ) {
      event_info = {
        title: "DROP STARTS IN",
        status: LOOT_STATUS?.DROP_YTS,
        endAt: dateFormat(fusorDetails?.auction_start_time),
        buttonTitle: "EXPLORE",
        buttonDisabled: false,
      };
    } else if (fusorDetails?.flow_status === "assign") {
      let endAt =
        now <= new Date(fusorDetails?.auction_start_time).getTime()
          ? fusorDetails?.auction_start_time
          : fusorDetails?.auction_end_time;
      let title =
        now <= new Date(fusorDetails?.auction_start_time).getTime()
          ? "DROP STARTS IN"
          : "DROP ENDS IN";
      event_info = {
        title,
        endAt,
        status: LOOT_STATUS?.ASSIGNING_NFTS,
        buttonTitle: "EXPLORE",
        buttonDisabled: true,
      };
    } else if (
      now > new Date(fusorDetails?.auction_start_time).getTime() &&
      now <= new Date(fusorDetails?.auction_end_time).getTime() &&
      fusorDetails?.flow_status === "buy"
    ) {
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: dateFormat(fusorDetails?.auction_end_time),
        buttonTitle: "BUY NOW",
        buttonDisabled: false,
      };
    } else if (now > new Date(fusorDetails?.auction_end_time).getTime()) {
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.DROP_ENDED,
        buttonTitle: "DROP ENDED",
        buttonDisabled: true,
      };
    }

    setFusorEventInfo(event_info);
  };

  useEffect(() => {
    fusorInitEventInfo();
  }, [fusorDetails]);

  useEffect(() => {
    if (fusorDetails?.slug) {
      fusorInitEventInfo();
      lootAvailableQty(fusorDetails?.slug, (data) => {
        const now = new Date(fusorDetails?.current_time).getTime();

        if (parseInt(data?.available) === 0) {
          dispatch(setFusorsDropLive(LOOT_STATUS?.SOLD_OUT));
          setFusorEventInfo({
            title: "DROP ENDED",
            status: LOOT_STATUS?.SOLD_OUT,
            buttonTitle: "DROP SOLD OUT",
            buttonDisabled: true,
          });
        } else {
          if (
            data?.flow_status === "buy" &&
            eventInfo?.status !== LOOT_STATUS?.DROP
          ) {
            dispatch(setFusorsDropLive(LOOT_STATUS?.DROP));
            setFusorEventInfo({
              title: "DROP ENDS IN",
              status: LOOT_STATUS?.DROP,
              endAt: dateFormat(fusorDetails?.auction_end_time),
              buttonTitle: "BUY NOW",
              buttonDisabled: !fusorDetails?.available_qty,
            });
          }
          if (
            data?.flow_status === "assign" &&
            eventInfo?.status !== LOOT_STATUS?.ASSIGNING_NFTS
          ) {
            let endAt =
              now <= new Date(fusorDetails?.auction_start_time).getTime()
                ? fusorDetails?.auction_start_time
                : fusorDetails?.auction_end_time;
            let title =
              now <= new Date(fusorDetails?.auction_start_time).getTime()
                ? "DROP STARTS IN"
                : "DROP ENDS IN";
            dispatch(setFusorsDropLive(LOOT_STATUS?.ASSIGNING_NFTS));
            setFusorEventInfo({
              title,
              endAt,
              status: LOOT_STATUS?.ASSIGNING_NFTS,
              buttonTitle: "Assigning NFTs",
              buttonDisabled: true,
            });
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fusorDetails]);

  // useEffect(() => {
  //   timeFunction(false);
  //   gameCodesAvailableQty(slug, (data) => {
  //     if (parseInt(data?.available) === 0) {
  //       dispatch(setMclPlayPassDropLive(LOOT_STATUS?.SOLD_OUT));
  //       setEventInfo({
  //         title: "SOLD OUT",
  //         status: LOOT_STATUS?.SOLD_OUT,
  //         buttonTitle: "Explore",
  //         buttonDisabled: true,
  //       });
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    setBannerImage((imgSrc) => {
      if (width < 768) {
        return { src: RaddxMob, width: 767, height: 450 };
      }
      if (width < 1031) {
        return { src: RaddxTab, width: 1030, height: 520 };
      }
      return bannerImage;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const scrollIntournaments = (e) => {
    e.preventDefault();
    tournamentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const titleStatus = [LOOT_STATUS?.DROP_ENDED, LOOT_STATUS?.SOLD_OUT];

  return (
    <section className={style["jt-hero-section"]}>
      <Swiper
        ref={swiperRef}
        className={`${style["hero-carousel"]}`}
        slidesPerView={1}
        centeredSlides={true}
        modules={[Navigation, Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 15000, disableOnInteraction: true }}
        speed={500}
        // loop
        uniqueNavElements
      >
        {/* fusor banner */}
        {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]} ${style["fusor-banner"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image
                    layout="responsive"
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <span
                    className={`${style["hero-main-heading"]} ${style["fusor-banner-heading"]}`}
                  >
                    MERGE, UPGRADE AND DOMINATE WITH THE ALL NEW FUSOR NFTs
                  </span>
                  <p className={style["hero-desc"]}>
                    Elevate Your MCL Gameplay with Fusor NFTs! Fuse and Receive
                    Three Exclusively Available NFTs - MCL Premier Player,
                    Special Shot, and Fielding Action NFTs - and Conquer the
                    Game like a Pro!
                  </p>
                  <div className="banner-timer-section">
                    <h5 className="banner-timer-title">
                      {!titleStatus.includes(fusorEventInfo?.status) &&
                        fusorEventInfo?.title}
                    </h5>
                    {fusorEventInfo?.status !== LOOT_STATUS.SOLD_OUT &&
                      fusorEventInfo?.endAt && (
                        <FlipTimer
                          classNames={"bat-timer"}
                          endTime={fusorEventInfo?.endAt}
                          handleEndEvent={() => {
                            setTimeout(() => fusorInitEventInfo(true), 1000);
                          }}
                        />
                      )}
                  </div>
                  {fusorEventInfo?.buttonTitle && (
                    <div className={style["hero-btn-block"]}>
                      <button
                        className={`${style["theme-btn"]} ${style["explore-btn"]} ${style["mr-1"]} ${style["pre-btn"]}`}
                        onClick={() => router.push("/drop/mcl-fusor-nfts")}
                      >
                        {fusorEventInfo?.buttonTitle}
                      </button>
                    </div>
                  )}
                </div>
                <div className={style["pp-hero-contet-img"]}>
                  <Image
                    layout="responsive"
                    height="1280"
                    width="720"
                    src={images.fusor_banner_image}
                    alt="fusor_banner_image"
                    priority={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
        {/* Raddx Banner */}
        {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["updated-video-sec"]}`}
            >
              {width && (
                <video
                  id="full-screenVideo"
                  loop
                  muted
                  autoPlay
                  playsInline
                  onLoadedData={() => setLoadingVideoFirst(false)}
                  poster={images.poster_image}
                  controlsList="nodownload"
                  className={`${style["video-fixed"]} `}
                  src={width > 1030 ? images.raddx_web : images.raddx_mobile}
                  type="video/mp4"
                ></video>
              )}
              <div className={style["hero-content-block"]}>
                <div className={style["hero-content-box"]}>
                  <Image
                    layout="responsive"
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <h3>RACE TO THE TOP WITH RADDX METAVERSE NFTs</h3>
                  <p className={style["hero-desc"]}>
                    Get your hands on highly collectible & tradable cars, own
                    exclusive digital lands, and race your way through this
                    exciting metaverse.
                  </p>

                  <div className="time-show">
                    <div className="pl-3 pr-3">
                      <h5 className="mb-1">
                        {""}
                        {(() => {
                          if (
                            new Date(details?.preorder_start_time).getTime() >
                              new Date().getTime() &&
                            new Date(
                              details?.preorder_og_start_time
                            ).getTime() > new Date().getTime()
                          )
                            return (
                              <>
                                {" "}
                                PRE-BOOK <span>(OG Users)</span> STARTS IN
                              </>
                            );
                          else if (
                            new Date(
                              details?.preorder_og_start_time
                            ).getTime() < new Date().getTime() &&
                            new Date(details?.preorder_start_time).getTime() >
                              new Date().getTime()
                          )
                            return (
                              <>
                                PRE-BOOK <span>(OG Users)</span>
                              </>
                            );
                          else return eventInfo?.title;
                        })()}
                      </h5>
                      {eventInfo?.endAt && (
                        <div className="nft-collection-timer">
                          {new Date(details?.preorder_og_start_time).getTime() <
                            new Date().getTime() &&
                          new Date(details?.preorder_start_time).getTime() >
                            new Date().getTime() ? (
                            <>
                              {" "}
                              <span className="blink live-pill">Live Now</span>
                            </>
                          ) : (
                            <>
                              <NFTCounter
                                time={(() => {
                                  if (
                                    new Date(
                                      details?.preorder_start_time
                                    ).getTime() > new Date().getTime() &&
                                    new Date(
                                      details?.preorder_og_start_time
                                    ).getTime() > new Date().getTime()
                                  )
                                    return dateFormat(
                                      details?.preorder_og_start_time
                                    );
                                  else if (
                                    new Date(
                                      details?.preorder_og_start_time
                                    ).getTime() < new Date().getTime() &&
                                    new Date(
                                      details?.preorder_start_time
                                    ).getTime() > new Date().getTime()
                                  )
                                    return <></>;
                                  else return eventInfo?.endAt;
                                })()}
                                timeClass="collection-timer"
                                className="theme-time"
                                handleEndEvent={() =>
                                  setTimeout(initEventInfo, 1000)
                                }
                              />
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {new Date(details?.preorder_start_time).getTime() >
                    new Date().getTime() ? (
                      <>
                        <div className="line"></div>
                        <div className="pl-3 pr-3">
                          <h5 className="mb-1">
                            PRE-BOOK <span>(EVERYONE)</span> STARTS IN
                          </h5>

                          <div className="nft-collection-timer">
                            <NFTCounter
                              time={dateFormat(details?.preorder_start_time)}
                              timeClass="collection-timer"
                              className="theme-time"
                              handleEndEvent={() =>
                                setTimeout(initEventInfo, 1000)
                              }
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["explore-btn"]} ${style["mr-1"]} ${style["pre-btn"]}`}
                      onClick={() =>
                        window.open(process.env.NEXT_PUBLIC_RADDX_URL, "_blank")
                      }
                    >
                      <span>Drop Sold Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}

        {/* Raddx banner commented */}
        {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["raddx_gift_banner"]}  ${style["two-column"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image
                    layout="responsive"
                    height="1280"
                    width="720"
                    src={CarImages.raddx_banner_drop_image}
                    alt="circle_image"
                    priority={true}
                  />
                </div>
                <div
                  className={style["pp-hero-contet-img"]}
                  onClick={() =>
                    window.open(
                      `${process.env.NEXT_PUBLIC_RADDX_URL}/guaranteed-gift-box`,
                      "_blank"
                    )
                  }
                >
                  <Image
                    layout="responsive"
                    height="1280"
                    width="720"
                    src={CarImages.raddx_banner_drop_image_rewards}
                    alt="circle_image"
                    priority={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
        {/* Raddx banner commented */}

        {/* Spin Wheel Banner */}
        {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image
                    layout="responsive"
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <span className={style["hero-main-heading-contest"]}>
                    SPIN-THE-WHEEL CONTEST
                  </span>
                  <span className={style["hero-main-heading-contest"]}>
                    OWN AN MCL SIGNATURE SHOT!
                  </span>
                  <span className={style["hero-main-heading-contest"]}>
                    GET TO SPIN &amp; WIN PRIZES WORTH $6,000!
                  </span>
                  <span className={style["hero-main-heading-contest"]}>
                    EVERY SPIN WINS!
                  </span>

                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["explore-btn"]}`}
                      onClick={() =>
                        window.open(
                          `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/spin-wheel`,
                          "_self"
                        )
                      }
                    >
                      <span>Live Now</span>
                    </button>
                  </div>
                </div>
                <div className={style["pp-hero-contet-img"]}>
                  <Image
                    layout="responsive"
                    height="1280"
                    width="720"
                    src={
                      width < 768
                        ? images?.spin_contest_landing_mobile
                        : images?.spin_contest_landing_web
                    }
                    alt="circle_image"
                    priority={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
        {/* Asia Largest Banner */}
        <SwiperSlide>
          <div className="item">
            <section className={style["hero-banner-sec"]}>
              {width && (
                <>
                  {getOS() === "iOS" ? (
                    <Image
                      layout="responsive"
                      height="512"
                      width="1024"
                      alt="Poster"
                      id="full-screenVideo"
                      className={`${style["image-fixed"]}`}
                      src={images.hero_poster}
                    />
                  ) : (
                    <video
                      id="full-screenVideo"
                      loop
                      muted
                      autoPlay
                      playsInline
                      onLoadedData={() => setLoadingVideoFirst(false)}
                      poster={images.hero_poster}
                      controlsList="nodownload"
                      className={`${style["video-fixed"]}`}
                      src={
                        loadingVideoFirst
                          ? images.hero_poster
                          : images.nft_banner
                      }
                      type="video/mp4"
                    ></video>
                  )}
                </>
              )}
              <div className={style["hero-content-block"]}>
                <div className={style["hero-content-box"]}>
                  <Image
                    layout="responsive"
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <span className={style["hero-main-heading"]}>
                    ASIA&apos;S LARGEST <br /> NFT MARKETPLACE
                  </span>
                  <p className={style["hero-desc"]}>
                    Jump.trade - Your Destination For A Wide Range Of
                    Astonishing Game &amp; Brand NFTs. Explore our NFT
                    marketplace now!
                  </p>
                  <ul className={style["hero-data-count-list"]}>
                    <li className={style["hero-data-count-item"]}>
                      <span className={style["hero-data-count-value"]}>
                        98K+
                      </span>
                      <span className={style["hero-data-count-title"]}>
                        NFTs
                      </span>
                    </li>
                    <li className={style["hero-data-count-item"]}>
                      <span className={style["hero-data-count-value"]}>
                        175K+
                      </span>
                      <span className={style["hero-data-count-title"]}>
                        Trades
                      </span>
                    </li>

                    <li className={style["hero-data-count-item"]}>
                      <span className={style["hero-data-count-value"]}>
                        4M+
                      </span>
                      <span className={style["hero-data-count-title"]}>
                        Matches
                      </span>
                    </li>
                  </ul>

                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["explore-btn"]} ${style["mr-1"]} ${style["pre-btn"]}`}
                      onClick={() => router.push("/nft-marketplace")}
                    >
                      <span>Explore Market</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide>
        {/* Play Pass Banner */}
        {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image
                    layout="responsive"
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <span className={style["hero-main-heading"]}>
                    PLAY THE $15,000 MCL CROWN CLASH TOURNAMENT FOR FREE!
                  </span>
                  <p className={style["hero-desc"]}>
                    Get ready to compete and win big in the MCL Crown Clash
                    Tournament! Download the MCL Game to claim your FREE PASS
                    and play your way to the top of this $15,000 prize pool
                    tournament.
                  </p>
                  <div className="banner-timer-section">
                    <h5 className="banner-timer-title">{eventInfo?.title}</h5>
                    {eventInfo?.status !== LOOT_STATUS.SOLD_OUT &&
                      eventInfo?.endAt && (
                        <FlipTimer
                          classNames={"bat-timer"}
                          endTime={eventInfo?.endAt}
                          handleEndEvent={() => {
                            setTimeout(() => initEventInfoPass(true), 1000);
                          }}
                        />
                      )}
                  </div>
                  <div className={style["hero-btn-block"]}>
                    {eventInfo?.buttonTitle && (
                      <button
                        className={`${style["theme-btn"]} ${style["explore-btn"]}`}
                        onClick={() => router.push("/drop/free-mcl-pass")}
                      >
                        <span>{eventInfo?.buttonTitle}</span>
                      </button>
                    )}
                    <a
                      className={`${style["theme-btn"]} ${style["rounded-bordered"]}`}
                      role="button"
                      onClick={() => router.push("/mcl-game")}
                    >
                      <span>Download MCL Game</span>
                    </a>
                  </div>
                </div>
                <div className={style["pp-hero-contet-img"]}>
                  {details?.available_qty === 0 && (
                    <h5 className={style["banner-timer-title"]}>
                      PASSES SOLD OUT
                    </h5>
                  )}
                  <Image
                    layout="responsive"
                    height="1280"
                    width="720"
                    src={
                      width < 768
                        ? images?.crown_pass_mob
                        : images?.crown_pass_mob
                    }
                    alt="circle_image"
                    priority={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
        {/* Signature Shots Banner */}
        {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image
                    layout="responsive"
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <span className={style["hero-main-heading"]}>
                    ANNOUNCING THE MCL SIGNATURE SHOTS - MYSTERY BOX
                  </span>
                  <p className={style["hero-desc"]}>
                    Introducing motion-captured batting shots that are visually
                    stunning and give your gameplay greater line-connect
                    accuracy. The MCL Signature Shot NFTs are tradeable,
                    collectible, and playable.
                  </p>
                  <div className="banner-timer-section">
                    <h5 className="banner-timer-title">
                      {eventInfoPass?.title}
                    </h5>
                    {eventInfoPass?.endAt && (
                      <FlipTimer
                        classNames={"bat-timer"}
                        endTime={eventInfoPass?.endAt}
                        handleEndEvent={() => {
                          setTimeout(() => initEventInfoShots(true), 1000);
                        }}
                      />
                    )}
                  </div>

                  <div className={style["hero-btn-block"]}>
                    {eventInfoPass?.buttonTitle && (
                      <button
                        className={`${style["theme-btn"]} ${style["explore-btn"]}`}
                        onClick={() => router.push("/drop/mcl-shot-nfts")}
                      >
                        <span>{eventInfoPass?.buttonTitle}</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className={style["pp-hero-contet-img"]}>
                  <Image
                    layout="responsive"
                    height="1280"
                    width="720"
                    src={
                      width < 768
                        ? images?.mcl_shots_mobile
                        : images?.mcl_shots_web
                    }
                    alt="circle_image"
                    priority={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]} `}
              style={{
                backgroundImage: `url(${
                  width > 991 &&
                  images?.santa_banner_contest_landing_web_fullbanner
                })`,
              }}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image
                    layout="responsive"
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <span className={style["hero-main-heading"]}>
                    $12000 SUPER SANTA TREASURE BOX CONTEST!
                  </span>
                  <span className={style["hero-desc_h5"]}>
                    100 Random NEW Buyers making their first-ever purchase of at
                    least 1 MCL Batsman NFT and 1 MCL Bowler NFT will receive a
                    treasure box with EPIC Prizes!
                  </span>
                  <div className="banner-timer-section">
                    {contestInfo?.title && (
                      <span className="banner-timer-title">
                        {contestInfo?.title}
                      </span>
                    )}
                    {contestInfo?.sub_title && (
                      <p className="banner-timer-sub-title">
                        {contestInfo?.sub_title}
                      </p>
                    )}
                    {contestInfo?.end && (
                      <FlipTimer
                        classNames={"bat-timer"}
                        endTime={"2023-01-02T18:29:59.000Z"}
                        handleEndEvent={() => {
                          setTimeout(
                            () => setContestInfo({ title: "CONTEST ENDED" }),
                            100
                          );
                        }}
                      />
                    )}
                  </div>

                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["explore-btn"]}`}
                      onClick={() => router.push("/nft-marketplace/contest/")}
                    >
                      <span>Explore</span>
                    </button>
                  </div>
                </div>
                <div
                  className={`${style["pp-hero-contet-img"]} ${style["santa-contet-img"]}`}
                >
                  {width < 992 ? (
                    <Image
                      layout="responsive"
                      height="1280"
                      width="720"
                      src={
                        width < 768
                          ? images?.santa_banner_contest_landing_mobile_new
                          : images?.santa_banner_contest_landing_web_new
                      }
                      alt="circle_image"
                      priority={true}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <div className="item">
            <section
              className={`${style["hero-banner-sec"]} ${style["two-column"]}`}
            >
              <div className={`${style["hero-content-block"]}`}>
                <div className={style["hero-content-box"]}>
                  <Image
                    layout="responsive"
                    height="100"
                    width="100"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                    priority={true}
                  />
                  <h3>
                    BUY THE DIP WITH <br /> THE CRYPTO BAT NFTs!
                  </h3>
                  <h5 className={style["hero-desc_h5"]}>
                    Announcing tradeable and playable Crypto Bat NFTs backed by
                    real crypto assets, such as BTC, ETH, BNB, DOGE, &amp;
                    MATIC.
                  </h5>

                  <div className="banner-timer-section">
                    <h5 className="banner-timer-title">SOLD OUT IN 39 SECS</h5>
                    {eventInfo?.status !== LOOT_STATUS.SOLD_OUT &&
                      eventInfo?.endAt && (
                        <FlipTimer
                          classNames={"bat-timer"}
                          endTime={eventInfo?.endAt}
                          handleEndEvent={() => {
                            setTimeout(() => initEventInfo(true), 1000);
                          }}
                        />
                      )}
                  </div>
                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["explore-btn"]}`}
                      onClick={() => router.push("/drop/crypto-bat-nfts")}
                    >
                      <span>Explore</span>
                    </button>

                    {eventInfo?.status !== LOOT_STATUS.SOLD_OUT && (
                      <>
                        <button
                          className={`${style["theme-btn"]} ${style["rounded-bordered"]} `}
                          to="#"
                          onClick={() => {
                            user
                              ? window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/wallet#web`,
                                  "_self"
                                )
                              : window.open(
                                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
                                  "_self"
                                );
                          }}
                        >
                          <span>Fund Your Wallet</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className={style["hero-contet-img"]}>
                  <Image
                    layout="responsive"
                    height="1490"
                    width="1476"
                    src={HeroContentImg}
                    alt="circle_image"
                    priority={true}
                  />
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <div className="item">
            <section className={style["hero-banner-sec"]}>
              {width && (
                <>
                  {getOS() === "iOS" ? (
                    <Image
                      layout="responsive"
                      height="512"
                      width="1024"
                      className={`${style["image-fixed"]}`}
                      src={images.mclgame_poster}
                    />
                  ) : (
                    <video
                      id="full-screenVideo"
                      loop
                      muted
                      autoPlay
                      onLoadedData={() => setLoadingVideoSec(false)}
                      playsInline
                      controlsList="nodownload"
                      poster={images.mclgame_poster}
                      className={`${style["video-fixed"]}`}
                      src={
                        loadingVideoSec
                          ? images.mclgame_poster
                          : images.mcl_game
                      }
                      type="video/mp4"
                    ></video>
                  )}
                </>
              )}
              <div className={style["hero-content-block"]}>
                <div className={style["hero-content-box"]}>
                  <Image
                    layout="responsive"
                    height="1000"
                    width="1000"
                    src={HeroContentBg}
                    className={style["hero-contet-box-bg"]}
                    alt="circle_image"
                  />
                  <Image
                    className={style["hero-logo-image"]}
                    layout="responsive"
                    height={100}
                    width={100}
                    alt="MCL Icon"
                    src={images.mcl_logo}
                  />
                  <h3>
                    PLAY CRICKET,
                    <br />
                    EARN CASH REWARDS DAILY!
                  </h3>
                  <p className={style["hero-desc"]}>
                    Buy &amp; Sell MCL Player NFTs and MCL Signed Bat NFTs.
                    Build Teams to Play in Daily Tournaments and Climb
                    Leaderboards. Win Cash Rewards Every Day!
                  </p>
                  <div className={style["hero-btn-block"]}>
                    <button
                      className={`${style["theme-btn"]} ${style["mr-1"]}`}
                      onClick={scrollIntournaments}
                    >
                      <span>View Tournaments</span>
                    </button>
                    <a
                      className={`${style["theme-btn"]} ${style["rounded-bordered"]}`}
                      role="button"
                      onClick={() => router.push("/mcl-game")}
                    >
                      <span>Download MCL Game</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </section>
  );
};

export default HeroBanner;
