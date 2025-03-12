import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="feedScroll">
        <h1>Feed</h1>
        <div className="feedCard">
          <h3>Full Name</h3>
          <h4>@username</h4>
          <p>
            <h4>34:05</h4> Minute Run
          </p>
          <button>Like</button>
          <button>Share</button>
          <button id="moreButton">More</button>
        </div>

        <div className="feedCard">
          <h3>Full Name</h3>
          <h4>@username</h4>
          <p>
            <h4>34:05</h4> Minute Run
          </p>
          <button>Like</button>
          <button>Share</button>
          <button id="moreButton">More</button>
        </div>

        <div className="feedCard">
          <h3>Full Name</h3>
          <h4>@username</h4>
          <p>
            <h4>34:05</h4> Minute Run
          </p>
          <button>Like</button>
          <button>Share</button>
          <button id="moreButton">More</button>
        </div>

        <div className="feedCard">
          <h3>Full Name</h3>
          <h4>@username</h4>
          <p>
            <h4>34:05</h4> Minute Run
          </p>
          <button>Like</button>
          <button>Share</button>
          <button id="moreButton">More</button>
        </div>
      </div>
      <div className="leaderScroll">
        <h1>Leaderboard</h1>
      </div>
    </div>
  );
};

export default Home;
