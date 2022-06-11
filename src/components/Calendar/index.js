import React, { useEffect, useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths,
  subYears,
  addYears,
  getYear,
} from "date-fns";
import BackImg from "../../assets/previous.png";
import ForwordImg from "../../assets/right-arrow.png";

import "./calendar.css";

const CalendarComponent = React.memo(({selected, setDate}) => {
  const currentDate = new Date();
  const currentYear = getYear(currentDate);

  const [year, setYear] = useState(currentYear);

  const [selectedDate, setSelectedDate] = useState(selected);
  const [activeDate, setActiveDate] = useState(selected);

  useEffect(()=> {
    setSelectedDate(selected)
    setActiveDate(selected);
  }, [selected]);

  useEffect(()=> {
    setDate(activeDate)
  },[])

  useEffect(()=> { 
    setDate(selectedDate)
  },[selectedDate])

  const getHeader = () => {
    return (
      <div className="header">
        <img
          src={BackImg}
          alt="BackImg"
          width={15}
          onClick={() => setActiveDate(subMonths(activeDate, 1))}
        />
        <h2 className="currentMonth">{format(activeDate, "MMMM, yyyy")}</h2>
        <img
          src={ForwordImg}
          alt="BackImg"
          width={15}
          onClick={() => setActiveDate(addMonths(activeDate, 1))}
        />
      </div>
    );
  };

  useEffect(()=> {
    setYear(format(activeDate, "yyyy"))
  },[activeDate])

  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate);
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div className="day weekNames" key={day}>
          {format(addDays(weekStartDate, day), "E")}
        </div>
      );
    }
    return <div className="weekContainer">{weekDays}</div>;
  };

  const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
    let currentDate = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;
      week.push(
        <div
          key={day}
          className={`day ${
            isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"
          } ${isSameDay(currentDate, selectedDate) ? "selectedDay" : ""}
          ${isSameDay(currentDate, new Date()) ? "today" : ""}`}
          onClick={() => {
            setSelectedDate(cloneDate);
          }}
        >
          {format(currentDate, "d")}
        </div>
      );
      currentDate = addDays(currentDate, 1);
    }
    return <>{week}</>;
  };
  
  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      allWeeks.push(
        <React.Fragment key={currentDate}>
          {generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)}
        </React.Fragment>
      );
      currentDate = addDays(currentDate, 7);
    }

    return <div className="weekContainer">{allWeeks}</div>;
  };

  return (
    <>
      <div className="year-layout">
        <img
          src={BackImg}
          alt="BackImg"
          width={15}
          onClick={() => setActiveDate(subYears(activeDate, 1))}
        />
        <span className="year-f">{year}</span>
        <img
          src={ForwordImg}
          alt="BackImg"
          width={15}
          onClick={() => setActiveDate(addYears(activeDate, 1))}
        />
      </div>
      <div className="mt-3">
        <section>
          {getHeader()}
          {getWeekDaysNames()}
          {getDates()}
        </section>
      </div>
    </>
  );
})

export default CalendarComponent;