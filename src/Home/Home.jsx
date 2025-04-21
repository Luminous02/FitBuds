import React from "react";
import "./Home.css";
import FeedCard from "./FeedCard/FeedCard.jsx";
import LeaderboardCard from "./LeaderboardCard/LeaderboardCard.jsx";
import axios from "axios";

const Home = () => {
  const [groupPoints, setGroupPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupPoints = async () => {
      try {
        const userID = localStorage.getItem("userID");
        if (!userID) {
          throw new Error("User not authenticated");
        }

        // Get user's groupID
        const userResponse = await axios.get(`http://localhost:3000/api/auth/user/${userID}`);
        const groupID = userResponse.data.user.groupID;

        const response = await axios.get(
          `http://localhost:3000/api/workouts/group-points?groupID=${groupID}`
        );

        if (response.data.success) {
          setGroupPoints(response.data.groupPoints);
        } else {
          setError(response.data.message || "Failed to fetch group points");
        }
      } catch (error) {
        setError(error.response?.data?.message || "Error loading group points");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupPoints();
  }, []);


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
        {loading ? (
          <div className="loading-message">Loading leaderboard...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : groupPoints.length === 0 ? (
          <div className="no-points">No points logged yet.</div>
        ) : (
          <div className="leaderboardGrid">
            {groupPoints.map((member, index) => (
              <LeaderboardCard
                key={member.userID}
                rank={index + 1}
                name={member.name}
                points={member.totalPoints || 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
