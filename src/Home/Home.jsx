import React, { useState, useEffect } from "react";
import "./Home.css";
import FeedCard from "./FeedCard/FeedCard.jsx";
import LeaderboardCard from "./LeaderboardCard/LeaderboardCard.jsx";
import axios from "axios";

const Home = () => {
  const [groupPoints, setGroupPoints] = useState({ today: [], week: [], month: [] });
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = localStorage.getItem("userID");
        if (!userID) {
          throw new Error("User not authenticated");
        }

        // Get user's groupID
        const userResponse = await axios.get(`http://localhost:3000/api/auth/user/${userID}`);
        const groupID = userResponse.data.user.groupID;

        // Fetch group points for all periods
        const periods = ["today", "week", "month"];
        const pointsPromises = periods.map(period =>
          axios.get(`http://localhost:3000/api/workouts/group-points?groupID=${groupID}&period=${period}`)
        );
        const pointsResponses = await Promise.all(pointsPromises);

        const pointsData = pointsResponses.reduce((acc, response, index) => {
          if (response.data.success) {
            acc[periods[index]] = response.data.groupPoints;
          } else {
            throw new Error(response.data.message || `Failed to fetch ${periods[index]} points`);
          }
          return acc;
        }, { today: [], week: [], month: [] });

        // Fetch recent group workouts
        const workoutsResponse = await axios.get(
          `http://localhost:3000/api/workouts/recent-group?groupID=${groupID}&limit=5`
        );

        if (workoutsResponse.data.success) {
          setRecentWorkouts(workoutsResponse.data.workouts);
        } else {
          throw new Error(workoutsResponse.data.message || "Failed to fetch recent workouts");
        }

        setGroupPoints(pointsData);
      } catch (error) {
        setError(error.response?.data?.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homeContainer">
      <h1 id="feedTitle">Feed</h1>
      <div className="feedScroll">
        {loading ? (
          <div className="loading-message">Loading feed...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : recentWorkouts.length === 0 ? (
          <div className="no-workouts">No recent workouts.</div>
        ) : (
          recentWorkouts.map((workout) => (
            <FeedCard
              key={workout.workoutID}
              name={workout.name}
              username={workout.username}
              type={workout.type}
              time={formatTimeDisplay(workout.time)}
              points={workout.points}
            />
          ))
        )}
      </div>
      <h1 id="leaderTitle">Leaderboard</h1>
      <div className="leaderScroll">
        {loading ? (
          <div className="loading-message">Loading leaderboard...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="leaderboardGrid">
            <LeaderboardCard groupPoints={groupPoints} />
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to format time from HH:MM:SS to minutes
function formatTimeDisplay(timeString) {
  if (!timeString) return "N/A";
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + seconds / 60;
  return `${totalMinutes.toFixed(1)} minutes`;
}

export default Home;
