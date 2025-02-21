import { useState, useEffect } from "react";
import "../../styles/sincelogintime.css";

function SinceLoginTime() {
  const [timeSinceLogin, setTimeSinceLogin] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function updateTime() {
      const loginTime = localStorage.getItem("loginTime");
      if (!loginTime) return;

      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(loginTime, 10);

      const seconds = Math.floor((elapsedTime / 1000) % 60);
      const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
      const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
      const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));

      setTimeSinceLogin({ days, hours, minutes, seconds });
    }

    // Update every second
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="timer-container">
      <div className="timer-block">
        <div className="time-box">
          <p className="time-value">{timeSinceLogin.days}</p>
        </div>
        <div className="label">
          <p className="time-label">Days</p>
        </div>
      </div>
      <div className="timer-block">
        <div className="time-box">
          <p className="time-value">{timeSinceLogin.hours}</p>
        </div>
        <div className="label">
          <p className="time-label">Hours</p>
        </div>
      </div>
      <div className="timer-block">
        <div className="time-box">
          <p className="time-value">{timeSinceLogin.minutes}</p>
        </div>
        <div className="label">
          <p className="time-label">Minutes</p>
        </div>
      </div>
      <div className="timer-block">
        <div className="time-box">
          <p className="time-value">{timeSinceLogin.seconds}</p>
        </div>
        <div className="label">
          <p className="time-label">Seconds</p>
        </div>
      </div>
    </div>
  );
}

export default SinceLoginTime;
