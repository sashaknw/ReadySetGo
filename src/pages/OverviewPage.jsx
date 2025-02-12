import { useState } from "react";
import Calendar from "../components/Calendar";
import "./OverviewPage.css";

// Import local images
import totalTasksImage from "../assets/images/blue-blop.png";
import completedTasksImage from "../assets/images/pink-blop.png";
import inProgressTasksImage from "../assets/images/yellow-blop.png";

function OverviewPage({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const getTaskStats = () => ({
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "done").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    upcoming: tasks.filter((t) => t.status === "todo").length,
  });

  const stats = getTaskStats();

  const statCardStyles = [
    {
      title: "Total Tasks",
      count: stats.total,
      backgroundImage: totalTasksImage,
    },
    {
      title: "Completed",
      count: stats.completed,
      backgroundImage: completedTasksImage,
    },
    {
      title: "In Progress",
      count: stats.inProgress,
      backgroundImage: inProgressTasksImage,
    },
  ];

  return (
    <div className="overview-page">
      <div className="stats-grid">
        {statCardStyles.map((card, index) => (
          <div
            key={card.title}
            className="stat-card"
            style={{
              backgroundImage: `url(${card.backgroundImage})`,
              backgroundSize: "100%", 
              backgroundPosition: "top -50px right 50px", 
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="stat-card-content">
              <h3>{card.title}</h3>
              <span className="stat-number">{card.count}</span>
            </div>
          </div>
        ))}
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
