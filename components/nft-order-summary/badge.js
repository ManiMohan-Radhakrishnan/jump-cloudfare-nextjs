import ToolTip from "../tooltip";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const Badge = ({ title, value, currency, diff = 0, tooltip }) => {
  return (
    <>
      <div className="title">
        {title}

        {tooltip && (
          <ToolTip
            icon={
              <BsFillQuestionCircleFill size={16} className="ms-2 check-icon" />
            }
            content={tooltip}
            placement="top"
          />
        )}
      </div>
      <div className="value">
        {currency && currency}
        {value}
        {diff > 0 && (
          <>
            {diff > 0 ? (
              <span className="value-diff-range green">
                <BiUpArrowAlt />
                {`${diff}%`}
              </span>
            ) : (
              <span className="value-diff-range red">
                <BiDownArrowAlt />
                {`${diff}%`}
              </span>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Badge;
