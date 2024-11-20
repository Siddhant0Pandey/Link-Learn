import Achievement from "../components/TopSidebar/Achievements/Achievement";
import SinceLoginTime from "../components/Timer/SinceLoginTime";
import "../styles/page.css";
import RecordedTime from "../components/TopSidebar/Achievements/TotalRecordedTime/RecordedTime";
import TodoList from "../components/TodoList/TodoList";
import Activities from "../components/ActivityList/Activities";
import Quoteoftheday from "../components/QuoteList/Quoteoftheday";
import { useState } from "react";
import AchievementTab from "../components/TopSidebar/Achievements/AchievementTab";

function Hero() {
  const [showaAchievementTab, setShowAchievementTab] = useState(true);

  function handleClick() {
    setShowAchievementTab(!showaAchievementTab);
  }
  return (
    <>
      {" "}
      <div className="main_content">
        <div className="main_top">
          <SinceLoginTime />
        </div>
        <div className="main_bottom">
          {showaAchievementTab ? <Activities /> : <AchievementTab />}
        </div>
      </div>
      <div className="sidebar_item sidebar_item1">
        <Achievement handleClick={handleClick} />
        <RecordedTime />
      </div>
      <div className="sidebar_item">
        <TodoList />
      </div>
      <div className="sidebar_item sidebar_item3">
        <Quoteoftheday />
      </div>
    </>
  );
}

export default Hero;
