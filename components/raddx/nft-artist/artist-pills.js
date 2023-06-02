import style from "./style.module.scss";

const AritstPills = ({ title, value }) => {
  return (
    <div className={style["artist-pill"]}>
      {/* <img src={guardianImg} alt="artist logo" /> */}
      <div>
        <div className={`${style["pill-title"]} text-secondary`}>{title}</div>
        <div className={style["pill-value"]}>{value}</div>
      </div>
    </div>
  );
};

export default AritstPills;
