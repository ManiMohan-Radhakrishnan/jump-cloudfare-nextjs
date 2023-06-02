import FlipCountdown from "@rumess/react-flip-countdown";

import { useWindowSize } from "../../utils/useWindowSize";
import style from "./style.module.scss";
const FlipTimer = ({ endTime, handleEndEvent = () => {} }) => {
  const windowSize = useWindowSize();
  return endTime ? (
    <FlipCountdown
      key={`endtime${endTime}`}
      theme={"dark"}
      size={windowSize.width > 560 ? "medium" : "small"}
      titlePosition="bottom"
      dayTitle="Days"
      hourTitle="Hours"
      minuteTitle="Minutes"
      secondTitle="Seconds"
      endAt={endTime}
      onTimeUp={handleEndEvent}
      endAtZero
      hideYear
      hideMonth
    />
  ) : (
    <>
      <h2 className={`${style["tba"]}`}>TBA</h2>
    </>
  );
};

export default FlipTimer;
