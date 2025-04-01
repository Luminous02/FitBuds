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
        <div className="leaderboardGrid">
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
