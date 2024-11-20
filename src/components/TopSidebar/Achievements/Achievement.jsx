/* eslint-disable react/prop-types */
import { GrAchievement } from "react-icons/gr";
import "../../../styles/achievement.css";

function Achievement({ handleClick }) {
  return (
    <div className="achievement_tab" onClick={handleClick}>
      <div className="achievement_text">
        <h4>Achievements</h4>
        <span>
          <GrAchievement />
        </span>
      </div>
      <p>Check out the exciting rewards!</p>
    </div>
  );
}

export default Achievement;
