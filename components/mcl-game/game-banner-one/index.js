import Image from "next/future/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsCurrencyDollar } from "react-icons/bs";

import style from "../style.module.scss";
import images from "../../../utils/images.json";
import {
  tournamentTime,
  validateEmail,
  validatePhone,
} from "../../../utils/common";
import { tournamentsApi } from "../../../utils/base-methods";
import { AiFillAndroid, AiFillInfoCircle, AiFillWindows } from "react-icons/ai";
import { tournamentDetails } from "../../../redux/thunk/user_thunk";
import { useDispatch } from "react-redux";
import { MdSchedule } from "react-icons/md";
import ContentLoader from "react-content-loader";
import ScheduleImage from "../../../images/schedule-image.png";
import useWindowSize from "../../../hooks/useWindowSize";
import dayjs from "dayjs";
import GamePass from "../../../images/jump-trade/schedule-paid/game-pass.svg";
import ToolTip from "../../tooltip";
import {
  getAndroidAPK,
  getWindowsEXE,
} from "../../../redux/reducers/user_reducer";
const MclGameOne = ({ hideSign = false, ...props }) => {
  const { user, cart } = useSelector((state) => state);
  const androidAPK = useSelector(getAndroidAPK);
  const windowsEXE = useSelector(getWindowsEXE);
  const [type, setType] = useState("email");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [vEmail, setVEmail] = useState();
  const [subcribe, setSubcribe] = useState({
    email: "",
    phone: "+91",
  });
  const [currentSubcribe, setcurrentSubcribe] = useState("email");

  const [validation, setValidation] = useState({
    email: false,
    valid_email: false,
    phone: false,
    valid_phone: false,
  });

  const [matchScedule, setMatchScedule] = useState([]);
  const { width } = useWindowSize();

  // const dispatch = useDispatch();

  const toggleType = (input) => {
    setType(input);
    setcurrentSubcribe(input);
    //console.log(type);
  };

  const game_launch_start_date = "July 22 2022 14:00:00";

  const [game_launch_time, set_gamelauch_timer] = useState();
  const [end_time, set_end_time] = useState(false);

  const timeFunction = (check = false) => {
    var offset = new Date().getTimezoneOffset();

    var game_launch_start_date_utc = new Date(game_launch_start_date);
    game_launch_start_date_utc.setMinutes(
      game_launch_start_date_utc.getMinutes() - offset
    );

    var s_time = new Date();

    if (check) s_time.setSeconds(s_time.getSeconds() + 2);

    if (new Date(game_launch_start_date_utc) < s_time) {
      set_end_time(true);
      // dispatch(market_live_thunk());
    } else {
      set_end_time(false);
      set_gamelauch_timer(game_launch_start_date_utc);
      // dispatch(market_live_off_thunk());
    }
  };

  useEffect(() => {
    timeFunction(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTimer = () => {
    set_end_time(true);
  };

  const handleSubcribe = () => {
    setError(null);
    setVEmail("");
    if (checkValidation()) {
      setVEmail(null);

      try {
        setLoading(true);

        // const result = await sendEmailNewletter(email2);

        // if (result.data.status) {
        setVEmail(
          "You're now on our waitlist! Keep an eye on your inbox for the latest updates on a Jump.Trade!"
        );
        // } else {
        //   setVEmail2(
        //     "Nobody loves NFTs like you do as your email id is already on our waitlist! We'll keep you posted on this Minnal NFT drop schedule."
        //   );
        // }

        setSubcribe({ email: "", phone: "" });
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(
          "🚀 ~ file: index.js ~ line 46 ~ handleSendNewsLetter ~ error",
          error
        );
      }
    }
  };

  const checkValidation = () => {
    let c_validation = { ...validation };

    if (type === "email") {
      if (!subcribe.email) {
        c_validation = { ...c_validation, email: true };
      } else {
        if (validateEmail(subcribe.email)) {
          c_validation = { ...c_validation, valid_email: false };
        } else {
          c_validation = { ...c_validation, valid_email: true };
        }
      }
      setValidation(c_validation);
      if (!c_validation.email) {
        if (validateEmail(subcribe.email)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      if (!subcribe.phone) {
        c_validation = { ...c_validation, phone: true };
      } else {
        if (validatePhone(subcribe.phone)) {
          c_validation = { ...c_validation, valid_phone: false };
        } else {
          c_validation = { ...c_validation, valid_phone: true };
        }
      }
      setValidation(c_validation);
      if (!c_validation.phone) {
        if (validatePhone(subcribe.phone)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };

  const handleChangeEvent = (e) => {
    setError(null);
    setVEmail("");
    setSubcribe({ ...subcribe, [e.target.name]: e.target.value.trim() });
    if (e.target.value) {
      setValidation({ ...validation, [e.target.name]: false });
    } else {
      setValidation({ ...validation, [e.target.name]: true });
    }
  };

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleSubcribe();
    }
  };

  const dispatchCallback = (response) => {
    if (response?.data?.status === 200) {
      setMatchScedule(response?.data?.data || []);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    // setLoading(true);
    // dispatch(tournamentDetails({ callback: dispatchCallback }));
    tournamentsTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tournamentsTimer = async () => {
    try {
      setLoading(true);
      let result = await tournamentsApi();
      // console.log(result);
      setMatchScedule(
        result?.data?.data?.active?.sort(
          (a, b) => b?.paid_event - a?.paid_event
        ) || []
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <section className={style["game-banner"]}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <div className="p-lg-5 p-2">
                <h2 className={`${style["mcl-game-title"]} `}>
                  MCL TOURNAMENT SCHEDULE
                </h2>
                {/* <h2 className={`${style["mcl-game-time"]} `}></h2> */}
              </div>
              {!loading ? (
                <>
                  {width > 992 ? (
                    <div className="table-block tournament-tabel">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.tournament}
                                alt="tournament"
                              />
                              Tournaments
                            </th>
                            <th>
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.timing}
                                alt="timing"
                              />
                              Timings (IST)
                            </th>
                            <th>
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.matches}
                                alt="matches"
                              />
                              Matches
                            </th>
                            <th>
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.player}
                                alt="player"
                              />
                              Players
                            </th>
                            <th>
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.bat_icon}
                                alt="bat_icon"
                              />
                              Bat
                            </th>
                            <th>
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.winner}
                                alt="winner"
                              />
                              Winners
                            </th>
                            <th className="rewards">
                              <Image
                                className="thead-icon"
                                height={40}
                                width={40}
                                src={images.reward}
                                alt="reward"
                              />
                              Rewards
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {matchScedule?.length > 0 ? (
                            <>
                              {matchScedule.map((list, i) => (
                                <tr
                                  key={i}
                                  className={`${
                                    list?.paid_event && "paid-event"
                                  }`}
                                >
                                  <td className="title">
                                    {list?.name}{" "}
                                    {list?.paid_event && (
                                      <>
                                        {" "}
                                        {/* <Image
                                          height={40}
                                          width={40}
                                          src={GamePass.src}
                                          alt="GamePass"
                                        /> */}
                                        <div className="gamepass-icon-box">
                                          <Image
                                            className="gamepass-icon"
                                            height={40}
                                            width={40}
                                            src={GamePass.src}
                                            alt="GamePass"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </td>
                                  <td>
                                    <div>
                                      <>
                                        {dayjs(list?.start_time).format(
                                          "MMM D, YYYY hh:mm:A"
                                        )}
                                        {dayjs(list?.end_time).format(
                                          "MM/DD/YYYY"
                                        ) ===
                                          dayjs(list?.start_time).format(
                                            "MM/DD/YYYY"
                                          ) &&
                                          ` - ${dayjs(list?.end_time).format(
                                            "hh:mm A"
                                          )}`}
                                      </>
                                      {/* Starts -{" "} */}
                                    </div>
                                    <div>
                                      {/* Ends -{" "} */}
                                      {dayjs(list?.end_time).format(
                                        "MM/DD/YYYY"
                                      ) !==
                                        dayjs(list?.start_time).format(
                                          "MM/DD/YYYY"
                                        ) &&
                                        dayjs(list?.end_time).format(
                                          "MMM D, YYYY hh:mm A"
                                        )}
                                    </div>
                                  </td>
                                  <td>
                                    {list?.total_matches}{" "}
                                    {list?.paid_event && (
                                      <ToolTip
                                        icon={
                                          <AiFillInfoCircle
                                            size={16}
                                            className="mb-1 check-icon"
                                          />
                                        }
                                        content={
                                          " Only Top 2 matches with the best scores will count toward the leaderboard"
                                        }
                                        placement="top"
                                      />
                                    )}
                                  </td>
                                  <td>{list?.players}</td>
                                  <td>
                                    <Image
                                      className="bat-status-icon"
                                      height={40}
                                      width={40}
                                      src={
                                        list?.has_bat
                                          ? images.tick_white
                                          : images.wrong_white
                                      }
                                      alt="bat_icon"
                                    />
                                  </td>
                                  <td>{list?.total_winners}</td>
                                  <td className="rewards">
                                    {
                                      <>
                                        <BsCurrencyDollar />
                                        <span>
                                          {parseInt(list?.total_rewards || 0)}
                                        </span>
                                      </>
                                    }
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <tr className="text-center">
                              <td colSpan={7}>
                                Tournament schedule is getting ready. Stay
                                tuned.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <>
                      {matchScedule.length > 0 ? (
                        <div className="flexy-mcl-game-block">
                          <ul className="hint-list">
                            <li>
                              <div className="bat-icon-box">
                                <Image
                                  className="bat-icon"
                                  height={40}
                                  width={40}
                                  src={images.bat_icon}
                                  alt="bat_icon"
                                />
                              </div>
                              - Bat allowed
                            </li>
                            <li>W - Winners</li>
                            <li>R - Rewards</li>
                          </ul>

                          <div className="flexy-mcl-game-list">
                            {matchScedule.map((list) => (
                              <>
                                <article
                                  className={`${
                                    list?.paid_event && "paid-event"
                                  } flexy-mcl-game-tiem`}
                                >
                                  <div className="flexy-mcl-header">
                                    {list?.has_bat && (
                                      <div className="bat-icon-box">
                                        <Image
                                          className="bat-icon"
                                          height={40}
                                          width={40}
                                          src={images.bat_icon}
                                          alt="bat_icon"
                                        />
                                      </div>
                                    )}
                                    {list?.paid_event && (
                                      <div className="gamepass-icon-box">
                                        <Image
                                          className="gamepass-icon"
                                          height={40}
                                          width={40}
                                          src={GamePass.src}
                                          alt="GamePass"
                                        />
                                      </div>
                                    )}
                                    <h4>{list?.name}</h4>

                                    <h6 className="timing">
                                      <Image
                                        className="timing-icon"
                                        height={40}
                                        width={40}
                                        src={images.timing_white}
                                        alt="timing"
                                      />
                                      <div className="date-time-box">
                                        <h6>
                                          <>
                                            {dayjs(list?.start_time).format(
                                              "MMM D, YYYY hh:mm A"
                                            )}{" "}
                                            {dayjs(list?.end_time).format(
                                              "MM/DD/YYYY"
                                            ) ===
                                              dayjs(list?.start_time).format(
                                                "MM/DD/YYYY"
                                              ) &&
                                              `- ${dayjs(list?.end_time).format(
                                                "hh:mm A"
                                              )}`}{" "}
                                          </>
                                        </h6>

                                        <h6>
                                          {dayjs(list?.end_time).format(
                                            "MM/DD/YYYY"
                                          ) !==
                                            dayjs(list?.start_time).format(
                                              "MM/DD/YYYY"
                                            ) &&
                                            `${dayjs(list?.end_time).format(
                                              "MMM D, YYYY hh:mm A"
                                            )}`}{" "}
                                        </h6>
                                      </div>
                                    </h6>
                                  </div>
                                  <div className="flexy-mcl-body">
                                    <ul className="feature-list">
                                      <li>
                                        <span className="key-feature">
                                          Matches
                                        </span>
                                        <span className="value-feature">
                                          {list?.total_matches}
                                          {list?.paid_event && (
                                            <ToolTip
                                              icon={
                                                <AiFillInfoCircle
                                                  size={16}
                                                  className="mb-1 check-icon"
                                                />
                                              }
                                              content={
                                                "Only Top 2 matches with the best scores will count toward the leaderboard"
                                              }
                                              placement="top"
                                            />
                                          )}
                                        </span>
                                      </li>
                                      <li>
                                        <span className="key-feature">
                                          Players
                                        </span>
                                        <span className="value-feature">
                                          {list?.players}
                                        </span>
                                      </li>
                                      <li>
                                        <span className="key-feature">W/R</span>
                                        <span className="value-feature winner-rewards-sec">
                                          {list?.total_winners}/
                                          <>
                                            <BsCurrencyDollar />
                                            {parseInt(list?.total_rewards || 0)}
                                          </>
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </article>
                              </>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          {width < 768 && (
                            <div className={`${style["nomatchfound-mobile"]}`}>
                              <Image
                                src={ScheduleImage.src}
                                alt="Schedule"
                                height="518"
                                width="1112"
                              />
                              <p>
                                Tournament schedule is getting ready. Stay
                                tuned.
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>{width > 768 ? <MyLoader /> : <MobileLoader />}</>
              )}

              <div className={`${style["btn-block-mclpg"]}`}>
                <a
                  href={androidAPK}
                  className={`${style["theme-btn"]} ${style["download-btn"]}`}
                >
                  <span>
                    <AiFillAndroid />
                    ANDROID
                  </span>
                </a>
                <a
                  href={windowsEXE}
                  className={`${style["theme-btn"]} ${style["download-btn"]}`}
                >
                  <span>
                    <AiFillWindows />
                    WINDOWS
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className={`${style["mcl-game-two"]} pt-5`}>
        <div className="container-fluid py-4 py-xl-5">
          <div className="row mb-4 mb-lg-5">
            <div className="col-md- col-xl-8 text-center mx-auto">
              <h2 className={`${style["div_title"]} fw-bold`}>
                META CRICKET LEAGUE
              </h2>
              <h2
                className={`${style["div_title"]} ${style["div_stroke"]} fw-bold`}
              >
                GAME ON
              </h2>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row row-cols-2 row-cols-md-3 mx-auto justify-content-center">
           
            <div
              className={`${style["mcl-app-download"]} col-lg-6 offset-lg-3 col-lg-8 offset-lg-3 col-sm-10 offset-sm-1 col-12 mx-auto`}
            >
              <div
                className={` ${style["download-games"]} d-flex flex-lg-row  flex-sm-column flex-column align-items-center justify-content-between`}
              >
                <div className="d-flex flex-column align-items-center justify-content-between">
                  <div className={style["android-icon"]}>
                    <Image
                      layout="responsive"
                      height={500}
                      width={500}
                      alt="android Icon"
                      src={images.android}
                    />
                  </div>
                  
                  <div className={`${style["app-launch-timer"]} mt-3`}>
                   
                  </div>
                </div>
                <div className="vr"></div>
                <div className="d-flex flex-column align-items-center justify-content-between">
                  <div className={style["android-icon"]}>
                    <Image
                      layout="responsive"
                      height={138}
                      width={305}
                      alt="Ios Icon"
                      src={images.ios}
                    />
                  </div>

                  <div className={style["app-launch-timer"]}>
                    <h2 className={`${style["coming_soon"]} text-uppercase`}>
                      Invitation only
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <div className={style["hr-line"]}></div>

      {/* <section className={`${stye["whitepaper_sec"] py-5`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className={`${style["whitepaper_box"]}  p-4 text-center position-relative`}>
              <h1 className={`${style["download_app"]} display-1 text-uppercase fw-bold`}>
                Meta Cricket League
              </h1>
              <h1 className={`${style["marketplace_app"]} display-1 text-uppercase fw-bold`}>
                Whitepaper
              </h1>
              <p className="my-3 text-capitaliz text-white e h-meduim fs-4">
                <span>
                  Meta Cricket League is a Hit-to-Earn game that brings the
                  excitement of cricket to the metaverse. Read the whitepaper to
                  learn more about the game, its structure, and key details.
                </span>
              </p>
              <p className={`${style["theme-color"]} fs-3 text-capitalize`}>
                <strong>
                  <span>Learn about meta cricket league</span>
                </strong>
              </p>
              <a href="http://mcl-wp.jump.trade/">
                <button className="read_moree fs-5 fw-bold">
                  <span>Read Now</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default MclGameOne;

const MyLoader = () => (
  <ContentLoader
    viewBox="0 0 380 50"
    backgroundColor="#4d4a5f"
    foregroundColor="#212031"
  >
    <rect x="30" y="17" rx="4" ry="4" width="300" height="20" />
  </ContentLoader>
);

const MobileLoader = () => (
  <ContentLoader
    viewBox="0 0 500 150"
    backgroundColor="#4d4a5f"
    foregroundColor="#212031"
  >
    <rect x="15" y="5" rx="4" ry="4" width="450" height="20" />
    <rect x="15" y="35" rx="4" ry="4" width="450" height="80" />
  </ContentLoader>
);
