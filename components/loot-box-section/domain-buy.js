import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { MdCheckCircle } from "react-icons/md";
import { BsFillQuestionCircleFill, BsTrash } from "react-icons/bs";

import {
  loot_bns_buy_thunk,
  user_load_by_token_thunk,
} from "../../redux/thunk/user_thunk";
import { getUser, isLoading } from "../../redux/reducers/user_reducer";
import { getCookies, removeCookiesByName } from "../../utils/cookies";
import {
  getBnsBuyApi,
  getBnsDropPriceBreakup,
  getDropPriceBreakup,
  getPrebookPriceBreakup,
} from "../../utils/methods";
import { currencyFormat, roundDown } from "../../utils/common";
import { fetchAllowedAssets } from "../../utils/base-methods";

import { PAYMENT_OPTS } from "../PaymentOptions/config";
import { LOOT_STATUS } from "./common";
import ToolTip from "../tooltip";
import PaymentList from "../PaymentOptions/PaymentList";
import PaymentOptions from "../PaymentOptions";

import style from "./style.module.scss";
import useDebounce from "../../utils/useDebounce";

import web3Decent from "../../images/bns/web3-decent.svg";
import {
  bnsAddToCartFailure,
  bnsRemoveFromCartSuccess,
} from "../../redux/reducers/bns_cart_reducer";
import { useRouter } from "next/router";

const BnsPrebook = ({
  show = false,
  toggleModal = () => {},
  modalState = {},
  onHide = () => {},
  onReload = () => {},
  quantityPerOrder = 1,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const loading = useSelector(isLoading);
  const effectInit = useRef(true);
  const router = useRouter();

  const { bns_cart_data } = useSelector((state) => state.bns_cart);
  const domainData = Object.values(bns_cart_data);

  const [domainValue, setDomainValue] = useState();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isJTEnabled, enableJT] = useState(false);
  const [isRewardsEnabled, enableRewards] = useState(false);
  const [nftPriceBreakUp, setNftPriceBreakUp] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [allowedAssets, setAllowedAssets] = useState({});
  const [priceLoading, setPriceLoading] = useState(false);
  const [isPurchaseInitiated, setIsPurchaseInitiated] = useState(false);
  useDebounce(() => fetchPaymentSplits(), 500, domainValue);
  const [cartItems, setCartItems] = useState([]);

  const user_balance = user?.balance;
  const jump_point_balance = user?.assert_balances?.jump_point || 0;
  const reward_point_balance = user?.assert_balances?.reward_point || 0;
  const insufficient_balance = nftPriceBreakUp?.usd?.value > user_balance;
  const amount_to_be_added = insufficient_balance
    ? parseFloat(
        roundDown(nftPriceBreakUp?.usd?.value) - roundDown(user_balance)
      )
    : 0;

  const { loot = {} } = modalState;

  const nft_price = bns_cart_data.reduce(
    (total, currentValue) => (total = total + currentValue.domain_price),
    0
  );
  const used_reward_points = nftPriceBreakUp?.reward_point?.value || 0;
  const used_reward_points_in_usd =
    nftPriceBreakUp?.reward_point?.value_in_usd || 0;
  const used_jt_points = nftPriceBreakUp?.jump_point?.value || 0;
  const used_jt_points_in_usd = nftPriceBreakUp?.jump_point?.value_in_usd || 0;

  const isMinJTAvailable = useMemo(
    () => parseFloat(jump_point_balance / 10000) >= 0.01,
    [jump_point_balance]
  );

  const isMinRewardAvailable = useMemo(
    () => parseFloat(reward_point_balance) >= 0.01,
    [reward_point_balance]
  );

  console.log(bns_cart_data, "bns_cart_data lot");

  const handlePurchase = () => {
    let payment_include = [];
    isRewardsEnabled && payment_include.push("reward_point");
    isJTEnabled && payment_include.push("jump_point");
    setIsPurchaseInitiated(true);

    dispatch(
      loot_bns_buy_thunk({
        data: {
          request: { payment_include, domains: domainData },
        },
        callback: dispatchCallback,
      })
    );
  };

  const dispatchCallback = (response) => {
    if (response?.data?.status !== 200) {
      toast.error(
        response?.data?.message ||
          "Something went wrong. Please try again later."
      );
      // toggleModal();
    }
    setIsPurchased(response?.status === 200);
    dispatch(bnsAddToCartFailure());
  };

  const refreshBalance = () => {
    if (loading) return;
    let token = getCookies("token");
    dispatch(user_load_by_token_thunk(token));
  };

  const getAllowedAssets = async () => {
    const response = await fetchAllowedAssets();
    let allowed_assets = response?.data?.data || [];
    setAllowedAssets(allowed_assets);
  };

  const convertPointsToUSD = (points, point_type = "jump_point") => {
    if (allowedAssets && allowedAssets[point_type]) {
      let usd_per_qty = parseFloat(allowedAssets[point_type]?.usd_per_qty);
      let usd_value = parseFloat(points) * usd_per_qty;
      return roundDown(parseFloat(usd_value), 2);
    } else return 0;
  };

  const handleAssetSelect = (e) => {
    let current_value = e.target.checked;
    let current_asset = e.target.name || "";

    let reward_point_balance_in_usd = convertPointsToUSD(
      reward_point_balance,
      "reward_point"
    );

    let has_surplus_reward_points =
      reward_point_balance_in_usd >= nftPriceBreakUp?.total;

    if (current_asset === "reward_point") {
      enableRewards(current_value);
      if (current_value && has_surplus_reward_points) enableJT(false);
    }
    if (current_asset === "jump_point") {
      enableJT(current_value);
      if (current_value && has_surplus_reward_points) enableRewards(false);
    }
  };

  const fetchPaymentSplits = async () => {
    let payment_include = [];
    if (isRewardsEnabled) payment_include.push("reward_point");
    if (isJTEnabled) payment_include.push("jump_point");
    try {
      const result = {};
      setPriceLoading(true);

      result = await getBnsDropPriceBreakup({
        request: { payment_include, domains: domainData },
      });
      if (Array.isArray(result?.data?.data?.splitup)) {
        let { splitup = [], total } = result?.data?.data;
        let payment_split = splitup.reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          { total }
        );
        {
          console.log(payment_split, "payment_split");
        }
        setNftPriceBreakUp(payment_split);
      } else setNftPriceBreakUp(result?.data?.data);
    } catch (error) {
      console.log("Error in fetch payment split", error);
    } finally {
      setPriceLoading(false);
    }
  };

  const openPaymentGateway = (paymentGateway) => {
    setPaymentMethod(paymentGateway);
  };

  const handlePaymentSuccess = () => {
    console.log("Payment Success");
    refreshBalance();
    openPaymentGateway(null);
  };

  const handlePaymentFailure = () => {
    console.log("Payment Failure");
    setPaymentMethod(null);
  };

  useEffect(() => {
    if (!isPurchaseInitiated) fetchPaymentSplits();
  }, [isRewardsEnabled, isJTEnabled, user_balance]);

  useEffect(() => {
    if (effectInit.current) {
      getAllowedAssets();
      effectInit.current = false;
    }
  }, []);

  const handleAddToCartRemoved = (item) => {
    let newBnsObj = [
      ...cartItems,
      {
        domain_id: item?.domain_id,
      },
    ];

    const bns_data = new Set(bns_cart_data.map((item) => item.domain_id));
    let new_bns_data = bns_cart_data;

    if (bns_data.has(item.domain_id)) {
      new_bns_data = new_bns_data.filter(
        (items) => items.domain_id !== item.domain_id
      );
      toast.success("Domain Removed to Add to Cart Successfully");
    }

    setCartItems(newBnsObj);
    dispatch(bnsRemoveFromCartSuccess(new_bns_data));
  };

  return (
    <Modal
      show={show}
      animation={false}
      contentClassName={`${style["prebook-modal"]} prebook-modal`}
      centered
    >
      <Modal.Header
        className={`${
          !isPurchased ? style["prebook-modal-header"] : style["purchased"]
        }`}
        onHide={() => {
          isPurchased && onHide();
          onReload();
          toggleModal();
        }}
        closeButton
        closeVariant={!isPurchased ? "white" : "dark"}
      >
        {isPurchased ? (
          <span className="fs-4">Successed</span>
        ) : (
          <span className="fs-4">BUY BNS</span>
        )}
      </Modal.Header>
      <Modal.Body className={style["prebook-modal-body"]}>
        {isPurchased ? (
          <div className={style["purchase-success"]}>
            <MdCheckCircle
              fill="green"
              style={{ width: "4rem", height: "4rem", fill: "#00A506" }}
            />
            <p className="text-dark fs-3">Processed Successfully</p>
            <button
              className={`${style["theme-btn"]} mb-3 mt-4 w-100`}
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/mynft`,
                  "_self"
                );
                onReload();
                toggleModal();
              }}
            >
              View My NFTs
            </button>
          </div>
        ) : (
          <>
            <div className="d-flex flex-column text-dark preorder-popup-top">
              <div
                className={`${style["input-block-row"]} ${style["valign-top"]}`}
              >
                <div className={style["input-block"]}>
                  <h6 className="m-0">Current GL Balance</h6>
                  <a
                    onClick={refreshBalance}
                    className={`${style["link"]} ${style["link-blue"]} ${
                      loading ? style["link-disabled"] : ""
                    }`.trim()}
                  >
                    {!loading ? "Refresh Bal." : "Refreshing..."}
                  </a>
                </div>
                <p className="m-0 fw-bold">
                  {currencyFormat(roundDown(user_balance) || 0)}
                </p>
              </div>
              {allowedAssets?.reward_point && (
                <div className={style["input-block-row"]}>
                  <div className={`${style["input-block-row"]} mb-0`}>
                    <input
                      id="reward_point_checkbox"
                      type="checkbox"
                      name="reward_point"
                      disabled={!isMinRewardAvailable}
                      checked={isRewardsEnabled}
                      onChange={handleAssetSelect}
                    ></input>{" "}
                    &nbsp;
                    <label
                      className={`${style["asset-label"]} m-0`}
                      htmlFor="reward_point_checkbox"
                    >
                      {allowedAssets?.reward_point?.display_name}
                    </label>
                  </div>
                  <p>
                    ${convertPointsToUSD(reward_point_balance, "reward_point")}
                  </p>
                </div>
              )}
              {allowedAssets?.jump_point && (
                <div className={style["input-block-row"]}>
                  <div className={`${style["input-block-row"]} mb-0`}>
                    <input
                      id="jump_point_checkbox"
                      type="checkbox"
                      name="jump_point"
                      disabled={!isMinJTAvailable}
                      checked={isJTEnabled}
                      onChange={handleAssetSelect}
                    ></input>{" "}
                    &nbsp;
                    <label
                      className={`${style["asset-label"]} m-0`}
                      htmlFor="jump_point_checkbox"
                    >
                      {allowedAssets?.jump_point?.display_name} (
                      {`${jump_point_balance} JT`})
                    </label>
                  </div>
                  <p>${convertPointsToUSD(jump_point_balance)}</p>
                </div>
              )}
              <hr />
              <div className={style["input-block-row"]}>
                <h6>Quantity</h6>
              </div>
              <div className={style["input-block-row"]}>
                <div className={style["domain-card-buylisy-box"]}>
                  {bns_cart_data?.map((list, i) => (
                    <>
                      <article
                        className={`${style["domain-card-buylisy-box"]} `}
                        key={`list-${i}`}
                      >
                        <div className={`${style["left-box"]} ${i + 1}i`}>
                          <Image
                            src={web3Decent.src}
                            className={`${style["domain-img"]}`}
                            height={50}
                            width={50}
                          />
                          <h4 className={`${style["domain-name"]}`}>
                            <span className={`${style["name"]}`}>
                              {list?.name}.{list?.domain_tld}
                            </span>
                          </h4>
                        </div>
                        <div className={`${style["right-box"]}`}>
                          <h5 className={`${style["price"]}`}>
                            {currencyFormat(list?.domain_price, "USD")}
                            <span className={`${style["expire-year"]}`}></span>
                          </h5>
                        </div>
                        <div
                          className={`${style["icon-box"]}`}
                          onClick={() => {
                            handleAddToCartRemoved({
                              domain_id: list?.domain_id,
                            });
                          }}
                        >
                          <BsTrash className={`${style["delete-icon"]}`} />
                        </div>
                      </article>

                      {/* <div
                      className={`${style["left-box"]} ${i + 1}i`}
                      key={`list-${i}`}
                    >
                      <Image
                        src={web3Decent.src}
                        className={`${style["domain-img"]}`}
                        height={50}
                        width={50}
                      />
                      <h4 className={`${style["domain-name"]}`}>
                        <span className={`${style["name"]}`}>
                          {list?.domain}.{list?.domain_tld}
                        </span>
                      </h4>
                    </div>
                    <div className={`${style["right-box"]}`}>
                      <h5 className={`${style["price"]}`}>
                        {currencyFormat(list?.domain_price, "USD")}
                        <span className={`${style["expire-year"]}`}></span>
                      </h5>
                    </div> */}
                    </>
                  ))}
                </div>
              </div>
              <div className={style["input-block-row"]}>
                <h6> Domain Price</h6>
                <p>{`$${nft_price || 0}`}</p>
              </div>
              {isRewardsEnabled && (
                <>
                  <hr />
                  <div className={`${style["input-block-row"]} `.trim()}>
                    <h6>
                      {`Used ${allowedAssets?.reward_point?.display_name} (${used_reward_points})`}{" "}
                    </h6>
                    <p>{`- $${used_reward_points_in_usd}`}</p>
                  </div>
                </>
              )}
              {isJTEnabled && (
                <>
                  <div className={`${style["input-block-row"]} `.trim()}>
                    <h6>
                      {`Used ${allowedAssets?.jump_point?.display_name} (${used_jt_points})`}{" "}
                    </h6>
                    <p
                      className={`${priceLoading && style["blur-loader"]}`}
                    >{`- $${used_jt_points_in_usd}`}</p>
                  </div>
                </>
              )}
              {!insufficient_balance && (
                <>
                  <hr />
                  <div className={`${style["input-block-row"]} `.trim()}>
                    <h6 className="m-0 fw-bold">Total Amount</h6>
                    <p
                      className={`m-0 fw-bold ${
                        priceLoading ? "blur-loader" : ""
                      }`}
                    >{`$${nftPriceBreakUp?.usd?.value || 0}`}</p>
                  </div>
                </>
              )}
              {insufficient_balance ? (
                <>
                  <div
                    className={`${style["input-block-row"]} ${style["dashed-top-border"]}`}
                  >
                    <h6 className="m-0 fw-bold">
                      {/* {`${
                        modalState?.loot_status === LOOT_STATUS.DROP
                          ? "Buy"
                          : "Pre-book"
                      } your NFT by adding`} */}
                      Buy your NFT by adding
                      <br />
                      {amount_to_be_added < 1 ? (
                        <span className="text-danger">
                          (Add min. funds of $1)
                        </span>
                      ) : (
                        <></>
                      )}
                    </h6>
                    <p className="m-0 fw-bold">
                      {currencyFormat(
                        amount_to_be_added >= 1 ? amount_to_be_added : 1
                      )}
                    </p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="preorder-popup-bottom">
              {insufficient_balance ? (
                <div
                  className={`${style["input-block-row"]} d-flex flex-column w-100 `}
                >
                  {/* <PaymentMethod
                    defaultAmount={
                      parseFloat(amount_to_be_added) >= 1
                        ? amount_to_be_added
                        : 1
                    }
                  /> */}
                  <PaymentList
                    className="drop-payment-list"
                    userBalance={user_balance}
                    amount={
                      parseFloat(amount_to_be_added) <= 1.0
                        ? 1
                        : amount_to_be_added
                    }
                    defaultPaymentMethod={PAYMENT_OPTS.UPIOfflinePayment}
                    onHide={() => setPaymentMethod(null)}
                    openPaymentGateway={openPaymentGateway}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentFailure={handlePaymentFailure}
                  ></PaymentList>
                  <PaymentOptions
                    show={paymentMethod}
                    amount={
                      parseFloat(amount_to_be_added) <= 1.0
                        ? 1
                        : amount_to_be_added
                    }
                    onHide={() => setPaymentMethod(null)}
                    openPaymentGateway={openPaymentGateway}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentFailure={handlePaymentFailure}
                  />
                </div>
              ) : (
                <div
                  className={`${style["input-block-row"]} text-center  d-flex flex-column`}
                >
                  <button
                    onClick={handlePurchase}
                    className={style["theme-btn"]}
                    disabled={bns_cart_data?.length < 1}
                  >
                    {bns_cart_data?.length < 1 ? "Choose Domain" : "BUY"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BnsPrebook;
