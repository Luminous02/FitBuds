import React, { useState } from "react";
import "./LeaderboardCard.css";

const LeaderboardCard = () => {

  const [activeTab, setActiveTab] = useState('today');
  const leaderboardData = {
    today: [
      { id: 1, name: "Alex Burns", points: 0, percentage: 0, image: "/profile/girl1.png" },
      { id: 2, name: "Jessy Burns", points: 0, percentage: 0, image: "/profile/boy2.png" },
      { id: 3, name: "Kevin Gibson", points: 0, percentage: 0, image: "/profile/boy4.png" },
      { id: 4, name: "Charles Jones", points: 0, percentage: 0, image: "/profile/boy1.png" },
      { id: 5, name: "Sally Jorden", points: 0, percentage: 25, image: "/profile/girl2.png" },
      { id: 6, name: "Mary Smith", points: 0, percentage: 0, image: "/profile/girl3.png" },
      { id: 7, name: "Grey Walker", points: 0, percentage: 0, image: "/profile/boy3.png" },
    ],
    week: [
      { id: 1, name: "Charles Jones", points: 155, percentage: 55, image: "/profile/boy1.png" },
      { id: 2, name: "Jessy Burns", points: 150, percentage: 50, image: "/profile/boy2.png" },
      { id: 3, name: "Alex Burns", points: 147, percentage: 47, image: "/profile/girl1.png" },
      { id: 4, name: "Grey Walker", points: 133, percentage: 33, image: "/profile/boy3.png" },
      { id: 5, name: "Sally Jorden", points: 125, percentage: 25, image: "/profile/girl2.png" },
      { id: 6, name: "Kevin Gibson", points: 114, percentage: 14, image: "/profile/boy4.png" },
      { id: 7, name: "Mary Smith", points: 15, percentage: 5, image: "/profile/girl3.png" },
    ],
    month: [
      { id: 1, name: "Alex Burns", points: 195, percentage: 95, image: "/profile/girl1.png" },
      { id: 2, name: "Charles Jones", points: 186, percentage: 86, image: "/profile/boy1.png" },
      { id: 3, name: "Mary Smith", points: 180, percentage: 80, image: "/profile/girl3.png" },
      { id: 4, name: "Sally Jorden", points: 179, percentage: 79, image: "/profile/girl2.png" },
      { id: 5, name: "Kevin Gibson", points: 170, percentage: 70, image: "/profile/boy4.png" },
      { id: 6, name: "Grey Walker", points: 165, percentage: 65, image: "/profile/boy3.png" },
      { id: 7, name: "Jessy Burns", points: 165, percentage: 65, image: "/profile/boy2.png" },
    ]
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="leaderboardCard">
      <div className="lboard_section">
        <div className="lboard_tabs">
          <div className="tabs">
            <ul>
              <li 
                className={activeTab === "today" ? "active" : ""} 
                onClick={() => handleTabClick("today")}>Today</li>
              <li 
                className={activeTab === "week" ? "active" : ""} 
                onClick={() => handleTabClick("week")}>Week</li>
              <li 
                className={activeTab === "month" ? "active" : ""} 
                onClick={() => handleTabClick("month")}>Month</li>
            </ul>
          </div>
        </div>
        <div className="lboard_wrap">
          <div className={`lboard_item ${activeTab}`}>
            {leaderboardData[activeTab].map((item) => (
              <div className="lboard_mem" key={item.id}>
                <div className="img">
                  <img src={item.image} alt={"picture_${item.id}"} />
                </div>
                <div className="name_bar">
                  <p>
                    <span>{item.id}.</span> {item.name}
                  </p>
                  <div className="bar_wrap">
                    <div className="inner_wrap" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
                <div className="points">{item.points} points</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
