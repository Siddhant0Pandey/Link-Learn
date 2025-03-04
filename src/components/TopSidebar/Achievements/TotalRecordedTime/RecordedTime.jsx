import { useEffect, useState } from "react";
import "./RecordedTime.css";
import { BiBookAlt } from "react-icons/bi";
import { PiVideoLight } from "react-icons/pi";

const RecordedTime = () => {
  const [studyTime, setStudyTime] = useState(0);
  const [entertainmentTime, setEntertainmentTime] = useState(0);

  // Function to fetch recorded times from the backend
  const fetchRecordedTimes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const studyResponse = await fetch(
        "http://localhost:3000/eduactivity/link",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const entResponse = await fetch(
        "http://localhost:3000/entactivity/link",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const studyData = await studyResponse.json();
      const entData = await entResponse.json();

      if (Array.isArray(studyData)) {
        setStudyTime(
          studyData.reduce((sum, record) => sum + record.timeSpent, 0)
        );
      }
      if (Array.isArray(entData)) {
        setEntertainmentTime(
          entData.reduce((sum, record) => sum + record.timeSpent, 0)
        );
      }
    } catch (error) {
      console.error("Error fetching recorded time:", error);
    }
  };

  useEffect(() => {
    fetchRecordedTimes();
  }, []);

  // Function to format time (seconds to hours & minutes)
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? hours + "h " : ""}${minutes}min`;
  };

  return (
    <div className="recorded-time-container">
      <div className="timing-box">
        <div className="time_label">
          <p>Study Time </p>
          <span className="recorded_icon">
            <BiBookAlt />
          </span>
        </div>
        <p>{formatTime(studyTime)}</p>
      </div>
      <div className="timing-box">
        <div className="time_label">
          <p>Entertainment Time </p>
          <span className="recorded_icon">
            <PiVideoLight />
          </span>
        </div>
        <p>{formatTime(entertainmentTime)}</p>
      </div>
    </div>
  );
};

export default RecordedTime;
