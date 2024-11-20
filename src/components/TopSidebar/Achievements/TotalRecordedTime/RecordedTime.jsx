import { BiBookAlt } from "react-icons/bi";
import "../../../../styles/recordedtime.css";
import { PiVideoBold } from "react-icons/pi";

function RecordedTime() {
  return (
    <div className="recordedtime_container">
      <div className="time_tab">
        <div className="timer_label">
          <h4>Study Time</h4>
          <BiBookAlt />
        </div>
        <p>2h 30min</p>
      </div>

      <div className="time_tab">
        <div className="timer_label">
          <h4>Entertainment Time</h4>
          <PiVideoBold />
        </div>
        <p>2h 30min</p>
      </div>
    </div>
  );
}

export default RecordedTime;
