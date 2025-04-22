import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Calendar.css";
import { GiWeightLiftingUp, GiCycle } from "react-icons/gi";
import { FaRunning, FaSwimmer, FaBicycle } from "react-icons/fa";

const Calendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [goToMonthInput, setGoToMonthInput] = useState("");
  const [goToYearInput, setGoToYearInput] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [monthWorkouts, setMonthWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Workout type to icon mapping
  const workoutIcons = {
    "Weight lifting": <GiWeightLiftingUp className="workout-icon" />,
    Running: <FaRunning className="workout-icon" />,
    Swimming: <FaSwimmer className="workout-icon" />,
    Cycling: <FaBicycle className="workout-icon" />,
    HIIT: <GiCycle className="workout-icon" />,
  };

  useEffect(() => {
    fetchMonthWorkouts();
  }, [month, year]);

  useEffect(() => {
    fetchWorkoutsForDate(selectedDate);
  }, [selectedDate]);

  const fetchMonthWorkouts = async () => {
    try {
      const userID = localStorage.getItem("userID");
      if (!userID) return;

      const response = await axios.get(
        `http://localhost:3000/api/workouts/month?userID=${userID}&year=${year}&month=${
          month + 1
        }`
      );

      if (response.data.success) {
        setMonthWorkouts(response.data.workouts);
      }
    } catch (error) {
      console.error("Error fetching month workouts:", error);
    }
  };

  const fetchWorkoutsForDate = async (date) => {
    try {
      setLoading(true);
      const userID = localStorage.getItem("userID");
      if (!userID) return;

      const dateStr = date.toISOString().split("T")[0];
      const response = await axios.get(
        `http://localhost:3000/api/workouts/date?userID=${userID}&date=${dateStr}`
      );

      if (response.data.success) {
        setWorkouts(response.data.workouts);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const daysContainer = document.querySelector(".days");
    if (!daysContainer) return;

    function initCalendar() {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const prevLastDay = new Date(year, month, 0);
      const prevDays = prevLastDay.getDate();
      const lastDate = lastDay.getDate();
      const day = firstDay.getDay();
      const nextDays = 7 - lastDay.getDay() - 1;

      const dateElement = document.querySelector(".date");
      if (dateElement) {
        dateElement.innerHTML = `${months[month]} ${year}`;
      }

      let days = "";

      // Previous month's days
      for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
      }

      // Current month's days
      for (let i = 1; i <= lastDate; i++) {
        const date = new Date(year, month, i);
        const dateStr = date.toISOString().split("T")[0];

        const isToday =
          i === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear();

        const isSelected =
          selectedDate.getDate() === i &&
          selectedDate.getMonth() === month &&
          selectedDate.getFullYear() === year;

        // Check if any workout exists for this date
        const hasWorkout = monthWorkouts.some((workout) => {
          const workoutDate = new Date(workout.date)
            .toISOString()
            .split("T")[0];
          return workoutDate === dateStr;
        });

        days += `<div class="day ${hasWorkout ? "has-workout" : ""} ${
          isToday ? "today" : ""
        } ${isSelected ? "selected" : ""}" data-day="${i}">${i}</div>`;
      }

      // Next month's days
      for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
      }

      daysContainer.innerHTML = days;

      // Add click event listeners to all days
      daysContainer
        .querySelectorAll(".day:not(.prev-date, .next-date)")
        .forEach((dayElement) => {
          dayElement.addEventListener("click", () => {
            const day = parseInt(dayElement.dataset.day);
            if (!isNaN(day)) {
              handleDayClick(day);
              // Update selected class on all days
              daysContainer.querySelectorAll(".day").forEach((dayEl) => {
                dayEl.classList.remove("selected");
              });
              dayElement.classList.add("selected");
            }
          });
        });

      // Scroll to today if in current view
      const today = new Date();
      if (month === today.getMonth() && year === today.getFullYear()) {
        const todayElement = daysContainer.querySelector(".day.today");
        todayElement?.scrollIntoView({ block: "nearest" });
      }
    }

    initCalendar();
  }, [month, year, monthWorkouts, selectedDate]);

  const handleDayClick = (day) => {
    const newSelectedDate = new Date(year, month, day);
    setSelectedDate(newSelectedDate);
  };

  const handleGoToDate = () => {
    const parts = `${goToMonthInput}/${goToYearInput}`.split("/");
    if (parts.length === 2) {
      const inputMonth = parseInt(parts[0]) - 1; // Month is 0-indexed
      const inputYear = parseInt(parts[1]);

      if (!isNaN(inputMonth) && !isNaN(inputYear) && inputMonth >= 0 && inputMonth <= 11) {
        setMonth(inputMonth);
        setYear(inputYear);
      } else {
        alert("Invalid month/year format. Please use MM/YYYY.");
      }
    } else {
      alert("Invalid date format. Please use MM/YYYY.");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="calendar">
          <div className="month">
            <i
              className="fa fa-angle-left prev"
              onClick={() => setMonth(month - 1)}
            ></i>
            <div className="date"></div>
            <i
              className="fa fa-angle-right next"
              onClick={() => setMonth(month + 1)}
            ></i>
          </div>
          <div className="weekdays">
            {daysOfWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="days"></div>
          <div className="goto-today">
            <div className="goto">
            <input
                type="text"
                placeholder="MM"
                className="date-input"
                value={goToMonthInput}
                onChange={(e) => setGoToMonthInput(e.target.value)}
              />
              <span>/</span>
              <input
                type="text"
                placeholder="YYYY"
                className="date-input"
                value={goToYearInput}
                onChange={(e) => setGoToYearInput(e.target.value)}
              />
              <button className="goto-btn" onClick={handleGoToDate}>Go</button>
            </div>
            <button
              className="today-btn"
              onClick={() => {
                const today = new Date();
                setMonth(today.getMonth());
                setYear(today.getFullYear());
                setSelectedDate(today);
              }}
            >
              Today
            </button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="today-date">
          <div className="event-day">{daysOfWeek[selectedDate.getDay()]}</div>
          <div className="event-date">
            {selectedDate.getDate()} {months[selectedDate.getMonth()]}{" "}
            {selectedDate.getFullYear()}
          </div>
        </div>
        <div className="events">
          {loading ? (
            <div className="loading">Loading workouts...</div>
          ) : workouts.length === 0 ? (
            <div className="no-events">No workouts for this day</div>
          ) : (
            workouts.map((workout) => (
              <div key={workout.workoutID} className="workout-item">
                <div className="workout-header">
                  {workoutIcons[workout.type] || (
                    <GiWeightLiftingUp className="workout-icon" />
                  )}
                  <h4>{workout.type}</h4>
                </div>
                {workout.distance && <p>Distance: {workout.distance} miles</p>}
                {workout.time && <p>Duration: {workout.time}</p>}
                {workout.pace && <p>Pace: {workout.pace} min/mile</p>}
                {workout.reps && <p>Reps: {workout.reps}</p>}
              </div>
            ))
          )}
        </div>
      </div>
      <Link to="/Dashboard/progress" className="add-event">
        <i className="fas fa-plus"></i>
      </Link>
    </div>
  );
};

export default Calendar;
