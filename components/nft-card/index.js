import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/future/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, OverlayTrigger } from "react-bootstrap";

import style from "./style.module.scss";
import images from "../../utils/images.json";
import NFTCounter from "../nft-counter";
import { batPower, currencyFormat, Nationality } from "../../utils/common";
import { add_to_cart_thunk } from "../../redux/thunk/user_cart_thunk";
import { level, getRoleInfo, getPlayerCategoryInfo } from "../../utils/common";
import { BsFillTrophyFill } from "react-icons/bs";

const NFTCard = ({
  nft,
  ownedCard = false,
  recentSold = false,
  liveAuction = false,
  favouriteNFTs = false,
  onsale = false,
  textColor,
  reloadNFTList,
  isExplore = false,
  relativeUrl = "",
  searchPrefix = "",
  exploreSlug = "",
  isFaltoo = false,
  clientUrl = "",
  faved = false,
}) => {
  const erc721 = nft?.nft_type === "erc721";
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state);

  //const history = useHistory();
  //const [bgColor, setBgColor] = useState();
  //const [auctionEndTime, setAuctionEndTime] = useState("");
  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [inCart, setInCart] = useState(false);

  const userSlug = user.data?.user ? user.data?.user?.slug : null;
  const userCart = cart?.data ? cart?.data : null;
  const [imageloaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (nft?.order_details?.timed_auction) {
      setIsAuctionStarted(
        new Date(nft?.time).getTime() >=
          new Date(nft?.order_details?.auction_start_time).getTime()
      );
      setIsAuctionEnded(
        new Date(nft?.time).getTime() >
          new Date(nft?.order_details?.auction_end_time).getTime()
      );
      setShowTimer(true);
    }

    if (onsale && nft?.timed_auction) {
      setIsAuctionStarted(
        new Date(nft?.time).getTime() >=
          new Date(nft?.auction_start_time).getTime()
      );
      setIsAuctionEnded(
        new Date(nft?.time).getTime() >
          new Date(nft?.auction_end_time).getTime()
      );
      setShowTimer(true);
    }

    if (favouriteNFTs && nft?.timed_auction) {
      setIsAuctionStarted(
        new Date(nft?.time).getTime() >=
          new Date(nft?.auction_start_time).getTime()
      );
      setIsAuctionEnded(
        new Date(nft?.time).getTime() >
          new Date(nft?.auction_end_time).getTime()
      );
      setShowTimer(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAuctionStartTimer = () => {
    setIsAuctionStarted(true);
    // setAuctionEndTime(nft?.order_details?.auction_end_time);
  };
  const handleAuctionEndTimer = () => {
    setIsAuctionEnded(true);
  };
  const handleNFTEndEvent = () => {
    if (liveAuction) {
      reloadNFTList();
    }
  };

  const levelData = level(nft?.core_statistics?.level?.value);

  const roleData = getRoleInfo(
    nft?.core_statistics?.role?.value,
    nft?.core_statistics?.dominant_hand?.value
      ? nft?.core_statistics?.dominant_hand?.value
      : ""
  );

  const playerCatData = getPlayerCategoryInfo(
    nft?.core_statistics?.category?.value
  );

  const NationalityData = Nationality(nft?.core_statistics?.nationality?.value);

  const batData = batPower(nft?.core_statistics?.twox_power?.value);

  // const handleAddToCart = () => {
  //   dispatch(add_to_cart_thunk(nft?.order_details?.slug, nft?.quantity));
  // };

  useEffect(() => {
    if (userSlug) {
      const orderSlug = userCart?.line_items?.find(
        (obj) => obj.order_slug === nft?.order_details?.slug
      );
      if (orderSlug) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCart]);

  const KycPopOver = () => (
    <Popover>
      <Popover.Body>
        <p className="password-terms">
          Please complete your user verification process to be eligible for
          purchasing NFTs.
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className={`${style["more-card"]} ${style["jt-card"]}`}>
      {nft?.core_statistics?.rank?.value && (
        <span className={style["nft-type-badge-rank"]}>
          <span className={style["rank-title"]}>
            <BsFillTrophyFill />
            {` ${nft?.core_statistics?.rank?.value}/${nft?.core_statistics?.rank?.maximum}`}
          </span>
        </span>
      )}

      <article className={style["player_stats"]}>
        {roleData && (
          <div className={style["player-type"]}>
            <Image
              width="300"
              height="300"
              loading="eager"
              layout="responsive"
              src={roleData?.value}
              alt="Player-type"
              priority={true}
              placeholder={"blur"}
              blurDataURL={images.sample}
            />
          </div>
        )}

        {batData && (
          <div className={style["bat-type-2x"]}>
            <Image
              width="300"
              height="300"
              loading="eager"
              layout="responsive"
              src={batData?.value}
              alt="Player-type"
              priority={true}
              placeholder={"blur"}
              blurDataURL={images.sample}
            />
          </div>
        )}

        {playerCatData && (
          <div
            className={style["player-range"]}
            style={{
              borderBottom:
                levelData ||
                NationalityData ||
                nft?.core_statistics?.year?.value
                  ? "0.1rem solid #894208bf"
                  : "none",
            }}
          >
            <span
              className={style["band"]}
              style={{
                background: playerCatData?.textColor
                  ? playerCatData?.textColor
                  : "",
              }}
            >
              {playerCatData?.value}
            </span>
          </div>
        )}

        {levelData && (
          <div className={style["player-level"]}>
            <h6>{levelData?.name}</h6>
            <Image
              width="300"
              height="300"
              layout="responsive"
              src={levelData?.value}
              alt="Player-level"
              priority={true}
              placeholder={"blur"}
              blurDataURL={images.sample}
            />
          </div>
        )}

        {NationalityData && (
          <div
            className={style["player-level"]}
            style={{
              borderBottom: nft?.core_statistics?.year?.value
                ? "0.1rem solid #894208bf"
                : "none",
            }}
          >
            <Image
              width="300"
              height="300"
              layout="responsive"
              src={NationalityData?.value}
              alt="Player-level"
              priority={true}
              placeholder={"blur"}
              blurDataURL={images.sample}
            />
          </div>
        )}

        {nft?.core_statistics?.year?.value && (
          <div className={`${style["player-range"]} ${style["yearshow"]}`}>
            <h6 className={style["band"]}> Year</h6>

            <span className={style["year"]}>
              {nft?.core_statistics?.year?.value}
            </span>
          </div>
        )}
      </article>

      <Link
        // href={(() => {
        //   if (onsale || favouriteNFTs || recentSold) {
        //     if (relativeUrl)
        //       return search
        //         ? `/${relativeUrl}/${
        //             searchPrefix ? searchPrefix + "/" + search : search
        //           }/order/details/${nft?.slug}/${nft?.order_slug}`
        //         : `/${relativeUrl}/order/details/${nft?.slug}/${nft?.order_slug}`;
        //     else
        //       return search
        //         ? `/${search}/order/details/${nft?.slug}/${nft?.order_slug}`
        //         : `/order/details/${nft?.slug}/${nft?.order_slug}`;
        //   } else if (nft?.is_on_sale) {
        //     if (relativeUrl)
        //       return search
        //         ? `/${relativeUrl}/${
        //             searchPrefix ? searchPrefix + "/" + search : search
        //           }/order/details/${nft?.slug}/${nft?.order_details?.slug}`
        //         : `/${relativeUrl}/order/details/${nft?.slug}/${nft?.order_details?.slug}`;
        //     else
        //       return search
        //         ? `/${search}/order/details/${nft?.slug}/${nft?.order_details?.slug}`
        //         : `/order/details/${nft?.slug}/${nft?.order_details?.slug}`;
        //   } else {
        //     if (relativeUrl)
        //       return search
        //         ? `/${relativeUrl}/${
        //             searchPrefix ? searchPrefix + "/" + search : search
        //           }/details/${nft?.slug}`
        //         : `/${relativeUrl}/details/${nft?.slug}`;
        //     else
        //       return search
        //         ? `/${search}/details/${nft?.slug}`
        //         : `/details/${nft?.slug}`;
        //   }
        // })()}

        // href={(() => {
        //   if (recentSold) {
        //     return search
        //       ? `/${search}/details/${nft?.slug}?recentsold=true`
        //       : `/details/${nft?.slug}?recentsold=true`;
        //   } else {
        //     return search
        //       ? `/${search}/details/${nft?.slug}}?recentsold=true`
        //       : `/details/${nft?.slug}?recentsold=true`;
        //   }
        // })()}

        href={(() => {
          if (recentSold) {
            return `/order/details/${nft?.slug}/${nft?.order_slug}`;
          } else {
            return `/nft-marketplace/details/${nft?.slug}`;
          }
        })()}
      >
        <a>
          <Image
            layout="responsive"
            width="300"
            height="300"
            priority={true}
            loading="eager"
            placeholder={"blur"}
            blurDataURL={images.sample}
            alt="media logo"
            src={(() => {
              if (nft?.asset_type?.includes("image")) {
                return nft.asset_url ? nft.asset_url : images.sample;
              } else if (nft?.cover_url) {
                return nft.cover_url ? nft.cover_url : images.sample;
              } else {
                return nft.asset_url ? nft.asset_url : images.sample;
              }
            })()}
            role="button"
            onLoad={() => setImageLoaded(true)}
          />
        </a>
      </Link>

      <div className={style["top-content-title"]}>
        {/* <div className="heart_box">
          <div className="svg_size filled_heart_icon"></div> */}

        {/* <div className="svg_size heart_icon"></div> */}
        {/* </div> */}

        <div
          style={{ color: textColor }}
          className={style["more-nft-info-header"]}
        >
          <div className={style["more-nft-title"]}>
            <div className={style["more-nft-title-box"]}>
              <div className={style["more-nft-ownername-info"]}>
                {nft?.owner_name && (
                  <div className={style["more-nft-desc"]}>
                    {nft?.owner_name}
                  </div>
                )}
                {recentSold && nft?.buyer?.user_name && (
                  <div className={style["more-nft-desc"]}>
                    {nft?.buyer?.user_name}
                  </div>
                )}
              </div>
              <span className={style["more-nft-name"]}>{nft?.name}</span>
            </div>

            {userSlug &&
              nft?.is_on_sale &&
              nft?.order_details?.is_buy &&
              nft?.owner_slug !== userSlug && (
                <>
                  {user?.data?.user?.kyc_status !== "success" ? (
                    <OverlayTrigger
                      trigger={["click"]}
                      rootClose={true}
                      placement="top"
                      overlay={KycPopOver()}
                    >
                      <div className={style["cart_box"]}>
                        <div
                          className={`${style["svg_size"]} ${style["cart_icon"]}`}
                        ></div>
                      </div>
                    </OverlayTrigger>
                  ) : (
                    <div
                      className={`${style["cart_box"]} ${
                        inCart && style["add_cart"]
                      }`}
                      onClick={() => {
                        if (!inCart) {
                          dispatch(
                            add_to_cart_thunk(
                              nft?.order_details?.slug,
                              nft?.quantity
                            )
                          );
                        }
                      }}
                    >
                      <div
                        className={`${style["svg_size"]} ${style["cart_icon"]}`}
                      ></div>
                    </div>
                  )}
                </>
              )}

            {/* <span className={style["nft-type-badge"]}>
              {nft?.nft_type?.toUpperCase()}
            </span> */}
          </div>
          <h6 className={style["nft-signature"]}>
            {nft?.signed_by?.length > 0 ? (
              <>
                <span>Signed by </span> {nft?.signed_by[0]}{" "}
                {nft?.signed_by?.length > 1 && <>&amp; {nft?.signed_by[1]}</>}
              </>
            ) : (
              <br />
            )}
          </h6>
        </div>
        {nft?.is_on_sale && (
          <>
            {nft?.order_details?.is_bid &&
              nft?.order_details?.timed_auction && (
                <>
                  {showTimer && (
                    <>
                      {!isAuctionStarted && !isAuctionEnded && (
                        <div className={style["time-counter-box"]}>
                          <span
                            className={`${style["time-counter-card"]} ${style["startsin"]}`}
                          >
                            {/* <img src={startin} alt="startin" /> */}
                            <span className={style["time-title"]}>Starts</span>
                            <NFTCounter
                              time={nft?.order_details?.auction_start_time}
                              cTime={nft?.time}
                              timeClass="font-onerem"
                              intervalClass="font-psevenrem"
                              intervalGapClass="me-1"
                              handleEndEvent={handleAuctionStartTimer}
                            />
                          </span>
                        </div>
                      )}
                      {!isAuctionEnded && isAuctionStarted && (
                        <div className={style["time-counter-box"]}>
                          <span className={style["time-counter-card"]}>
                            {/* <img src={endsin} alt="endsin" /> */}

                            <span className={style["time-title"]}>Ends</span>
                            <NFTCounter
                              time={nft?.order_details?.auction_end_time}
                              cTime={nft?.time}
                              timeClass="font-onerem"
                              intervalClass="font-psevenrem"
                              intervalGapClass="me-1"
                              handleEndEvent={handleAuctionEndTimer}
                            />
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

            <div
              className={style["more-bid-details"]}
              style={{ color: textColor }}
            >
              <div className="text-start">
                <div className={`${style["mb-title"]} text-secondary`}>
                  {(() => {
                    if (erc721) {
                      return nft?.order_details?.is_bid
                        ? "Bid Price"
                        : "Buy Price";
                    } else {
                      return "Buy Price";
                    }
                  })()}
                </div>
                <div className={style["mb-value"]}>
                  {(() => {
                    if (erc721) {
                      return nft?.order_details?.is_bid
                        ? currencyFormat(
                            nft?.order_details?.top_bid
                              ? nft?.order_details?.top_bid
                              : nft?.order_details?.minimum_bid,
                            "USD"
                          )
                        : currencyFormat(nft?.order_details?.buy_amount, "USD");
                    } else {
                      return currencyFormat(
                        nft?.order_details?.buy_amount,
                        "USD"
                      );
                    }
                  })()}
                </div>
              </div>
              {erc721 &&
                nft?.order_details?.is_bid &&
                nft?.order_details?.is_buy && (
                  <div className="text-end">
                    <div className={`${style["mb-title"]} text-secondary`}>
                      Buy Price
                    </div>
                    <div className={style["mb-value"]}>
                      {currencyFormat(nft?.order_details?.buy_amount, "USD")}
                    </div>
                  </div>
                )}
            </div>
          </>
        )}
        {onsale && (
          <>
            {nft?.is_bid && nft?.timed_auction && (
              <>
                {showTimer && (
                  <>
                    {!isAuctionStarted && !isAuctionEnded && (
                      <div className={style["time-counter-box"]}>
                        <span
                          className={`${style["time-counter-card"]} ${style["startsin"]}`}
                        >
                          <span className={style["time-title"]}>Starts</span>
                          <NFTCounter
                            time={nft?.auction_start_time}
                            cTime={nft?.time}
                            timeClass="font-onerem"
                            intervalClass="font-psevenrem"
                            intervalGapClass="me-1"
                            handleEndEvent={handleAuctionStartTimer}
                            handleNFTEndEvent={handleNFTEndEvent}
                          />
                        </span>
                      </div>
                    )}
                    {!isAuctionEnded && isAuctionStarted && (
                      <div className={style["time-counter-box"]}>
                        <span className={style["time-counter-card"]}>
                          <span className={style["time-title"]}>Ends</span>
                          <NFTCounter
                            time={nft?.auction_end_time}
                            cTime={nft?.time}
                            timeClass="font-onerem"
                            intervalClass="font-psevenrem"
                            intervalGapClass="me-1"
                            handleEndEvent={handleAuctionEndTimer}
                            handleNFTEndEvent={handleNFTEndEvent}
                          />
                        </span>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            <div className={style["more-bid-details"]}>
              <div className="text-start">
                <div className={`${style["mb-title"]} text-secondary`}>
                  {(() => {
                    if (erc721) {
                      return nft?.is_bid ? "Bid Price" : "Buy Price";
                    } else {
                      return "Buy Price";
                    }
                  })()}
                </div>
                <div className={style["mb-value"]}>
                  {(() => {
                    if (erc721) {
                      return nft?.is_bid
                        ? currencyFormat(
                            nft?.top_bid ? nft?.top_bid : nft?.minimum_bid,
                            "USD"
                          )
                        : currencyFormat(nft?.buy_amount, "USD");
                    } else {
                      return currencyFormat(nft?.buy_amount, "USD");
                    }
                  })()}
                </div>
              </div>
              {erc721 && nft?.is_bid && nft?.is_buy && (
                <div className="text-end">
                  <div className={`${style["mb-title"]} text-secondary`}>
                    Buy Price
                  </div>
                  <div className={style["mb-value"]}>
                    {currencyFormat(nft?.buy_amount, "USD")}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {ownedCard && nft?.quantity && (
          <>
            <div className={style["more-bid-details"]}>
              <div className="text-start"></div>
              <div className="text-end">
                <div className={`${style["mb-title"]} text-secondary`}>
                  Owned
                </div>
                <div className={style["mb-value"]}>{nft?.quantity}</div>
              </div>
            </div>
          </>
        )}
        {recentSold && (
          <>
            <div className={style["more-bid-details"]}>
              <div className="text-start">
                <div className={`${style["mb-title"]} text-secondary`}>
                  Sold For
                </div>
                <div className={style["mb-value"]}>
                  {currencyFormat(nft?.amount, "USD")}
                </div>
              </div>
              <div className="text-end">
                <div className={`${style["mb-title"]} text-secondary`}>
                  Sold On
                </div>
                <div className={style["mb-value"]}>
                  {dayjs(nft?.created_at).format("MMM D, YYYY hh:mm A")}
                </div>
              </div>
            </div>
          </>
        )}

        {favouriteNFTs && (
          <>
            {nft?.is_bid && nft?.timed_auction && (
              <>
                {showTimer && (
                  <>
                    {!isAuctionStarted && !isAuctionEnded && (
                      <div className={style["time-counter-box"]}>
                        <span
                          className={`${style["time-counter-card"]} ${style["startsin"]}`}
                        >
                          <span className={style["time-title"]}>Starts</span>
                          <NFTCounter
                            time={nft?.auction_start_time}
                            cTime={nft?.time}
                            timeClass="font-onerem"
                            intervalClass="font-psevenrem"
                            intervalGapClass="me-1"
                            handleEndEvent={handleAuctionStartTimer}
                            handleNFTEndEvent={handleNFTEndEvent}
                          />
                        </span>
                      </div>
                    )}
                    {!isAuctionEnded && isAuctionStarted && (
                      <div className={style["time-counter-box"]}>
                        <span className={style["time-counter-card"]}>
                          {/* <img src={endsin} alt="endsin" /> */}
                          <span className={style["time-title"]}>Ends</span>
                          <NFTCounter
                            time={nft?.auction_end_time}
                            cTime={nft?.time}
                            timeClass="font-onerem"
                            intervalClass="font-psevenrem"
                            intervalGapClass="me-1"
                            handleEndEvent={handleAuctionEndTimer}
                            handleNFTEndEvent={handleNFTEndEvent}
                          />
                        </span>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            <div className={style["more-bid-details"]}>
              <div className="text-start">
                <div className={`${style["mb-title"]} text-secondary`}>
                  {(() => {
                    if (erc721) {
                      return nft?.is_bid ? "Bid Price" : "Buy Price";
                    } else {
                      return "Buy Price";
                    }
                  })()}
                </div>
                <div className={style["mb-value"]}>
                  {(() => {
                    if (erc721) {
                      return nft?.is_bid
                        ? currencyFormat(
                            nft?.top_bid ? nft?.top_bid : nft?.minimum_bid,
                            "USD"
                          )
                        : currencyFormat(nft?.buy_amount, "USD");
                    } else {
                      return currencyFormat(nft?.buy_amount, "USD");
                    }
                  })()}
                </div>
              </div>
              {erc721 && nft?.is_bid && nft?.is_buy && (
                <div className="text-end">
                  <div className={`${style["mb-title"]} text-secondary`}>
                    Buy Price
                  </div>
                  <div className={style["mb-value"]}>
                    {currencyFormat(nft?.buy_amount, "USD")}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {!onsale && !nft.is_on_sale && !recentSold && !ownedCard && !faved && (
          <>
            <div className={style["empty-space"]}>Not listed for sale</div>
          </>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
