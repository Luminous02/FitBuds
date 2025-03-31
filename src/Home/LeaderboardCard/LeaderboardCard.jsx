import "./LeaderboardCard.css";

const LeaderboardCard = () => {
  return (
    <div className="leaderboardCard">
      <div className="lboard_section">
        <div className="lboard_tabs">
          <div className="tabs">
            <ul>
              <li className="active" data-li="today">Today</li>
              <li data-li="week">Week</li>
              <li data-li="month">Month</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
