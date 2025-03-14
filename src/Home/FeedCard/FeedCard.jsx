import { FiThumbsUp, FiMoreHorizontal, FiShare } from "react-icons/fi";

const FeedCard = () => {
  return (
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
  );
};

export default FeedCard;
