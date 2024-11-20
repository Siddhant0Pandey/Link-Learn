import "../../../styles/achievementTab.css";
import { FaTrophy } from "react-icons/fa";
import { SiApostrophe } from "react-icons/si";

function AchievementTab() {
  return (
    <div className="achievementTab_container">
      <div className="achievementTab_header">
        <h3>Achievements</h3>
      </div>
      <div className="achievementTab_list">
        <div className="achievementCard">
          <div className="achievementIcon">
            <FaTrophy />
          </div>
          <div className="achievementText">
            <strong>Educational Enthusiast</strong>
            <p>Spend 3 hours in educational activities</p>
          </div>
        </div>

        <div className="achievementCard">
          <div className="achievementIcon">
            <SiApostrophe />
          </div>
          <div className="achievementText">
            <strong>Entertainment Explorer</strong>
            <p>Spend 2 hours in entertainment activities</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AchievementTab;
