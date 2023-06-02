import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";

import NFTCard from "../nft-card";
import RecentSoldLoader from "../loaders/recentSoldCardLoader";
import {
  liveAuctionNFTsApi,
  nftRecentlySoldApi,
  nftShowAllApi,
} from "../../utils/methods";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

import images from "../../utils/images.json";

import style from "./style.module.scss";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import Image from "next/future/image";
import { toast } from "react-toastify";
import { Dropdown } from "react-bootstrap";
import useWindowUtils from "../../hooks/useWindowUtils";
import { FaCheckCircle } from "react-icons/fa";
import { BiCaretDown } from "react-icons/bi";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import RaddxNFTCard from "../raddx/nft-card";
import BnsNFTCard from "../bns/nft-card";

const DiscoverNFTs = ({ categories }) => {
  const router = useRouter();
  const window = useWindowUtils();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = router.query;
  const [category, setCategory] = useState("Batsman");
  const [disable, setDisable] = useState("");
  const [handle, setHandle] = useState(false);
  const { width: innerWidth } = window;
  const [slideChange, setSlideChange] = useState(false);
  const [mainCategory, setMainCategory] = useState("mcl");
  const [filter, setFilter] = useState([
    {
      name: "Batsman",
      checked: true,
    },
    {
      name: "Bowler",
      checked: false,
    },
    {
      name: "Bat",
      checked: false,
    },
    {
      name: "Shot",
      checked: false,
    },
    {
      name: "Fusor",
      checked: false,
    },
  ]);

  const [raddxFilter, setRaddxFilter] = useState([
    {
      name: "Car",
      checked: true,
    },
    {
      name: "Land",
      checked: false,
    },
    {
      name: "Building",
      checked: false,
    },
  ]);

  const [bnsFilter, setbnsFilter] = useState([
    {
      name: "Domain",
      checked: true,
    },
    {
      name: "Domain",
      checked: false,
    },
    {
      name: "Domain",
      checked: false,
    },
  ]);

  const swiperRef = useRef();

  const handleNavigation = (direction = "") => {
    setHandle(!handle);
    if (!direction || !swiperRef.current) return;
    if (direction === "next") swiperRef.current.swiper.slideNext();
    else swiperRef.current.swiper.slidePrev();
  };

  useEffect(() => {
    showAllFilteredNFTs(1, "recently_listed", "Batsman");
    // liveAuctionNFTList(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (swiperRef?.current?.swiper?.isBeginning) setDisable("left");
    if (swiperRef?.current?.swiper?.isEnd) setDisable("right");
    else setDisable("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, handle, slideChange]);

  const handleClick = (e) => {
    if (e.target.innerText === "Live Auction") liveAuctionNFTList(true);
    else if (e.target.innerText === "Sold") topTradesList();
    else showAllFilteredNFTs(1, "recently_listed", e.target.innerText);
    // setCategory(e.target.innerText);
  };

  const liveAuctionNFTList = async (action = false) => {
    try {
      setLoading(true);
      let response = await liveAuctionNFTsApi();
      if (response?.data?.data?.nfts.length === 0 && !action) {
        setCategory("Batsman");
        showAllFilteredNFTs(1, "recently_listed", "Batsman");
        setFilter(
          filter.map((item) => {
            return { ...item, checked: item.name === "Batsman" ? true : false };
          })
        );
      } else {
        setCategory("Live Auction");
        setList(response?.data?.data?.nfts);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "The request could not be processed at this time. Please try again."
      );
    }
  };
  const topTradesList = async () => {
    try {
      setLoading(true);
      let response = await nftRecentlySoldApi();
      setList(response?.data?.data?.nfts);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(
        "The request could not be processed at this time. Please try again."
      );
    }
  };

  const showAllFilteredNFTs = async (
    page = 1,
    sort = "recently_listed",
    filterType,
    type = "mcl"
  ) => {
    try {
      let filter = {
        nft_category: [filterType],
        game_names: [type],
      };

      page === 1 && setLoading(true);
      let response = await nftShowAllApi({
        page,
        per_page: 21,
        filter,
        sort: sort === "relevance" ? null : sort,
      });
      setList(response.data.data.nfts);
      page === 1 && setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const ShowAllSort = forwardRef(({ onClick }, ref) => (
    <div
      className={`${style["dropdown-name"]}`}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {/* {mainCategory === "mcl"
        ? filter.find((obj) => obj.checked === true)?.name &&
          `${filter.find((obj) => obj.checked === true).name}`
        : raddxFilter.find((obj) => obj.checked === true)?.name &&
          `${raddxFilter.find((obj) => obj.checked === true).name}`} */}

      {(() => {
        if (mainCategory === "mcl") {
          return (
            filter.find((obj) => obj.checked === true)?.name &&
            `${filter.find((obj) => obj.checked === true).name}`
          );
        } else if (mainCategory === "raddx") {
          return (
            raddxFilter.find((obj) => obj.checked === true)?.name &&
            `${raddxFilter.find((obj) => obj.checked === true).name}`
          );
        } else if (mainCategory === "bns") {
          return (
            bnsFilter.find((obj) => obj.checked === true)?.name &&
            `${bnsFilter.find((obj) => obj.checked === true).name}`
          );
        } else {
          return <></>;
        }
      })()}

      <BiCaretDown />
    </div>
  ));

  ShowAllSort.displayName = "ShowAllSort";

  const handleFilterCheck = (obj = "Batsman") => {
    setFilter(
      filter.map((item) => {
        return { ...item, checked: item.name === obj ? true : false };
      })
    );
    if (obj === "Live Auction") liveAuctionNFTList(true);
    else if (obj === "Sold") topTradesList();
    else showAllFilteredNFTs(1, "recently_listed", obj);
  };

  const handleRaddxFilter = (obj) => {
    setRaddxFilter(
      raddxFilter.map((item) => {
        return { ...item, checked: item.name === obj ? true : false };
      })
    );
    showAllFilteredNFTs(1, "recently_listed", obj, "raddx");
  };

  const handleBnsFilter = (obj) => {
    setbnsFilter(
      bnsFilter.map((item) => {
        return { ...item, checked: item.name === obj ? true : false };
      })
    );
    showAllFilteredNFTs(1, "recently_listed", obj, "bns");
  };

  return (
    <>
      <section
        className={`${style["jt-discover-nfts-section"]} jt-discover-nfts-section`}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={style["content-center"]}>
                <h4>Discover ✦</h4>
                <h1>
                  THE BEST NFT MARKETPLACE <br />
                  FOR GAMING NFTs!
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["discover-top-btn-block"]}`}>
                <div className={`${style["filter-btn-block"]}`}>
                  <button
                    className={`${style["top-btn"]} ${style["mcl"]}  ${
                      style[mainCategory === "mcl" ? "active" : ""]
                    }`}
                    onClick={() => {
                      setMainCategory("mcl");
                      handleFilterCheck("Batsman");
                    }}
                  >
                    <span>MCL</span>
                  </button>
                  <button
                    onClick={() => {
                      setMainCategory("raddx");
                      handleRaddxFilter("Car");
                    }}
                    className={`${style["top-btn"]} ${style["raddx"]} ${
                      style[mainCategory === "raddx" ? "active" : ""]
                    }`}
                  >
                    <span>RADDX</span>

                    <button
                      onClick={() => {
                        setMainCategory("bns");
                        handleBnsFilter("Domain");
                      }}
                      className={`${style["top-btn"]} ${style["bns"]} ${
                        style[mainCategory === "bns" ? "active" : ""]
                      }`}
                    >
                      <span>BNS</span>
                    </button>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              {innerWidth > 767 ? (
                <>
                  {/* {mainCategory === "mcl" ? (
                    <div
                      className={`${style["discover-btn-block"]} ${style["mcl"]}`}
                    >
                      <div className={`${style["filter-btn-block"]}`}>
                        {filter?.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleFilterCheck(item.name)}
                            className={`${style["theme-btn"]} ${
                              style["rounded-bordered"]
                              // } ${style[category === "Batsman" ? "active" : ""]}`}
                            } ${style[item.checked ? "active" : ""]}`}
                          >
                            <span>{item.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${style["discover-btn-block"]} ${style["raddx"]}`}
                    >
                      <div className={`${style["filter-btn-block"]}`}>
                        {raddxFilter?.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleRaddxFilter(item?.name)}
                            className={`${style["theme-btn"]} ${
                              style["rounded-bordered"]
                            } ${style[item?.checked ? "active" : ""]}`}
                          >
                            <span>{item?.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )} */}

                  {(() => {
                    if (mainCategory === "mcl") {
                      return (
                        <>
                          {" "}
                          <div
                            className={`${style["discover-btn-block"]} ${style["mcl"]}`}
                          >
                            <div className={`${style["filter-btn-block"]}`}>
                              {filter?.map((item, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleFilterCheck(item.name)}
                                  className={`${style["theme-btn"]} ${
                                    style["rounded-bordered"]
                                    // } ${style[category === "Batsman" ? "active" : ""]}`}
                                  } ${style[item.checked ? "active" : ""]}`}
                                >
                                  <span>{item.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      );
                    } else if (mainCategory === "raddx") {
                      return (
                        <div
                          className={`${style["discover-btn-block"]} ${style["raddx"]}`}
                        >
                          <div className={`${style["filter-btn-block"]}`}>
                            {raddxFilter?.map((item, index) => (
                              <button
                                key={index}
                                onClick={() => handleRaddxFilter(item?.name)}
                                className={`${style["theme-btn"]} ${
                                  style["rounded-bordered"]
                                } ${style[item?.checked ? "active" : ""]}`}
                              >
                                <span>{item?.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <>
                          {" "}
                          <div
                            className={`${style["discover-btn-block"]} ${style["raddx"]}`}
                          >
                            <div className={`${style["filter-btn-block"]}`}>
                              {bnsFilter?.map((item, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleBnsFilter(item?.name)}
                                  className={`${style["theme-btn"]} ${
                                    style["rounded-bordered"]
                                  } ${style[item?.checked ? "active" : ""]}`}
                                >
                                  <span>{item?.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      );
                    }
                  })()}
                </>
              ) : (
                <Dropdown
                  className={`${style["dropdown-list"]} ${style[mainCategory]}  dropdown-list`}
                >
                  <Dropdown.Toggle
                    align="start"
                    drop="start"
                    as={ShowAllSort}
                  ></Dropdown.Toggle>

                  <Dropdown.Menu
                    align="start"
                    className={style["dropdown-menu"]}
                  >
                    {/* {mainCategory === "mcl"
                      ? filter.map((obj, i) => (
                          <Dropdown.Item
                            key={`nft${i}`}
                            as="button"
                            onClick={() => {
                              handleFilterCheck(obj?.name);
                              setCategory(obj?.name);
                            }}
                          >
                            {obj.name}
                          </Dropdown.Item>
                        ))
                      : raddxFilter.map((obj, i) => (
                          <Dropdown.Item
                            key={`nft${i}`}
                            as="button"
                            onClick={() => {
                              handleRaddxFilter(obj?.name);
                            }}
                          >
                            {obj.name}
                          </Dropdown.Item>
                        ))} */}

                    {mainCategory === "mcl" ? (
                      filter.map((obj, i) => (
                        <Dropdown.Item
                          key={`nft${i}`}
                          as="button"
                          onClick={() => {
                            handleFilterCheck(obj?.name);
                            setCategory(obj?.name);
                          }}
                        >
                          {obj.name}
                        </Dropdown.Item>
                      ))
                    ) : mainCategory === "raddx" ? (
                      raddxFilter.map((obj, i) => (
                        <Dropdown.Item
                          key={`nft${i}`}
                          as="button"
                          onClick={() => {
                            handleRaddxFilter(obj?.name);
                          }}
                        >
                          {obj.name}
                        </Dropdown.Item>
                      ))
                    ) : mainCategory === "bns" ? (
                      bnsFilter.map((obj, i) => (
                        <Dropdown.Item
                          key={`nft${i}`}
                          as="button"
                          onClick={() => {
                            handleBnsFilter(obj?.name);
                          }}
                        >
                          {obj.name}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <></>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>

          <div className="row">
            {!loading ? (
              <div className="col-sm-12">
                {list?.length > 0 ? (
                  <div className={`${style["swiper-block"]}`}>
                    {list?.length > 0 && (
                      <div className={`${style["navigation-btn-block"]}`}>
                        <button
                          className={`${style["swiper-prev"]}`}
                          onClick={() => handleNavigation("prev")}
                          disabled={
                            swiperRef?.current?.swiper?.isBeginning ||
                            typeof swiperRef?.current?.swiper?.isBeginning ===
                              "undefined"
                          }
                        >
                          <MdArrowBackIosNew />
                        </button>
                        <button
                          className={`${style["swiper-next"]}`}
                          onClick={() => handleNavigation("next")}
                          disabled={swiperRef?.current?.swiper?.isEnd}
                        >
                          <MdArrowForwardIos />
                        </button>
                      </div>
                    )}

                    <Swiper
                      ref={swiperRef}
                      spaceBetween={20}
                      // modules={[Navigation]}
                      cssMode={true}
                      mousewheel={true}
                      keyboard={true}
                      modules={[Pagination, Navigation, Mousewheel, Keyboard]}
                      pagination={{ dynamicBullets: true }}
                      onSlideChange={() => setSlideChange(!slideChange)}
                      initialSlide={0}
                      breakpoints={{
                        320: {
                          slidesPerView: 1,
                        },
                        640: {
                          slidesPerView: 2,
                        },
                        991: {
                          slidesPerView: 3,
                        },
                        1200: {
                          slidesPerView: 4,
                        },
                      }}
                    >
                      {list?.map((nft, i) => (
                        <SwiperSlide key={nft?.slug}>
                          {/* {mainCategory === "mcl" ? (
                            <NFTCard
                              nft={nft}
                              key={nft.slug}
                              image={images.sample}
                              relativeUrl={`nft-marketplace`}
                              recentSold={false}
                              favouriteNFT={false}
                            />
                          ) : (
                            <RaddxNFTCard
                              nft={nft}
                              key={i}
                              image={images.sample}
                            />
                          )} */}

                          {(() => {
                            if (mainCategory === "mcl") {
                              return (
                                <NFTCard
                                  nft={nft}
                                  key={nft.slug}
                                  image={images.sample}
                                  relativeUrl={`nft-marketplace`}
                                  recentSold={false}
                                  favouriteNFT={false}
                                />
                              );
                            } else if (mainCategory === "raddx") {
                              return (
                                <RaddxNFTCard
                                  nft={nft}
                                  key={i}
                                  image={images.sample}
                                />
                              );
                            } else if (mainCategory === "bns") {
                              return (
                                <BnsNFTCard
                                  nft={nft}
                                  key={i}
                                  image={images.sample}
                                />
                              );
                            } else {
                              return <></>;
                            }
                          })()}
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                ) : (
                  <div className="col-12 text-center">
                    <h3 className="my-3 py-5">
                      {category === "Live Auction"
                        ? `You'll Soon See A Live Auction NFTs!`
                        : `No Records Found!`}
                    </h3>
                  </div>
                )}
              </div>
            ) : (
              <RecentSoldLoader />
            )}
          </div>
          {/* {list.length > 4 && (
            <div className="row">
              <div className="col-sm-12 text-center">
                <button
                  className={`${style["theme-btn"]} ${style["rounded-bordered"]} ${style["view-all-btn"]} `}
                >
                  <span
                    onClick={(() => {
                      if (category === "Live Auction")
                        return () =>
                          router.push("/nft-marketplace/live-auction");
                      else if (category === "Sold")
                        return () =>
                          router.push("/nft-marketplace/sale-history");
                      else return () => router.push("/nft-marketplace");
                    })()}
                  >
                    {category === "Live Auction" || category === "Sold"
                      ? "View All"
                      : "Explore Market"}
                  </span>
                </button>
              </div>
            </div>
          )} */}
        </div>
      </section>
    </>
  );
};

export default DiscoverNFTs;
