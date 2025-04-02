import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Calendar.css";

const Calendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [eventsArr, setEventsArr] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  useEffect(() => {
    const daysContainer = document.querySelector(".days");
    if (!daysContainer) {
      return;
    }

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

      for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
      }

      for (let i = 1; i <= lastDate; i++) {
        let event = eventsArr.some(
          (event) =>
            event.day === i && event.month === month + 1 && event.year === year
        );
        let isActive =
          i === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear();
        days += `<div class="day ${event ? "event" : ""} ${
          isActive ? "active" : ""
        }" data-day="${i}">${i}</div>`;
      }

      for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
      }

      daysContainer.innerHTML = days;

      daysContainer.querySelectorAll(".day").forEach((dayElement) => {
        dayElement.addEventListener("click", () => {
          const day = parseInt(dayElement.dataset.day); // Get the day from data-day
          if (!isNaN(day)) {
            handleDayClick(day);
          }
        });
      });
    }

    initCalendar();
  }, [month, year, eventsArr]);

  const handleDayClick = (day) => {
    setSelectedDate(new Date(year, month, day));
  };

  const getDayOfWeek = (date) => {
    return daysOfWeek[date.getDay()];
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
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="days"></div>
          <div className="goto-today">
            <div className="goto">
              <input type="text" placeholder="mm/yyyy" className="date-input" />
              <button className="goto-btn">Go</button>
            </div>
            <button className="today-btn">Today</button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="today-date">
          <div className="event-day">{getDayOfWeek(selectedDate)}</div>
          <div className="event-date">
            {selectedDate.getDate()} {months[selectedDate.getMonth()]}{" "}
            {selectedDate.getFullYear()}
          </div>
        </div>
        <div className="events"></div>
        <div className="add-event-wrapper">
          <div className="add-event-header">
            <div className="title">Add Event</div>
            <i className="fas fa-times close"></i>
          </div>
          <div className="add-event-body">
            <div className="add-event-input">
              <input
                type="text"
                placeholder="Event Name"
                className="event-name"
              />
            </div>
            <div className="add-event-input">
              <input
                type="text"
                placeholder="Event Time From"
                className="event-time-from"
              />
            </div>
            <div className="add-event-input">
              <input
                type="text"
                placeholder="Event Time To"
                className="event-time-to"
              />
            </div>
          </div>
          <div className="add-event-footer">
            <button className="add-event-btn">Add Event</button>
          </div>
        </div>
      </div>
      <Link to="/Dashboard/progress" className="add-event">
        <i className="fas fa-plus"></i>
      </Link>
    </div>
  );
};

export default Calendar;
