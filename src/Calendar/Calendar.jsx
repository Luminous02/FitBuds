import React, { useEffect, useState, useRef } from "react";
import "./Calendar.css";

const Calendar = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [eventsArr, setEventsArr] = useState([
        {
            day: 5,
            month: new Date().getMonth() + 1, // Adjust month to be 1-based
            year: new Date().getFullYear(),
            title: "Team Meeting",
            time: "10:00 - 11:00 AM",
        },
        {
            day: 12,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            title: "Project Deadline",
            time: "5:00 PM",
        },
        {
            day: 20,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            title: "Client Presentation",
            time: "2:00 - 3:30 PM",
        },
        {
            day: new Date().getDate(), // Today
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            title: "Morning Coffee",
            time: "9:00 AM",
        },
        {
            day: 7,
            month: (new Date().getMonth() + 2) % 13 === 0 ? 1 : (new Date().getMonth() + 2) % 13, // Example for next month
            year: (new Date().getMonth() + 2) > 12 ? new Date().getFullYear() + 1 : new Date().getFullYear(),
            title: "New Month Event",
            time: "All Day",
        },
    ]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);

    const todayBtnRef = useRef(null);
    const dateInputRef = useRef(null);
    const gotoBtnRef = useRef(null);
    const daysContainerRef = useRef(null);
    const dateElementRef = useRef(null);
    const eventsContainerRef = useRef(null);

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December",
    ];

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const initCalendar = () => {
        const daysContainer = daysContainerRef.current;
        const dateElement = dateElementRef.current;

        if (!daysContainer || !dateElement) {
            return;
        }

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const day = firstDay.getDay();
        const nextDays = 7 - lastDay.getDay() - 1;

        dateElement.innerHTML = `${months[month]} ${year}`;

        let days = "";

        for (let x = day; x > 0; x--) {
            days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
        }

        for (let i = 1; i <= lastDate; i++) {
            let event = eventsArr.some(event => event.day === i && event.month === month + 1 && event.year === year);
            let isActive = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            days += `<div class="day ${event ? "event" : ""} ${isActive ? "active" : ""}" data-day="${i}">${i}</div>`;
        }

        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="day next-date">${j}</div>`;
        }

        daysContainer.innerHTML = days;

        daysContainer.querySelectorAll('.day').forEach(dayElement => {
            dayElement.addEventListener('click', () => {
                const day = parseInt(dayElement.dataset.day); // Get the day from data-day
                if (!isNaN(day)) {
                    handleDayClick(day);
                }
            });
        });
    };

    const gotoDate = () => {
        const dateInput = dateInputRef.current;
        if (!dateInput) return;

        const dateArr = dateInput.value.split("/");
        if (dateArr.length === 2) {
            const enteredMonth = parseInt(dateArr[0]);
            const enteredYear = parseInt(dateArr[1]);
            if (enteredMonth > 0 && enteredMonth < 13 && dateArr[1].length === 4 && !isNaN(enteredMonth) && !isNaN(enteredYear)) {
                setMonth(enteredMonth - 1);
                setYear(enteredYear);
                return;
            }
        }
        alert("invalid date");
    };

    useEffect(() => {
        initCalendar();

        const todayBtn = todayBtnRef.current;
        const dateInput = dateInputRef.current;
        const gotoBtn = gotoBtnRef.current;

        if (todayBtn) {
            todayBtn.addEventListener("click", () => {
                const today = new Date();
                setMonth(today.getMonth());
                setYear(today.getFullYear());
            });
        }

        if (dateInput) {
            dateInput.addEventListener("keyup", (e) => {
                dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
                if (dateInput.value.length === 2) {
                    dateInput.value += "/";
                }
                if (dateInput.value.length > 7) {
                    dateInput.value = dateInput.value.slice(0, 7);
                }
                if (e.inputType === "deleteContentBackward") {
                    if (dateInput.value.length === 3) {
                        dateInput.value = dateInput.value.slice(0, 2);
                    }
                }
            });
        }

        if (gotoBtn) {
            gotoBtn.addEventListener("click", gotoDate);
        }

        // Cleanup event listeners when the component unmounts
        return () => {
            if (todayBtn) {
                todayBtn.removeEventListener("click", () => {});
            }
            if (dateInput) {
                dateInput.removeEventListener("keyup", () => {});
            }
            if (gotoBtn) {
                gotoBtn.removeEventListener("click", gotoDate);
            }
        };
    }, [month, year, eventsArr]); // Re-run effect when month, year, or events change

    useEffect(() => {
        const eventsOnSelectedDate = eventsArr.filter(
            (event) =>
                event.day === selectedDate.getDate() &&
                event.month === selectedDate.getMonth() + 1 &&
                event.year === selectedDate.getFullYear()
        );
        setEventsForSelectedDate(eventsOnSelectedDate);
    }, [selectedDate, eventsArr]);

    const handleDayClick = (day) => {
        const clickedDate = new Date(year, month, day);
        setSelectedDate(clickedDate);
    };

    const getDayOfWeek = (date) => {
        return daysOfWeek[date.getDay()];
    };

    return (
        <div className="container">
            <div className="left">
                <div className="calendar">
                    <div className="month">
                        <i className="fa fa-angle-left prev" onClick={() => setMonth(month - 1)}></i>
                        <div className="date" ref={dateElementRef}></div>
                        <i className="fa fa-angle-right next" onClick={() => setMonth(month + 1)}></i>
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
                
                    <div className="days" ref={daysContainerRef}>
                    </div>
                    <div className="goto-today">
                        <div className="goto">
                            <input type="text" placeholder="mm/yyyy" className="date-input" ref={dateInputRef}/>
                            <button className="goto-btn" ref={gotoBtnRef}>Go</button>
                        </div>
                        <button className="today-btn" ref={todayBtnRef}>Today</button>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="today-date">
                    <div className="event-day">{getDayOfWeek(selectedDate)}</div>
                    <div className="event-date">{selectedDate.getDate()} {months[selectedDate.getMonth()]}{" "} {selectedDate.getFullYear()}</div>
                </div>
                <div className="events" ref={eventsContainerRef}>
                    {eventsForSelectedDate.length > 0 ? (
                        eventsForSelectedDate.map((event, index) => (
                            <div key={index} className="event">
                                <div className="title">
                                    <i className="fas fa-circle"></i>
                                    <h3 className="event-title">{event.title}</h3>
                                </div>
                                <div className="event-time">{event.time}</div>
                            </div>
                        ))
                    ) : (
                        <p className="no-event">No events on this day.</p>
                    )}
                </div>
                <div className="add-event-wrapper">
                    <div className="add-event-header">
                        <div className="title">Add Event</div>
                        <i className="fas fa-times close"></i>
                    </div>
                    <div className="add-event-body">
                        <div className="add-event-input">
                            <input type="text" placeholder="Event Name" className="event-name"/>
                        </div>
                        <div className="add-event-input">
                            <input type="text" placeholder="Event Time From" className="event-time-from"/>
                        </div>
                        <div className="add-event-input">
                            <input type="text" placeholder="Event Time To" className="event-time-to"/>
                        </div>
                    </div>
                    <div className="add-event-footer">
                        <button className="add-event-btn">Add Event</button>
                    </div>
                </div>
            </div>
            <button className="add-event">
                <i className="fas fa-plus"></i>
            </button>
        </div>
    );
};

export default Calendar;