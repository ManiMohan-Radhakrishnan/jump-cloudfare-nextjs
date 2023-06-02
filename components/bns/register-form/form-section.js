import InputText from "../../input-text";
import style from "./style.module.scss";

const RegisterForm = () => {
  return (
    <>
      <section className={`${style["register-form-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["sec-header"]}`}>
                <h2>BNS Whitelist Registration Form</h2>
                <p>
                  Please fill out the following information to participate in
                  the BNS whitelist:
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className={`${style["forms-group"]}`}>
                <InputText
                  compClassName="bns-inputs"
                  placeholder="Email"
                  title="Email Id"
                  name="emailid"
                />
                <InputText
                  compClassName="bns-inputs"
                  placeholder="Twitter"
                  title="Twitter Id"
                  name="twitterid"
                />
                <InputText
                  compClassName="bns-inputs"
                  placeholder="Discord Id"
                  title="Discord Id"
                  name="discordid"
                />
                <InputText
                  compClassName="bns-inputs"
                  placeholder="Telegram Id"
                  title="Telegram Id"
                  name="telegramid"
                />
                <InputText
                  compClassName="bns-inputs"
                  placeholder="twitterlink"
                  title="Please enter your twitter retweet link"
                  name="twitterlink"
                />
                <button className={`btn ${style["theme-btn"]}`}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
