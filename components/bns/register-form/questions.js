import style from "./style.module.scss";

const QuestionsSection = () => {
  return (
    <>
      <section className={`${style["question-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["question-group"]}`}>
                <article>
                  <h3>What is BNS?</h3>
                  <p>
                    BNS is an innovative domain system that simplifies online
                    identity management by providing users with a single domain
                    that can be used across all online platforms. With BNS,
                    users can easily register, trade domains, and manage their
                    entire online portfolio under one roof. The system offers a
                    wide range of benefits, including human-readable
                    identifiers, Web3 mail, and a variety of top-level domains.
                  </p>
                </article>
                <article>
                  <h3>Why Participate in the BNS Domain Drop?</h3>
                  <p>
                    {`By taking part in the BNS domain drop, you can seize the
                    chance to acquire premium blockchain domain names. These
                    domains can be utilized to showcase your digital assets,
                    promote your brand or even be a valuable investment. So,
                    don't let this exciting opportunity pass you by - join the
                    BNS community today!`}{" "}
                  </p>

                  <p>
                    Complete the aforementioned steps to be eligible for early
                    access to the upcoming BNS domain drop. We are excited to
                    witness the innovative ways you will utilize your new
                    blockchain domain names.{" "}
                  </p>

                  <p>Thank you for participating and best of luck!</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuestionsSection;
