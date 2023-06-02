import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillAndroid, AiFillWindows } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  getAndroidAPK,
  getWindowsEXE,
} from "../../redux/reducers/user_reducer";

import style from "./style.module.scss";
const DownloadGame = () => {
  const router = useRouter();
  const androidAPK = useSelector(getAndroidAPK);
  const windowsEXE = useSelector(getWindowsEXE);

  return (
    <>
      <article className={`${style["download-btn-section"]}`}>
        <div className="container-fluid">
          <div className="row align-items-end">
            <div className="col-12 col-sm-6 col-lg-4 offset-lg-2">
              <div
                className={`${style["live-upcoming-tour"]} ${style["btnblock-tour"]} ${style["border-right"]} `}
              >
                <h5 className={style["mclnotes_title"]}>
                  {" "}
                  Daily MCL Game <br /> Tournament Schedule
                </h5>
                <div className={`${style["btn-block"]} mt-2`}>
                  <a
                    href="javascript:void(0)"
                    rel="noreferrer"
                    className={`${style["download-icon-btn"]} ${style["theme-btn"]} ${style["rounded-bordered"]}`}
                    onClick={() => router.push("/mcl-game")}
                  >
                    <span> MCL SCHEDULE</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6  col-lg-4">
              <div
                className={`${style["live-upcoming-tour"]} ${style["btnblock-tour"]}`}
              >
                <h5 className={style["mclnotes_title"]}>Download MCL Game</h5>
                <div className={`${style["btn-block"]} mt-2`}>
                  <a
                    href={androidAPK}
                    // target="_blank"
                    rel="noreferrer"
                    className={`${style["download-icon-btn"]} ${style["theme-btn"]}`}
                  >
                    <span>
                      {" "}
                      <AiFillAndroid /> ANDROID
                    </span>
                  </a>
                  <a
                    href={windowsEXE}
                    // target="_blank"
                    rel="noreferrer"
                    className={`${style["download-icon-btn"]} ${style["theme-btn"]}`}
                  >
                    <span>
                      {" "}
                      <AiFillWindows /> WINDOWS
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default DownloadGame;
