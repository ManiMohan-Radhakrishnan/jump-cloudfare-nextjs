import Image from "next/future/image";
import { useRouter } from "next/router";

import images from "../../../utils/images.json";
import style from "./style.module.scss";

const OurTeam = () => {
  const router = useRouter();
  return (
    <section className={style["our-team-section"]}>
      <div className="container-fluid">
        <div className="row mt-150">
          <div className="col-sm-12">
            <h2 className={style["sectionHeading"]}>GuardianLink Team</h2>
          </div>
        </div>
      </div>
      <section className={style["team-box"]}>
        <article className={style["team-member"]}>
          <div className={style["team-member-img"]}>
            <Image
              layout="responsive"
              height="100"
              width="100"
              src={images.otkp}
              alt="Keyur"
            />
          </div>

          <span className={style["team-member-role"]}>
            Co-Founder <br />
            &amp; Chairman
          </span>
          <div className={style["team-member-name-desc"]}>
            <h3 className={style["team-member-name"]}>
              Keyur <br />
              Patel
            </h3>
            <p className={style["team-member-desc"]}>
              He is one of the most dynamic visionaries in the digital realm. He
              incubated, hatched and funded some of the most successful
              companies including Amazon, Netflix, Twitter, PayPal, Sky+, NDTV,
              Yahoo! and Fabrik
            </p>
          </div>
        </article>

        <article className={style["team-member"]}>
          <div className={style["team-member-img"]}>
            <Image
              layout="responsive"
              height="100"
              width="100"
              src={images.otram}
              alt="Ramkumar"
            />
          </div>

          <span className={style["team-member-role"]}>
            Co-Founder <br />
            &amp; CEO
          </span>
          <div className={style["team-member-name-desc"]}>
            <h3 className={style["team-member-name"]}>
              Ramkumar <br />
              Subramaniam
            </h3>
            <p className={style["team-member-desc"]}>
              Having helped in creating a $3B MarketCap for our partners, Ram,
              an early crypto-adopter and a diehard decentralisation fan, is a
              Co-Founder of GuardianLink. His vision is to just make sure 1
              Million artists make $1 Million each on GuardianLink.
            </p>
          </div>
        </article>

        <article className={style["team-member"]}>
          <div className={style["team-member-img"]}>
            <Image
              layout="responsive"
              height="100"
              width="100"
              src={images.otarj}
              alt="Arjun"
            />
          </div>

          <span className={style["team-member-role"]}>
            Co-Founder <br />
            &amp; CTO
          </span>
          <div className={style["team-member-name-desc"]}>
            <h3 className={style["team-member-name"]}>
              Arjun <br />
              Reddy
            </h3>
            <p className={style["team-member-desc"]}>
              Arjun fancies a role like Prometheus. Simply put, he makes
              technology that only Billion dollar conglomerates take advantage
              of, to the realm of startups. He has helped more than 100%+
              startups, ranging from gaming to finance, to create their vision
              and become market leaders.
            </p>
          </div>
        </article>
        <article className={style["team-member"]}>
          <div className={style["team-member-img"]}>
            <Image
              layout="responsive"
              height="100"
              width="100"
              src={images.otkam}
              alt="Kameshwaran"
            />
          </div>

          <span className={style["team-member-role"]}>
            Co-Founder <br />
            &amp; COO
          </span>
          <div className={style["team-member-name-desc"]}>
            <h3 className={style["team-member-name"]}>
              Kameshwaran <br />
              Elangovan
            </h3>
            <p className={style["team-member-desc"]}>
              Coming from the traditional IT startup world, Kamesh founded a
              company during his college years and grew it up to be 400+ strong.
              He has executed 50+ of the most complex crypto project launches
              for our R&amp;D partners so that their communities trust their
              roadmaps.
            </p>
          </div>
        </article>
        <article className={style["team-member"]}>
          <div className={style["team-member-img"]}>
            <Image
              layout="responsive"
              height="100"
              width="100"
              src={images.otsan}
              alt="Sandrina"
            />
          </div>

          <span className={style["team-member-role"]}>
            Vice <br />
            President
          </span>
          <div className={style["team-member-name-desc"]}>
            <h3 className={style["team-member-name"]}>
              Sandrina <br />
              Paula
            </h3>
            <p className={style["team-member-desc"]}>
              Sandrina is the new age millennial, fashion trendsetter who is a
              crypto geek herself. She has worked on some of the most
              interesting brands such as Fedex, HCL, Four Seasons, Sky+ for
              Business Development &amp; as a Human Resource Strategist. At
              GuardianLink she is focussed on International Brand Partnerships.
            </p>
          </div>
        </article>
      </section>
    </section>
  );
};

export default OurTeam;
