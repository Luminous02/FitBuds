import React from "react";
import "./Home.css";
import { FiThumbsUp, FiMoreHorizontal, FiShare } from "react-icons/fi";
import FeedCard from "./FeedCard/FeedCard.jsx";

const Home = () => {
  return (
    <div className="homeContainer">
      <h1>Feed</h1>
      <div className="gradientBlock"></div>
      <div className="feedScroll">
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
      <h1>Leaderboard</h1>
      <div className="leaderScroll"></div>
    </div>
  );
};

export default Home;
