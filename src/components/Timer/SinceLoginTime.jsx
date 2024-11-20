import "../../styles/sincelogintime.css";

function SinceLoginTime() {
  return (
    <div className="timer-container">
      <div className="timer-block">
        <div className="time-box">
          <p className="time-value">0</p>
        </div>
        <div className="label">
          <p className="time-label">Days</p>
        </div>
      </div>
      <div className="timer-block">
        <div className="time-box">
          <p className="time-value">02</p>
        </div>
        <div className="label">
          <p className="time-label">Hours</p>
        </div>
      </div>
      <div className="timer-block">
        <div className="time-box">
          <p className="time-value">45</p>
        </div>
        <div className="label">
          <p className="time-label">Minutes</p>
        </div>
      </div>
      <div className="timer-block">
        <div className="time-box">
          <p className="time-value">30</p>
        </div>
        <div className="label">
          <p className="time-label">Seconds</p>
        </div>
      </div>
    </div>
  );
}

export default SinceLoginTime;
