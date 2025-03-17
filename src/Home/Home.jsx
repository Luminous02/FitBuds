import React from "react";
import "./Home.css";
import FeedCard from "./FeedCard/FeedCard.jsx";
import LeaderboardCard from "./LeaderboardCard/LeaderboardCard.jsx";

const Home = () => {
  return (
    <div className="homeContainer">
      <h1 id="feedTitle">Feed</h1>
      <div className="feedScroll">
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
      <h1 id="leaderTitle">Leaderboard</h1>
      <div className="leaderScroll">
        <ol>
          <li>
            <LeaderboardCard />
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
