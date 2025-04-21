import { FiThumbsUp, FiMoreHorizontal, FiShare } from "react-icons/fi";
import "./FeedCard.css";

const FeedCard = ({ name, username, type, time, points }) => {
  return (
    <div className="feedCard">
      <div className="cardUserData">
      <h3>{name || "Full Name"}</h3>
        <h5>{username ? `@${username}` : "@username"}</h5>
      </div>

      <div className="exerciseData">
        <h4>{time || "N/A"}</h4>
        <p>{type || "Workout"}</p>
        <p>{points !== null ? `${points} points` : "0 points"}</p>
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
  );
};

export default FeedCard;
