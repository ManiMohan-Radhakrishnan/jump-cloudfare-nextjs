import { Questions } from "./common";
import FAQAccordian from "./accordian";
import style from "./style.module.scss";
const BnsFaq = () => {
  const faqItems = [...Questions];
  return (
    <>
      <section className={style["faq-section"]}>
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col-12"}>
              <div className={`${style["sec-header"]}`}>
                <h2>Frequently Asked Questions</h2>
              </div>
            </div>
          </div>
        </div>
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col-12"}>
              <div className={style["faq-content-section"]}>
                <div className={style["faq-accordian-section"]}>
                  {faqItems.map((questions) => {
                    return <FAQAccordian key={questions.id} {...questions} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BnsFaq;
