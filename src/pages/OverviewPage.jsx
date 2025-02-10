import { useState } from "react";
import Calendar from "../components/Calendar";
import "./OverviewPage.css";

function OverviewPage({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const getTaskStats = () => ({
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "done").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    upcoming: tasks.filter((t) => t.status === "todo").length,
  });

  const stats = getTaskStats();

  return (
    <div className="overview-page">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <span className="stat-number">{stats.total}</span>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <span className="stat-number">{stats.completed}</span>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <span className="stat-number">{stats.inProgress}</span>
        </div>
        <div className="stat-card">
          <h3>Upcoming</h3>
          <span className="stat-number">{stats.upcoming}</span>
        </div>
      </div>

      <div className="overview-content">
        <div className="calendar-section">
          <Calendar tasks={tasks} onSelectDate={setSelectedDate} />
        </div>

        <div className="tasks-section">
          <h2>Tasks Overview</h2>
          {selectedDate ? (
            <div className="date-tasks">
              <h3>Tasks for {selectedDate}</h3>
              {tasks
                .filter((task) => task.dueDate === selectedDate)
                .map((task) => (
                  <div key={task.id} className="task-item">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <span className={`status-badge status-${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="priority-tasks">
              <h4>High Priority Tasks</h4>
              {tasks
                .filter((task) => task.priority === "high")
                .map((task) => (
                  <div key={task.id} className="task-item">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <span className={`status-badge status-${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
