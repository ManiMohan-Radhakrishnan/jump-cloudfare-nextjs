import React from "react";
import {
  FaDiscord,
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
  FaYoutube,
  FaFacebook,
  //   IoLogoWhatsapp
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

import style from "./style.module.scss";

const Community = () => {
  return (
    // <div>index</div>
    <section className={style["community-section"]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className={style["content-center"]}>
              <h2 className={style["title"]}>JOIN OUR COMMUNITY !</h2>
              <p className={style["description"]}>
                Join Our Robust Community Of NFT Collectors, Metaverse
                Cricketers, &amp; Top P2E Earners. Participate In Our Discord
                Discussions!
              </p>
            </div>
            <div>
              <ul className={style["social-media"]}>
                <li>
                  <a
                    href="https://discord.com/invite/JRWmNb38GW"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <FaDiscord />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://twitter.com/Jumptradenft"
                  >
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.facebook.com/jumptradeofficialnfts"
                  >
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.instagram.com/jumptradenft/"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://t.me/jumptradenft"
                  >
                    <FaTelegramPlane />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.youtube.com/channel/UCBjyJeYnDeml1aE6URwUfdA"
                  >
                    <FaYoutube />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://api.whatsapp.com/send?l=en&amp;text=Hi,%20I%20have%20a%20query%20here!&amp;phone=918925512070"
                  >
                    <IoLogoWhatsapp />
                  </a>
                </li>
              </ul>
            </div>
            <a
              href="mailto:support@jump.trade"
              rel="nofollow noopener noreferrer"
              className={`${style["support-link"]}`}
            >
              support@jump.trade
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
