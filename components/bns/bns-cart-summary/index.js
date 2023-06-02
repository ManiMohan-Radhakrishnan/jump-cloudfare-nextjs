import { HiCheckCircle, HiOutlineSearch } from "react-icons/hi";
import style from "./style.module.scss";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { BsFillCartPlusFill, BsPlusCircleFill } from "react-icons/bs";

import { useState } from "react";
import useWindowUtils from "../../../hooks/useWindowUtils";
import { BiCheck } from "react-icons/bi";

import Header from "../../../components/header";
import DomainAddToCardList from "../domain-add-to-card-list";
import { useSelector } from "react-redux";
import { currencyFormat } from "../../../utils/common";
import LoginWithOtp from "../../loot-box-section/login-with-otp";
import LoginWithGoogleOtp from "../../loot-box-section/google-otp";
import VerifyOtp from "../../loot-box-section/verify-otp";
import ForgotPassword from "../../loot-box-section/forgot-password";
import Register from "../../loot-box-section/register";
import PrebookBnsWithBuyOptions from "../../loot-box-section/domain-buy";
import LoginWithPassword from "../../loot-box-section/login-with-password";
import { MODAL_TYPES } from "../common";
import { isUserLoggedIn } from "../../../redux/reducers/user_reducer";

const CartSummary = ({ buySuccess = () => {}, details }) => {
  console.log(details, "details");
  const [cartSidebarBtn, setCartSidebarBtn] = useState(false);
  const window = useWindowUtils();
  const { width: innerWidth } = window;
  const { bns_cart_data } = useSelector((state) => state.bns_cart);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const loginStatus = useSelector(isUserLoggedIn);
  const [domainValue, setDomainValue] = useState(1);

  const addToCarttotal = bns_cart_data.reduce(
    (total, currentValue) => (total = total + currentValue.domain_price),
    0
  );
  const ENABLE_REWARD_BUY = true;

  //  const arrayDataItems = courses.map((course) => <li>{course}</li>);

  const [eventInfo, setEventInfo] = useState({});

  // const initEventInfo = (showToast = false) => {
  //   const now = new Date().getTime();
  //   let event_info = { ...eventInfo };
  //   if (parseInt(details?.available_qty) === 0) {
  //     dispatch(setFusorsDropLive(LOOT_STATUS?.SOLD_OUT));
  //     event_info = {
  //       title: "SOLD OUT",
  //       status: LOOT_STATUS?.SOLD_OUT,
  //       buttonTitle: "DROP SOLD OUT",
  //       buttonDisabled: true,
  //     };
  //   } else if (now < new Date(details?.preorder_start_time).getTime()) {
  //     dispatch(setFusorsDropLive(LOOT_STATUS?.YTS));
  //     event_info = {
  //       title: "PRE-BOOK STARTS IN",
  //       status: LOOT_STATUS?.YTS,
  //       endAt: dateFormat(details?.preorder_start_time),
  //       buttonTitle: "PRE-BOOK",
  //       buttonDisabled: true,
  //     };
  //   } else if (
  //     now >= new Date(details?.preorder_start_time).getTime() &&
  //     now <= new Date(details?.preorder_end_time).getTime()
  //   ) {
  //     dispatch(setFusorsDropLive(LOOT_STATUS?.PRE_BOOK));
  //     event_info = {
  //       title: "PRE-BOOK ENDS IN",
  //       status: LOOT_STATUS?.PRE_BOOK,
  //       endAt: dateFormat(details?.preorder_end_time),
  //       buttonTitle: "PRE-BOOK NOW",
  //       buttonDisabled: false,
  //     };
  //   } else if (
  //     details?.auction_start_time === null ||
  //     details?.auction_end_time === null
  //   ) {
  //     dispatch(setFusorsDropLive(LOOT_STATUS?.DROP_YTA));
  //     statusChangeMessage = "Pre-book ended";
  //     event_info = {
  //       title: "DROP COMING SOON",
  //       status: LOOT_STATUS?.DROP_YTA,
  //       buttonTitle: "BUY",
  //       buttonDisabled: true,
  //     };
  //   } else if (details?.flow_status === "assign") {
  //     dispatch(setFusorsDropLive(LOOT_STATUS?.ASSIGNING_NFTS));
  //     let endAt =
  //       now <= new Date(details?.auction_start_time).getTime()
  //         ? details?.auction_start_time
  //         : details?.auction_end_time;
  //     let title =
  //       now <= new Date(details?.auction_start_time).getTime()
  //         ? "DROP STARTS IN"
  //         : "DROP ENDS IN";
  //     event_info = {
  //       title,
  //       endAt,
  //       status: LOOT_STATUS?.ASSIGNING_NFTS,
  //       buttonTitle: "Assigning NFTs",
  //       buttonDisabled: true,
  //     };
  //   } else if (
  //     now > new Date(details?.preorder_end_time).getTime() &&
  //     now <= new Date(details?.auction_start_time).getTime()
  //   ) {
  //     dispatch(setFusorsDropLive(LOOT_STATUS?.DROP_YTS));
  //     event_info = {
  //       title: "DROP STARTS IN",
  //       status: LOOT_STATUS?.DROP_YTS,
  //       endAt: dateFormat(details?.auction_start_time),
  //       buttonTitle: "BUY",
  //       buttonDisabled: true,
  //     };
  //   } else if (
  //     now > new Date(details?.auction_start_time).getTime() &&
  //     now <= new Date(details?.auction_end_time).getTime() &&
  //     details?.flow_status === "buy"
  //   ) {
  //     dispatch(setFusorsDropLive(LOOT_STATUS?.DROP));
  //     event_info = {
  //       title: "DROP ENDS IN",
  //       status: LOOT_STATUS?.DROP,
  //       endAt: dateFormat(details?.auction_end_time),
  //       buttonTitle: "BUY NOW",
  //       buttonDisabled: !details?.available_qty,
  //     };
  //   } else if (now > new Date(details?.auction_end_time).getTime()) {
  //     dispatch(setFusorsDropLive(LOOT_STATUS?.SOLD_OUT));
  //     event_info = {
  //       title: "DROP ENDED",
  //       status: LOOT_STATUS?.DROP_ENDED,
  //       buttonDisabled: true,
  //     };
  //   }

  //   setEventInfo(event_info);
  // };

  const handleDomainDrop = (bns_cart_data) => {
    if (loginStatus) {
      setDomainValue(bns_cart_data);
      toggleModal(MODAL_TYPES.PREBOOK, {
        loot: { ...details },
      });
    } else toggleModal(MODAL_TYPES.LOGIN_WITH_OTP);
  };

  const toggleModal = (modalType = "", modalState = {}) => {
    setModalType(modalType);
    setModalState(modalState);
  };

  {
    console.log(domainValue, "domainValue");
  }

  return (
    <>
      {/* <Header /> */}
      <section className={style["bns-cart-summary-section"]}>
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col-12"}>
              {innerWidth < 992 && (
                <span
                  className={`${style["backdrop-cartcard"]} ${
                    style[cartSidebarBtn && "open"]
                  }`}
                  onClick={() => {
                    setCartSidebarBtn(!cartSidebarBtn);
                  }}
                ></span>
              )}
              <div className={`${style["domain-list-section"]}`}>
                <div className={`${style["domain-list-block"]}`}>
                  <div className={`${style["cart-domain-block"]}`}>
                    <div className={`${style["cart-domain-header"]}`}>
                      <div className={`${style["title-box"]}`}>
                        <h4>Your Cart - {bns_cart_data?.length} items</h4>
                      </div>
                      <div className={`${style["select-box"]}`}>
                        {innerWidth < 992 && (
                          <span
                            className={`${style["open-cart-btn"]}`}
                            onClick={() => {
                              setCartSidebarBtn(!cartSidebarBtn);
                            }}
                          >
                            <BsFillCartPlusFill /> &nbsp;{" "}
                            {bns_cart_data?.length}
                          </span>
                        )}
                      </div>
                    </div>
                    {bns_cart_data.length > 0 ? (
                      <div className={`${style["sub-domain-list"]}`}>
                        <ul>
                          <li>
                            {" "}
                            <DomainAddToCardList
                              className={"sub-domain-box"}
                              deleteCard={"true"}
                              bns_cart_data={bns_cart_data}
                            />{" "}
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <>
                        {" "}
                        <>
                          <div className={`${style["search-empty-block"]}`}>
                            <HiOutlineSearch />
                            <h5>
                              {" "}
                              Find your perfect domain by typing into the search
                              field above.
                            </h5>
                          </div>
                        </>
                      </>
                    )}
                  </div>
                </div>
                <div
                  className={`${style["domain-cart-block"]} ${
                    style[cartSidebarBtn && "open"]
                  }`}
                >
                  <div className={`${style["domain-cart-box"]}`}>
                    <h3>Order Summary</h3>

                    <div className={`${style["cart-total-block"]}`}>
                      <div className={`${style["cart-total-body"]}`}>
                        <div className={`${style["cart-total-list"]}`}>
                          <span className={`${style["key"]}`}>Subtotal</span>
                          <span className={`${style["value"]}`}>
                            {currencyFormat(addToCarttotal, "USD")}
                          </span>
                        </div>
                        {/* <div className={`${style["cart-total-list"]}`}>
                          <span className={`${style["key"]}`}>Discounts</span>
                          <span className={`${style["value"]}`}>- $ 25.00</span>
                        </div> */}
                      </div>
                      <div className={`${style["cart-total-footer"]}`}>
                        <div className={`${style["cart-total-list"]}`}>
                          <span className={`${style["key"]}`}>Total due</span>
                          <span className={`${style["value"]}`}>
                            {currencyFormat(addToCarttotal, "USD")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`${style["domain-cart-btn-box"]}`}>
                      <ul className={`${style["checklist"]}`}>
                        <li>
                          <div className={`${style["info-box"]}`}>
                            <div className={`${style["img-box"]}`}>
                              <label className={style["checkbox"]}>
                                <input name="checkbox-group" type="checkbox" />
                                <span className={style["checkbox__mark"]}>
                                  <BiCheck />
                                </span>
                              </label>
                            </div>
                            <div className={`${style["content-box"]}`}>
                              <p>
                                I acknowledge that if multiple users apply for
                                the same domain and I fail to perform these
                                activities, my chances of obtaining it will be
                                significantly reduced.
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className={`${style["info-box"]}`}>
                            <div className={`${style["img-box"]}`}>
                              <label className={style["checkbox"]}>
                                <input
                                  name="checkbox-group"
                                  type="checkbox"
                                  // checked={"checked"}
                                />
                                <span className={style["checkbox__mark"]}>
                                  <BiCheck />
                                </span>
                              </label>
                            </div>
                            <div className={`${style["content-box"]}`}>
                              <p>
                                I accept that in order to increase my chances of
                                obtaining this domain, I must perform the
                                mentioned activities.
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>

                      <button
                        className={`${style["cart-btn"]} btn`}
                        onClick={() => handleDomainDrop(bns_cart_data)}
                      >
                        Proceed to pay
                      </button>

                      {/* <button className={`${style["cart-btn"]} btn`}>
                        Proceed to pay
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {modalType === MODAL_TYPES.LOGIN_WITH_PASSWORD && (
          <LoginWithPassword
            show={modalType === MODAL_TYPES.LOGIN_WITH_PASSWORD}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.LOGIN_WITH_OTP && (
          <LoginWithOtp
            show={modalType === MODAL_TYPES.LOGIN_WITH_OTP}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.VERIFY_GOOGLE_OTP && (
          <LoginWithGoogleOtp
            show={modalType === MODAL_TYPES.VERIFY_GOOGLE_OTP}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.VERIFY_OTP && (
          <VerifyOtp
            show={modalType === MODAL_TYPES.VERIFY_OTP}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.FORGOT_PASSWORD && (
          <ForgotPassword
            show={modalType === MODAL_TYPES.FORGOT_PASSWORD}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.REGISTER && (
          <Register
            show={modalType === MODAL_TYPES.REGISTER}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.PREBOOK && (
          <>
            {ENABLE_REWARD_BUY && (
              <PrebookBnsWithBuyOptions
                show={modalType === MODAL_TYPES.PREBOOK}
                toggleModal={toggleModal}
                modalState={modalState}
                onReload={buySuccess}
                slug={process.env.NEXT_PUBLIC_BNS_DOMAIN_SLUG}
                quantityPerOrder={domainValue}
              />
            )}
          </>
        )}
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default CartSummary;
