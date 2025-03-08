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
            <p>Spend 20 seconds in educational activities</p>
            <p className="rewardlabel">
              <em>Unlocks Dark Theme</em>
            </p>
          </div>
        </div>

        <div className="achievementCard">
          <div className="achievementIcon">
            <SiApostrophe />
          </div>
          <div className="achievementText">
            <strong>Enlightment Explorer</strong>
            <p>Spend 5 minutes in educational activities</p>
            <p className="rewardlabel">
              <em>Unlocks Pastel Theme</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AchievementTab;
