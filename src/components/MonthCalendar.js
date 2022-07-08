import React, { useState, useEffect } from "react";
import DayForMonth from "./DayForMonth";
import NewEventForm from "./NewEventForm";

function MonthCalendar() {
  const [dateObjectArray, setDateObjectArray] = useState([]);

  //defaults to current day

  const [dateObject, setDateObject] = useState(new Date());

  //this function gets monthly data for the calendar

  function getMonthCalanderData(date) {
    let today = new Date();
    let firstDayofMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDayofMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let firstDayNameIndex = firstDayofMonth.getDay();
    let lastDayNameIndex = lastDayofMonth.getDay();

    let startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      0 - firstDayNameIndex
    );

    let endDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      6 - lastDayNameIndex
    );

    let tempDate = startDate;
    let dateArray = [];

    while (tempDate < endDate) {
      dateArray.push(tempDate);

      //this is finiky, in order to increase temp date by +1, you need to create a new object using the setdate function, however,
      //this means the tempdate in memory(already in the array) will be changed, this is why "start date" is one less day than the true start date
      tempDate = new Date(tempDate.setDate(tempDate.getDate() + 1));
    }

    let dateObjectArray = [];
    let dateObject = {};

    //set the month array as an array of object that are either "current month" or "current day" to impact styling

    for (let day in dateArray) {
      if (date.getMonth() !== dateArray[day].getMonth()) {
        dateObject = { date: dateArray[day], isCurrentMonth: false };
      } else if (
        today.getDate() + "" + today.getMonth() + "" + today.getFullYear() ===
        dateArray[day].getDate() +
          "" +
          dateArray[day].getMonth() +
          "" +
          dateArray[day].getFullYear()
      ) {
        dateObject = {
          date: dateArray[day],
          isCurrentMonth: true,
          isToday: true,
        };
      } else {
        dateObject = { date: dateArray[day], isCurrentMonth: true };
      }
      dateObjectArray.push(dateObject);
    }

    setDateObjectArray(dateObjectArray);
    setDateObject(date);
  }

  useEffect(() => getMonthCalanderData(new Date()), []);

  const datesToInclude = dateObjectArray.map((day) => {
    return <DayForMonth key={day.date} day={day} />;
  });

  return (
    <div className="cal-container">
      <div className="cal-options-header">
        <div className="yearselector">
          <h2>{dateObject.getFullYear()}</h2>
        </div>
        <div className="month-nav-container">
          <ul class="pager">
            <li
              onClick={() =>
                getMonthCalanderData(
                  new Date(
                    dateObject.getFullYear(),
                    dateObject.getMonth() - 1,
                    1
                  )
                )
              }
            >
              <a className="previousbackgroundcolor" href="#">
                Previous
              </a>
            </li>
            <li>
              {" "}
              <span className="p-2 spanmonthselecter">
                <b>{dateObject.toLocaleString("default", { month: "long" })}</b>
              </span>
            </li>
            <li
              onClick={() =>
                getMonthCalanderData(
                  new Date(
                    dateObject.getFullYear(),
                    dateObject.getMonth() + 1,
                    1
                  )
                )
              }
            >
              <a className="nextbackgroundcolor" href="#">
                Next Month
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="days-of-month-grid-container"
        //   className={
        //     "w-full grid grid-cols-7 grid-rows-" + dateObjectArray.length / 7
        //   }
      >
        <div className="cal-day-name">
          <b>Sunday</b>
        </div>
        <div className="cal-day-name">
          <b>Monday</b>
        </div>
        <div className="cal-day-name">
          <b>Tuesday</b>
        </div>
        <div className="cal-day-name">
          <b>Wednesday</b>
        </div>
        <div className="cal-day-name">
          <b>Thursday</b>
        </div>
        <div className="cal-day-name">
          <b>Friday</b>
        </div>
        <div className="cal-day-name">
          <b>Saturday</b>
        </div>

        <div className="days-of-month-grid-container">
          <div className="cal-day-name">
            <b>Sunday</b>
          </div>
          <div className="cal-day-name">
            <b>Monday</b>
          </div>
          <div className="cal-day-name">
            <b>Tuesday</b>
          </div>
          <div className="cal-day-name">
            <b>Wednesday</b>
          </div>
          <div className="cal-day-name">
            <b>Thursday</b>
          </div>
          <div className="cal-day-name">
            <b>Friday</b>
          </div>
          <div className="cal-day-name">
            <b>Saturday</b>
          </div>

          {datesToInclude}
        </div>
      </div>
    </div>
  );
}

export default MonthCalendar;
