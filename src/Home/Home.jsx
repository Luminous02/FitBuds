import React from "react";
import "./Home.css";
import { FiThumbsUp, FiMoreHorizontal, FiShare } from "react-icons/fi";

const Home = () => {
  return (
    <div className="homeContainer">
      <h1>Feed</h1>
      <div className="gradientBlock"></div>
      <div className="feedScroll">
        <div className="feedCard">
          <div className="cardUserData">
            <h3>Full Name</h3>
            <h5>@username</h5>
          </div>

          <div className="exerciseData">
            <h4>34:05</h4>
            <p>Minute Run</p>
          </div>

          <button id="likeButton">
            <FiThumbsUp />
          </button>
          <button id="shareButton">
            <FiShare />
          </button>
          <button id="moreButton">
            <FiMoreHorizontal />
          </button>
        </div>
        <div className="feedCard">
          <div className="cardUserData">
            <h3>Full Name</h3>
            <h5>@username</h5>
          </div>

          <div className="exerciseData">
            <h4>34:05</h4>
            <p>Minute Run</p>
          </div>

          <button id="likeButton">
            <FiThumbsUp />
          </button>
          <button id="shareButton">
            <FiShare />
          </button>
          <button id="moreButton">
            <FiMoreHorizontal />
          </button>
        </div>
        <div className="feedCard">
          <div className="cardUserData">
            <h3>Full Name</h3>
            <h5>@username</h5>
          </div>

          <div className="exerciseData">
            <h4>34:05</h4>
            <p>Minute Run</p>
          </div>

          <button id="likeButton">
            <FiThumbsUp />
          </button>
          <button id="shareButton">
            <FiShare />
          </button>
          <button id="moreButton">
            <FiMoreHorizontal />
          </button>
        </div>
        <div className="feedCard">
          <div className="cardUserData">
            <h3>Full Name</h3>
            <h5>@username</h5>
          </div>

          <div className="exerciseData">
            <h4>34:05</h4>
            <p>Minute Run</p>
          </div>

          <button id="likeButton">
            <FiThumbsUp />
          </button>
          <button id="shareButton">
            <FiShare />
          </button>
          <button id="moreButton">
            <FiMoreHorizontal />
          </button>
        </div>
        <div className="feedCard">
          <div className="cardUserData">
            <h3>Full Name</h3>
            <h5>@username</h5>
          </div>

          <div className="exerciseData">
            <h4>34:05</h4>
            <p>Minute Run</p>
          </div>

          <button id="likeButton">
            <FiThumbsUp />
          </button>
          <button id="shareButton">
            <FiShare />
          </button>
          <button id="moreButton">
            <FiMoreHorizontal />
          </button>
        </div>
      </div>
      <h1>Leaderboard</h1>
      <div className="leaderScroll"></div>
    </div>
  );
};

export default Home;
