import dayjs from "dayjs";
import Image from "next/future/image";
import { useEffect, useState } from "react";

import NFTCounter from "../nft-counter";
import style from "./style.module.scss";
import {
  slamUpNextImage,
  LivenowBall,
  finishedMatch,
  upcomingMatch,
  upcomingMatchCard,
  upcomingMatchGear,
  upcomingMatchGearWhite,
} from "../../utils/images.json";

const Tournament = ({
  index,
  statusChange = () => {},
  tournamentData = {},
}) => {
  const [cTime, setCTime] = useState(new Date());
  // Timed Auction
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLiveStarted, setIsLiveStarted] = useState(false);
  var className = "upcoming-card";

  useEffect(() => {
    showTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showTimer = () => {
    if (
      new Date().getTime() <= new Date(tournamentData?.end_time).getTime() &&
      new Date().getTime() > new Date(tournamentData?.start_time).getTime()
    ) {
      setIsLiveStarted(true);
    }
    if (
      new Date().getTime() <= new Date(tournamentData?.start_time).getTime()
    ) {
      setIsUpcoming(true);
    }
    if (new Date().getTime() > new Date(tournamentData?.end_time).getTime()) {
      setIsFinished(true);
    }
  };
  const setChangeStart = () => {
    statusChange();
  };
  const setChangeEnd = () => {
    statusChange();
  };
  if (isUpcoming) className = "upcoming-card";
  else if (isFinished) className = "expire-card";
  else if (isLiveStarted) className = "livenow-card";
  else className = "upnext-card";

  return (
    <div aria-rowindex={index}>
      <article
        className={`${style["tournament-card"]} ${style[className]} tournament-card-jtcmn`}
      >
        {!tournamentData?.schedule && (
          <Image
            src={
              tournamentData?.img_url
                ? tournamentData?.img_url
                : slamUpNextImage
            }
            className={style["slam-image"]}
            aria-rowindex={index}
            width="100"
            height="100"
            alt="tournament"
          />
        )}
        {tournamentData?.schedule && (
          <Image
            layout="responsive"
            height={100}
            width={100}
            alt="Touranment"
            src={slamUpNextImage}
            className={style["slam-image"]}
            aria-rowindex={index}
          />
        )}
        <div
          className={`${style["content-block"]} content-block-jtcmn`}
          aria-rowindex={index}
        >
          {isFinished && (
            <span className={style["tournament-end-band"]}>
              tournament <br /> ended
            </span>
          )}
          {isLiveStarted && (
            <a href="javascript:void(0);" className={style["live-btn"]}>
              <span>Live</span>
              <Image
                alt="Live Icon"
                width={100}
                height={100}
                layout="responsive"
                src={LivenowBall}
              />
              <span>Now</span>
            </a>
          )}
          {isFinished && (
            <Image
              alt="Upcoming"
              height={120}
              width={500}
              layout="responsive"
              className={style["img-upcoming_expire"]}
              src={finishedMatch}
            />
          )}
          {isUpcoming && (
            <Image
              alt="expire"
              layout="fill"
              className={style["img-upcoming_expire"]}
              src={upcomingMatch}
              height={120}
              width={500}
            />
          )}
          {tournamentData?.schedule && (
            <>
              <Image
                alt="Upcoming"
                layout="responsive"
                className={style["img-upcoming_expire-bg"]}
                src={upcomingMatchCard}
                height={120}
                width={500}
              />
              <div className={style["upcoming_expire-gear-box"]}>
                <Image
                  alt="Gear"
                  layout="fill"
                  style={{
                    width: "100",
                    height: "100",
                    position: "relative",
                  }}
                  className={style["img-upcoming_expire-gear"]}
                  src={upcomingMatchGear}
                  height={100}
                  width={100}
                />
                <Image
                  layout="responsive"
                  style={{
                    width: "100",
                    height: "100",
                    position: "relative",
                  }}
                  alt="tournament"
                  src={upcomingMatchGearWhite}
                  className={style["img-upcoming_expire-gear-white"]}
                  height={100}
                  width={100}
                />
              </div>
            </>
          )}
          {isUpcoming && (
            <>
              {" "}
              {index === 1 ? (
                <h5> Tournament starts in</h5>
              ) : (
                <h5>Upcoming tournament starts in</h5>
              )}
            </>
          )}
          {isLiveStarted && <h5>tournament ends in</h5>}
          {isFinished && <h5>tournament ended on</h5>}
          <div className={style["timer-box"]}>
            <h5 className={style["timer-time"]}>
              {isFinished &&
                dayjs(tournamentData.end_time).format("MMM D, YYYY hh:mm A")}
              {isLiveStarted && tournamentData?.end_time && (
                <>
                  <NFTCounter
                    time={tournamentData?.end_time}
                    timeClass={style["counter-time"]}
                    handleEndEvent={() => setChangeEnd()}
                    cTime={cTime}
                  />
                </>
              )}
              {isUpcoming && tournamentData?.start_time && (
                <>
                  <NFTCounter
                    time={tournamentData?.start_time}
                    timeClass={style["counter-time"]}
                    handleEndEvent={() => setChangeStart()}
                    cTime={cTime}
                  />
                </>
              )}
              {tournamentData?.schedule && "Up Next"}
            </h5>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Tournament;
