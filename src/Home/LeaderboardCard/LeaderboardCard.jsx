import React, { useState } from "react";
import "./LeaderboardCard.css";

const LeaderboardCard = ({ groupPoints }) => {
  const [activeTab, setActiveTab] = useState("today");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Calculate percentage based on top scorer's points
  const calculatePercentage = (points, maxPoints) => {
    if (!maxPoints || maxPoints === 0) return 0;
    return Math.round((points / maxPoints) * 100);
  };

  // Get data for active tab
  const leaderboardData = groupPoints[activeTab] || [];
  const maxPoints = leaderboardData.length > 0 ? Math.max(...leaderboardData.map(item => item.totalPoints)) : 0;

  // Map data to include percentage and placeholder image
  const formattedData = leaderboardData.map((item, index) => ({
    id: index + 1,
    name: item.name,
    points: item.totalPoints || 0,
    percentage: calculatePercentage(item.totalPoints, maxPoints),
    image: item.profilePicture || "/profile/blank.png", // Use profilePicture from backend
  }));

  return (
    <div className="leaderboardCard">
      <div className="lboard_section">
        <div className="lboard_tabs">
          <div className="tabs">
            <ul>
              <li
                className={activeTab === "today" ? "active" : ""}
                onClick={() => handleTabClick("today")}
              >
                Today
              </li>
              <li
                className={activeTab === "week" ? "active" : ""}
                onClick={() => handleTabClick("week")}
              >
                Week
              </li>
              <li
                className={activeTab === "month" ? "active" : ""}
                onClick={() => handleTabClick("month")}
              >
                Month
              </li>
            </ul>
          </div>
        </div>
        <div className="lboard_wrap">
          <div className={`lboard_item ${activeTab}`}>
            {formattedData.length === 0 ? (
              <div className="no-data">No points for this period.</div>
            ) : (
              formattedData.map((item) => (
                <div className="lboard_mem" key={item.id}>
                  <div className="img">
                    <img src={item.image} alt={`picture_${item.id}`} />
                  </div>
                  <div className="name_bar">
                    <p>
                      <span>{item.id}.</span> {item.name}
                    </p>
                    <div className="bar_wrap">
                      <div
                        className="inner_wrap"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="points">{item.points} points</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;