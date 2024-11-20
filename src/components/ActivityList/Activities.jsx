import { useState } from "react";
import EducationalActivities from "./Educational/EducationalActivities";
import EntertainmentActivities from "./Entertainment/EntertainmentActivities";
import "../../styles/activities.css";

export default function Activities() {
  const [activeTab, setActiveTab] = useState("educational");

  return (
    <div className="activities_container">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={`${
            activeTab === "educational" ? "active-tab" : ""
          } activity_active_btn`}
          onClick={() => setActiveTab("educational")}
        >
          Educational Activities
        </button>
        <button
          className={`${
            activeTab === "entertainment" ? "active-tab" : ""
          } activity_active_btn`}
          onClick={() => setActiveTab("entertainment")}
        >
          Entertainment Activities
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab_content">
        {activeTab === "educational" ? (
          <EducationalActivities />
        ) : (
          <EntertainmentActivities />
        )}
      </div>
    </div>
  );
}
