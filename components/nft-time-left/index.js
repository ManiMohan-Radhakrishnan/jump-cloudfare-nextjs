import dayjs from "dayjs";
import ToolTip from "../tooltip";
import { BsFillQuestionCircleFill } from "react-icons/bs";

import NFTCounter from "../nft-counter";
// import style from "./style.module.scss";

const NFTTimeLeft = ({
  title,
  tooltipText,
  isEnded = false,
  time,
  cTime,
  placement,
  handleTimer = () => {},
  handleBeforeEndTimer = () => {},
}) => {
  return (
    <div className={`current-bid nft-time-left`}>
      <div className={"title"}>
        {title}
        <ToolTip
          content={tooltipText}
          icon={
            <BsFillQuestionCircleFill
              size={16}
              className={`ms-2 question-icon`}
            />
          }
          placement={placement ? placement : "right"}
        />
      </div>
      {isEnded ? (
        <div className={"end-date"}>{dayjs(time).format("DD. MM. YYYY")}</div>
      ) : (
        <NFTCounter
          time={time}
          cTime={cTime}
          timeClass="counter-time"
          handleEndEvent={handleTimer}
          handleBeforeEndEvent={handleBeforeEndTimer}
        />
      )}
    </div>
  );
};

export default NFTTimeLeft;
