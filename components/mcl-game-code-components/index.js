import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Image from "next/future/image";

import {
  isUserLoggedIn,
  setMclPlayPassDropLive,
} from "../../redux/reducers/user_reducer";
import { MODAL_TYPES, LOOT_STATUS } from "./common";
import LoginWithPassword from "../loot-box-section/login-with-password";
import LoginWithOtp from "../loot-box-section/login-with-otp";
import VerifyOtp from "../loot-box-section/verify-otp";
import ForgotPassword from "../loot-box-section/forgot-password";
import Register from "../loot-box-section/register";
import Prebook from "./prebook";
import LoginWithGoogleOtp from "../loot-box-section/google-otp";
import FlipTimer from "../flip-timer";

import style from "./style.module.scss";
import { gameCodesAvailableQty } from "../../utils/actioncable-methods";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import images from "../../utils/images-new.json";
import useWindowUtils from "../../hooks/useWindowUtils";
import Success from "./success";
import { active_code_buy_thunk } from "../../redux/thunk/user_thunk";

const PackSection = () => {
  const { width: innerWidth } = useWindowUtils();
  return (
    <div className={style["pack-section"]}>
      <Image
        height={400}
        width={400}
        alt="Pack"
        src={
          innerWidth > 767
            ? images?.champion_pass_mob
            : images?.champion_pass_mob
        }
        className={style["pack-image"]}
      />
    </div>
  );
};

const dateFormat = (date = null, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return null;
  var input_date = new Date(date);
  return dayjs(input_date).format(format);
};

const LootBoxSection = ({ buySuccess = () => {}, slug, details }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const lootStatusRef = useRef(null);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const loginStatus = useSelector(isUserLoggedIn);
  const [availQty, setAvailQty] = useState(details?.available_qty || 0);
  const [eventInfo, setEventInfo] = useState({});

  const initEventInfo = (showToast = false) => {
    let statusChangeMessage = "";
    const now = new Date().getTime(details?.current_time);
    let event_info = {
      title: "DROP STARTS IN",
      status: LOOT_STATUS?.YTS,
      endAt: dateFormat(details?.loot_start_time),
      buttonTitle:
        parseFloat(details?.buy_amount) < 1 ? "FREE CLAIM" : "BUY NOW",
      buttonDisabled: true,
    };

    if (now < new Date(details?.loot_start_time).getTime()) {
      dispatch(setMclPlayPassDropLive("DROP STARTS IN"));
      event_info = {
        title: "DROP STARTS IN",
        status: LOOT_STATUS?.YTS,
        endAt: dateFormat(details?.loot_start_time),
        buttonTitle:
          parseFloat(details?.buy_amount) < 1 ? "FREE CLAIM" : "BUY NOW",
        buttonDisabled: true,
      };
    } else if (
      parseInt(details?.available_qty) === 0 &&
      now <= new Date(details?.loot_end_time).getTime()
    ) {
      statusChangeMessage = "MCL Play Passes are sold out!";
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
    } else if (
      now >= new Date(details?.loot_start_time).getTime() &&
      now < new Date(details?.loot_end_time).getTime()
    ) {
      dispatch(setMclPlayPassDropLive(LOOT_STATUS?.DROP));
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: dateFormat(details?.loot_end_time),
        buttonTitle:
          parseFloat(details?.buy_amount) < 1 ? "FREE CLAIM" : "BUY NOW",
        buttonDisabled: !details?.available_qty || details?.purchased_qty === 1,
      };
    }
    //  else if (parseInt(details?.available_qty) === 0) {
    //   event_info = {
    //     title: "SOLD OUT",
    //     status: LOOT_STATUS?.SOLD_OUT,
    //     buttonTitle: "SOLD OUT",
    //     buttonDisabled: true,
    //   };
    // }
    else if (parseInt(details?.available_qty) === 0) {
      event_info = {
        title: "SOLD OUT",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
    } else if (now >= new Date(details?.loot_end_time).getTime()) {
      dispatch(setMclPlayPassDropLive(LOOT_STATUS?.SOLD_OUT));
      statusChangeMessage = "Drop Ended!";
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.DROP_ENDED,
        buttonTitle: "DROP ENDED",
        buttonDisabled: true,
      };
    }
    if (statusChangeMessage) {
      toggleModal();
      showToast && toast.info(statusChangeMessage);
    }
    setEventInfo(event_info);
    setAvailQty(details?.available_qty);
  };

  const dispatchCallback = (response) => {
    if (response?.data?.status !== 200) {
      toast.error(
        response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } else {
      toggleModal(MODAL_TYPES.SUCCESS, {
        loot: { ...details },
        loot_status: eventInfo.status,
      });
    }
  };

  const handlePreBook = () => {
    if (eventInfo?.buttonDisabled) return;
    if (loginStatus) {
      if (parseFloat(details?.buy_amount) < 1) {
        dispatch(
          active_code_buy_thunk({
            data: {
              slug: details?.slug,
              activation_codes: { payment_include: ["USD"] },
            },
            callback: dispatchCallback,
          })
        );
      } else {
        toggleModal(MODAL_TYPES.PREBOOK, {
          loot: { ...details },
          loot_status: eventInfo.status,
        });
      }
    } else toggleModal(MODAL_TYPES.LOGIN_WITH_OTP);
  };

  const toggleModal = useCallback((modalType = "", modalState = {}) => {
    setModalType(modalType);
    setModalState(modalState);
  }, []);

  useEffect(() => {
    initEventInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  useEffect(() => {
    if (!loginStatus && router.query.email && router.query.with) {
      toggleModal(MODAL_TYPES.LOGIN_WITH_OTP, { email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.email]);

  useEffect(() => {
    gameCodesAvailableQty(slug, (data) => {
      !isNaN(data?.available) && setAvailQty(data?.available);
      if (parseInt(data?.available) === 0) {
        dispatch(setMclPlayPassDropLive(LOOT_STATUS?.SOLD_OUT));
        setEventInfo({
          title: "DROP ENDED",
          status: LOOT_STATUS?.SOLD_OUT,
          buttonTitle: "SOLD OUT",
          buttonDisabled: true,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={style["loot-timer-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {[LOOT_STATUS.DROP, LOOT_STATUS.YTS].includes(
                eventInfo?.status
              ) &&
                eventInfo?.endAt && (
                  <div className={style["loot-timer-block"]}>
                    <h4>{eventInfo?.title}</h4>
                    <FlipTimer
                      endTime={eventInfo?.endAt}
                      handleEndEvent={() =>
                        setTimeout(() => initEventInfo(true), 1000)
                      }
                    />

                    {eventInfo?.buttonTitle && (
                      <button
                        className={style["pre-book-btn"]}
                        onClick={handlePreBook}
                        disabled={eventInfo?.buttonDisabled}
                      >
                        {eventInfo?.buttonTitle}
                      </button>
                    )}
                    {details?.purchased_qty === 1 &&
                      eventInfo?.status === LOOT_STATUS.DROP && (
                        <h6 className="playpass-hint">
                          <BsFillInfoCircleFill />
                          {"  "}
                          Play pass already purchased
                        </h6>
                      )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <section className={style["main-loot-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={style["loot-block"]}>
                <div className={style["loot-section"]}>
                  <div className={`${style["items"]} ${style["one"]}`}>
                    <h2>
                      ABOUT{" "}
                      <span className={style["theme-text"]}>
                        MCL NEW YEAR BASH TOURNAMENT PASS
                      </span>
                    </h2>
                    <p>
                      Claim your FREE PASS to enter and play in this $10,000 MCL
                      New Year Bash Tournament! Celebrate this festive season
                      with MCL.
                    </p>
                    {/* <p>
                      The Super Loot box contains player NFTs that grant you
                      access to the exciting world of MCL Rush and its
                      magnificence. Each box contains 1 Batsman NFT and 1 Bowler
                      NFT. Pre-book your Super Loot box today for ust $1 to get
                      started!
                    </p> */}
                  </div>
                  <div className={`${style["items"]} ${style["onesub"]}`}>
                    <h3>HOW IT WORKS?</h3>
                    <ul>
                      <li>Tournament entry limited to 10,000 Pass Holders</li>
                      <li>Tournament duration is 1 hour</li>
                      <li>All Pass Holders play a maximum of 4 matches each</li>
                      <li>The duration of each match will be 2 overs</li>
                      <li>
                        Only Top 2 matches with the best scores will count
                        toward the leaderboard
                      </li>
                    </ul>
                    <p>
                      The tournament carries a $10,000 prize pool, and 100% of
                      participants will be declared winners.
                    </p>
                  </div>
                  <div className={`${style["items"]} ${style["two"]}`}>
                    <div className={`${style["box-block"]}`}>
                      {/* <h6>Every Super Loot Box Contains</h6> */}
                      <h4>EACH USER CAN CLAIM ONLY 1 PASS FOR FREE</h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["three"]}`}>
                    <div className={`${style["box-block"]}`}>
                      {/* <h6>Every Super Loot Box Contains</h6> */}
                      <h4>
                        NON-NFT USERS WILL GET 1 BATSMAN NFT AND 1 BOWLER NFT ON
                        RENT FOR FREE<sup>#</sup>
                      </h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["four"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>MCL NEW YEAR BASH PASS PRICE</h6>
                      {details?.buy_amount && (
                        <h4 className={style["pack-price"]}>
                          {parseFloat(details?.buy_amount) < 1 ? (
                            <>
                              <s>$1/PASS</s>
                              <br />
                              FREE
                            </>
                          ) : (
                            <>{"$" + parseInt(details?.buy_amount)}/PASS</>
                          )}
                        </h4>
                      )}
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["five"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>TOTAL SUPPLY</h6>
                      <h4 className={style["pack-count"]}>
                        {details?.total_quantity}
                      </h4>
                    </div>
                  </div>
                  <div className={`${style["items"]} ${style["six"]}`}>
                    <div className={`${style["box-block"]}`}>
                      <h6>AVAILABLE PASSES</h6>
                      {eventInfo.status !== LOOT_STATUS.SOLD_OUT &&
                        availQty > 0 && (
                          <h4 className={style["pack-count"]}>{availQty}</h4>
                        )}
                      {eventInfo.status === LOOT_STATUS.SOLD_OUT && (
                        <>
                          <h4 className={style["pack-count"]}>
                            {details?.total_quantity}
                          </h4>
                          <h6>(SOLD OUT)</h6>
                        </>
                      )}
                    </div>
                  </div>
                  {eventInfo?.status !== LOOT_STATUS?.SOLD_OUT && (
                    <div className={`${style["items"]} ${style["full-row"]}`}>
                      <div className={`${style["box-block"]}`}>
                        <h6>
                          {eventInfo?.status === LOOT_STATUS?.YTS &&
                            "DROP STARTS AT"}
                          {eventInfo?.status === LOOT_STATUS?.DROP &&
                            "DROP STARTED ON"}
                          {eventInfo?.status === LOOT_STATUS?.DROP_ENDED &&
                            "DROP ENDED ON"}
                        </h6>
                        <h4>
                          {eventInfo?.status === LOOT_STATUS?.YTS &&
                            dayjs(details?.loot_start_time).format(
                              "hh:mm A  IST - MMM D, YYYY"
                            )}
                          {eventInfo?.status === LOOT_STATUS?.DROP &&
                            dayjs(details?.loot_start_time).format(
                              "hh:mm A  IST - MMM D, YYYY"
                            )}
                          {eventInfo?.status === LOOT_STATUS?.DROP_ENDED &&
                            dayjs(details?.loot_end_time).format(
                              "hh:mm A  IST - MMM D, YYYY"
                            )}
                        </h4>
                      </div>
                    </div>
                  )}
                </div>

                <PackSection />
              </div>
            </div>
            <div className="row" ref={lootStatusRef}>
              <div className="col-12 text-center mt-5">
                {eventInfo?.buttonTitle && (
                  <button
                    className={style["theme-btn"]}
                    onClick={handlePreBook}
                    disabled={eventInfo?.buttonDisabled}
                  >
                    {eventInfo?.buttonTitle}
                  </button>
                )}
              </div>
              {details?.purchased_qty === 1 &&
                eventInfo?.status === LOOT_STATUS.DROP && (
                  <>
                    <h6 className="playpass-hint">
                      <BsFillInfoCircleFill /> Play pass already purchased
                    </h6>

                    {/* <div title="Add to Calendar" className="addeventatc">
                      <BsCalendar4 />
                      Add to my calendar
                      <span className="start">
                        {dayjs(details?.start_time).format(
                          "MM/DD/YYYY hh:mm A"
                        )}
                      </span>
                      <span className="end">
                        {" "}
                        {dayjs(details?.end_time).format("MM/DD/YYYY hh:mm A")}
                      </span>
                      <span className="timezone">Asia/Calcutta</span>
                      <span className="title">{details?.name}</span>
                      <span className="organizer">https://jump.trade/</span>
                    </div> */}
                  </>
                )}
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
          <Prebook
            show={modalType === MODAL_TYPES.PREBOOK}
            toggleModal={toggleModal}
            modalState={modalState}
            onReload={buySuccess}
          />
        )}
        {modalType === MODAL_TYPES.SUCCESS && (
          <Success
            show={modalType === MODAL_TYPES.SUCCESS}
            toggleModal={toggleModal}
            modalState={modalState}
            onReload={buySuccess}
          />
        )}
      </section>
    </>
  );
};

export default LootBoxSection;
