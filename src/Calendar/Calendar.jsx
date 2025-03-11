import React from "react";
import "./Calendar.css";

const Calendar = () => {

    const calendar = document.querySelector(".calendar");
    const date = document.querySelector(".date");
    const daysContainer = document.querySelector(".days");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const todayBtn = document.querySelector(".today-btn");
    const gotoBtn = document.querySelector(".goto-btn");
    const dateInput = document.querySelector(".date-input");
    const eventDay = document.querySelector(".event-day");
    const eventDate = document.querySelector(".event-date");
    const eventsContainer = document.querySelector(".events");
    const addEventSubmit = document.querySelector(".add-event-btn");

    let today = new Date();
    let activeDay;
    let month = today.getMonth();
    let year = today.getFullYear();

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

    //set an empty array
    let eventsArr = [];

    //call get events
    getEvents();

    //function to add days
    function initCalendar() {
        //to get prev month days and current month all days and rem next month days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const day = firstDay.getDay();
        const nextDays = 7 - lastDay.getDay() - 1;

        //update date top of calendar
        date.innerHTML = months[month] + " " + year;

        //adding days on dom
        let days = "";

        //prev month days
        for(let x = day; x > 0; x--) {
            days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
        }

        //current month days
        for(let i = 1; i <= lastDate; i++) {
            //check if event present on current day
            let event = false;
            eventsArr.forEach((eventObj) => {
                if(eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
                    //if event found
                    event = true;
                }
            });

            //if day is today add class today
            if(i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
                activeDay = i;
                getActiveDay(i);
                updateEvents(i);

                //if event found also add event class
                //add active on today at startup
                if(event) {
                    days += `<div class="day today active event">${i}</div>`;
                } else {
                    days += `<div class="day today active">${i}</div>`;
                }
            } else { //add remaining days
                if(event) {
                    days += `<div class="day event">${i}</div>`;
                } else {
                    days += `<div class="day">${i}</div>`;
                }
            }
        }

        for(let j = 1; j <= nextDays; j++) {
            days += `<div class="day next-date ">${j}</div>`;
        }

        daysContainer.innerHTML = days;

        //add listener after calendar initialized
        addListener();
    }

    initCalendar();

    //prev month
    function prevMonth() {
        month--;
        if(month < 0) {
            month = 11;
            year--;
        }
        initCalendar();
    }

    //next month
    function nextMonth() {
        month++;
        if(month > 11) {
            month = 0;
            year++;
        }
        initCalendar();
    }

    //add event listenner on prev and next
    prev.addEventListener("click", prevMonth);
    next.addEventListener("click", nextMonth);

    //goto today
    todayBtn.addEventListener("click", () => {
        today = new Date();
        month = today.getMonth();
        year = today.getFullYear();
        initCalendar();
    });

    //goto date
    dateInput.addEventListener("keyup", (e) => {
        //allow only numbers and remove anything else
        dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
        if(dateInput.value.length === 2) {
            //add a slash if two numbers entered
            dateInput.value += "/";
        }
        if(dateInput.value.length > 7) {
            //don't allow more than 7 characters
            dateInput.value = dateInput.value.slice(0, 7);
        }
        //if backspace pressed
        if(e.inputType === "deleteContentBackward") {
            if(dateInput.value.length === 3) {
                dateInput.value = dateInput.value.slice(0, 2);
            }
        }
    });

    gotoBtn.addEventListener("click", gotoDate);

    //function to go to entered date
    function gotoDate() {
        const dateArr = dateInput.value.split("/");
        //date validation
        if(dateArr.length === 2) {
            if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
                month = dateArr[0] - 1;
                year = dateArr[1];
                initCalendar();
                return;
            }
        }
        //if invalid date
        alert("invalid date");
    }

    const addEventBtn = document.querySelector(".add-event");
    const addEventContainer = document.querySelector(".add-event-wrapper");
    const addEventCloseBtn = document.querySelector(".close");
    const addEventTitle = document.querySelector(".event-name");
    const addEventFrom = document.querySelector(".event-time-from");
    const addEventTo = document.querySelector(".event-time-to");

    addEventBtn.addEventListener("click", () => {
        addEventContainer.classList.toggle("active");
    });
    addEventCloseBtn.addEventListener("click", () => {
        addEventContainer.classList.remove("active");
    });
    
    document.addEventListener("click", (e) => {
        //if click outside
        if(e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
            addEventContainer.classList.remove("active");
        }
    });
    
    //allow only 50 characters in title
    addEventTitle.addEventListener("input", (e) => {
        addEventTitle.value = addEventTitle.value.slice(0, 50);
    });

    //time format in from time
    addEventFrom.addEventListener("input", (e) => {
        //remove anything else numbers
        addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
        //if two numbers entered auto add :
        if(addEventFrom.value.length === 2) {
            addEventFrom.value += ":";
            }
        //don't let user enter more than 5 characters
        if(addEventFrom.value.length > 5) {
            addEventFrom.value = addEventFrom.value.slice(0, 5);
        }
    });

    //time format to time
    addEventTo.addEventListener("input", (e) => {
        //remove anything else numbers
        addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
        //if two numbers entered auto add :
        if(addEventTo.value.length === 2) {
            addEventTo.value += ":";
        }
        //don't let user enter more than 5 characters
        if(addEventTo.value.length > 5) {
            addEventTo.value = addEventTo.value.slice(0, 5);
        }
    });

    //creating a function to add listner on days after entered
    function addListener() {
        const days = document.querySelectorAll(".day");
        days.forEach((day) => {
            day.addEventListener("click", (e) => {
                //set current day as active day
                activeDay = Number(e.target.innerHTML);

               //call active day after click
                getActiveDay(e.target.innerHTML);
                updateEvents(Number(e.target.innerHTML));

                //remove active from already active day
                days.forEach((day) => {
                   day.classList.remove("active");
                });

                //if prev month day clicked goto prev month and add active
                if(e.target.classList.contains("prev-date")) {
                    prevMonth();

                    setTimeout(() => {
                        //select all days of that month
                        const days = document.querySelectorAll(".day");

                       //after going to prev month and active to clicked
                       days.forEach((day) => {
                            if(!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML) {
                                day.classList.add("active");
                            }
                        });
                    }, 100);
                } else if(e.target.classList.contains("next-date")) {
                    nextMonth();

                    setTimeout(() => {
                        //select all days of that month
                        const days = document.querySelectorAll(".day");

                        //after going to prev month and active to clicked
                        days.forEach((day) => {
                            if(!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML) {
                                day.classList.add("active");
                            }
                        });
                    }, 100);
                } else {
                    //remaining current month days
                    e.target.classList.add("active");
                }
            });
        });
    }

    //a function that shows active day events and date at top
    function getActiveDay(date) {
        const day = new Date(year, month, date);
        const dayName = day.toString().split(" ")[0];
        eventDay.innerHTML = dayName;
        eventDate.innerHTML = date + " " + months[month] + " " + year;
    }

    //function to show events of that day
    function updateEvents(date) {
        let events = "";
        eventsArr.forEach((event) => {
           //get events of active day only
            if(date === event.day && month + 1 === event.month && year === event.year) {
                //show event on document
                event.events.forEach((event) => {
                    events += `
                    <div class="event">
                        <div class="title">
                            <i class="fas fa-circle"></i>
                           <h3 class="event-title">${event.title}</h3>
                        </div>
                        <div class="event-time">
                            <span class="event-time">${event.time}</span>
                        </div>
                    </div>
                    `;
                });
            }
        });

        //if nothing found
        if((events === "")) {
            events = `
            <div class="no-event">
                <h3>No Events</h3>
            </div>`;
        }

        eventsContainer.innerHTML = events;

        //save events when update event called
        saveEvents();
    }

    //function to add events
    addEventSubmit.addEventListener("click", () => {
        const eventTitle = addEventTitle.value;
        const eventTimeFrom = addEventFrom.value;
        const eventTimeTo = addEventTo.value;

        //some validations
        if(eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
            alert("Please fill all the fields");
            return;
        }

        const timeFromArr = eventTimeFrom.split(":");
        const timeToArr = eventTimeTo.split(":");

        if(
            timeFromArr.length !== 2 ||
            timeToArr.length !== 2 ||
            timeFromArr[0] > 23 ||
            timeFromArr[1] > 59 ||
            timeToArr[0] > 23 ||
            timeToArr[1] > 59
        ) {
            alert("Invalid Time Format");
        }

        const timeFrom = convertTime(eventTimeFrom);
        const timeTo = convertTime(eventTimeTo);

        const newEvent = {
            title: eventTitle,
            time: timeFrom + " - " + timeTo,
        };

        let eventAdded = false;
        //check if eventsArr not empty
        if(eventsArr.length > 0) {
            //check if current day has already any event then add to that
            eventsArr.forEach((item) => {
                if(item.day === activeDay && item.month === month + 1 && item.year === year) {
                    item.events.push(newEvent);
                    eventAdded = true;
                }
            });
        }

        //if event array empty or current day has no event create new
        if(!eventAdded) {
            eventsArr.push({
                day: activeDay,
                month: month + 1,
                year: year,
                events: [newEvent],
            });
        }

        //remove active form add event form
        addEventContainer.classList.remove("active");
        //clear the fields
        addEventTitle.value = "";
        addEventFrom.value = "";
        addEventTo.value = "";

        //show current added event
        updateEvents(activeDay);

        //add event class to newly added day if not already
        const activeDayElem = document.querySelector(".day.active");
        if(!activeDayElem.classList.contains("event")) {
            activeDayElem.classList.add("event");
        }
    });

    function convertTime(time) {
        let timeArr = time.split(":");
        let timeHour = timeArr[0];
        let timeMin = timeArr[1];
        let timeFormat = timeHour >= 12 ? "PM" : "AM";
        timeHour = timeHour % 12 || 12;
        time = timeHour + ":" + timeMin + " " + timeFormat;
        return time;
    }

    //a function that removes events on click
    eventsContainer.addEventListener("click", (e) => {
        if(e.target.classList.contains("event")) {
            const eventTitle = e.target.children[0].children[1].innerHTML;
    
            //get the title of event then search in array by title and delete
            eventsArr.forEach((event) => {
                if(event.day === activeDay && event.month === month + 1 && event.year === year) {
                    event.events.forEach((item, index) => {
                        if(item.title === eventTitle) {
                            event.events.splice(index, 1);
                        }
                    });
                    //if no event remaining on that day remove complete day
                    if(event.events.length === 0) {
                        eventsArr.splice(eventsArr.indexOf(event), 1);
    
                        //after remove complete day also remove active class of that day
                        const activeDayElem = document.querySelector(".day.active");
                        if(activeDayElem.classList.contains("event")) {
                            activeDayElem.classList.remove("event");
                        }
                    }
                }
            });
            //after removing from array update event
            updateEvents(activeDay);
        }
    });

    //function to store events in local storage get from there
    function saveEvents() {
        localStorage.setItem("events", JSON.stringify(eventsArr));
    }
    
    function getEvents() {
        if(localStorage.getItem("events" === null)) {
            return;
        }
        eventsArr.push( ... JSON.parse(localStorage.getItem("events")));
    }

    return (
        <div class="container">
            <div class="left">
                <div class="calendar">
                    <div class="month">
                        <i class="fa fa-angle-left prev"></i>
                        <div class="date"></div>
                        <i class="fa fa-angle-right next"></i>
                    </div>
                   <div class="weekdays">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                
                    <div class="days">
                    </div>
                    <div class="goto-today">
                        <div class="goto">
                            <input type="text" placeholder="mm/yyyy" class="date-input" />
                            <button class="goto-btn">Go</button>
                        </div>
                        <button class="today-btn">Today</button>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="today-date">
                    <div class="event-day">Wed</div>
                    <div class="event-date">29 March 2025</div>
                </div>
                <div class="events">
                </div>
                <div class="add-event-wrapper">
                    <div class="add-event-header">
                        <div class="title">Add Event</div>
                        <i class="fas fa-times close"></i>
                    </div>
                    <div class="add-event-body">
                        <div class="add-event-input">
                            <input type="text" placeholder="Event Name" class="event-name"/>
                        </div>
                        <div class="add-event-input">
                            <input type="text" placeholder="Event Time From" class="event-time-from"/>
                        </div>
                        <div class="add-event-input">
                            <input type="text" placeholder="Event Time To" class="event-time-to"/>
                        </div>
                    </div>
                    <div class="add-event-footer">
                        <button class="add-event-btn">Add Event</button>
                    </div>
                </div>
            </div>
            <button class="add-event">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    );
};

export default Calendar;