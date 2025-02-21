import { useState, useEffect } from "react";
import { BiBookAlt } from "react-icons/bi";
import { PiVideoBold } from "react-icons/pi";
import "../../../../styles/recordedtime.css";

function RecordedTime() {
  const [studyTime, setStudyTime] = useState(0); // Time in minutes
  const [entertainmentTime, setEntertainmentTime] = useState(0);
  // const [isTracking, setIsTracking] = useState(false);

  // Load time from localStorage when component mounts
  useEffect(() => {
    const savedStudyTime = localStorage.getItem("studyTime");
    const savedEntertainmentTime = localStorage.getItem("entertainmentTime");

    if (savedStudyTime) setStudyTime(parseInt(savedStudyTime, 10));
    if (savedEntertainmentTime)
      setEntertainmentTime(parseInt(savedEntertainmentTime, 10));
  }, []);

  // Function to start tracking time
  // function startTracking() {
  //   setIsTracking(true);
  // }

  // Increment the time every minute
  useEffect(() => {
    // if (!isTracking) return;

    const interval = setInterval(() => {
      setStudyTime((prevTime) => {
        const newTime = prevTime + 1;
        localStorage.setItem("studyTime", newTime); // Save progress
        return newTime;
      });

      setEntertainmentTime((prevTime) => {
        const newTime = prevTime + 1;
        localStorage.setItem("entertainmentTime", newTime); // Save progress
        return newTime;
      });
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  });

  // Format minutes to "Xh Ym"
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }

  return (
    <div className="recordedtime_container">
      <div className="time_tab">
        <div className="timer_label">
          <h4>Study Time</h4>
          <BiBookAlt />
        </div>
        <p>{formatTime(studyTime)}</p>
      </div>

      <div className="time_tab">
        <div className="timer_label">
          <h4>Entertainment Time</h4>
          <PiVideoBold />
        </div>
        <p>{formatTime(entertainmentTime)}</p>
      </div>

      {/* <button onClick={startTracking} className="start-btn">
        Start Tracking
      </button> */}
    </div>
  );
}

export default RecordedTime;
