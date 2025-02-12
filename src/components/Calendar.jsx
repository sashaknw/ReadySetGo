import { useState } from "react";
import "./Calendar.css";

function Calendar({ tasks, onSelectDate, page }) {
  // Added 'page' prop
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dateString = date.toISOString().split("T")[0];
      const dayTasks = tasks.filter((task) => task.dueDate === dateString);

      days.push(
        <div
          key={day}
          className={`calendar-day ${dayTasks.length > 0 ? "has-tasks" : ""}`}
          onClick={() => onSelectDate(dateString)}
        >
          <span className="day-number">{day}</span>
          {dayTasks.length > 0 && (
            <div
              className="task-indicator"
              data-more-tasks={
                dayTasks.length > 3 ? `+${dayTasks.length - 3}` : ""
              }
            >
              {dayTasks.slice(0, 3).map((task, index) => (
                <div key={index} className="task-dot" />
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (increment) => {
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() + increment))
    );
  };

  return (
    <div className={`calendar ${page === "kanban" ? "kanban-calendar" : ""}`}>
      {" "}
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <h3>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
}

export default Calendar;
