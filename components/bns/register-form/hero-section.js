import style from "./style.module.scss";

const HeroSection = () => {
  return (
    <>
      <section className={`${style["hero-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["question-group"]}`}>
                <article>
                  <h3>BNS Whitelist is Live Now: Join the Excitement</h3>
                  <p>
                    {`We're thrilled to announce that the BNS whitelist is now
                    live! This exclusive whitelist will grant participants early
                    access to the upcoming BNS domain drop, so make sure to
                    follow the steps below to qualify.`}
                  </p>
                </article>
                <article>
                  <h3>How to Qualify for the BNS Whitelist</h3>
                  <p>
                    To qualify for the BNS whitelist, participants must complete
                    the following steps:
                  </p>
                  <ol>
                    <li>
                      Follow us on Twitter: https://twitter.com/Jumptradenft{" "}
                    </li>

                    <li>
                      Join our Discord: https://discord.com/invite/JRWmNb38GW{" "}
                    </li>

                    <li>Join our Telegram: https://t.me/jumptradenft </li>

                    <li>
                      {`Quote Tweet our pinned BNS whitelist announcement on
                      Twitter, including the hashtag #BNSDomains and a brief
                      statement about why you're excited to participate in the
                      drop. Make sure to tag three friends in your retweet as
                      well.`}{" "}
                    </li>
                  </ol>
                  <p>
                    During the whitelist process, all entries will be carefully
                    reviewed for completion of the required steps, including
                    following us on Twitter, joining our Discord and Telegram
                    channels. Any entry that has not completed all of the steps
                    by the end of the process will be disqualified. So make sure
                    to complete all the steps to be eligible for the BNS Domains
                    Whitelist!
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
