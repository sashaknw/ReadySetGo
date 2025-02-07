import { useState } from "react";
import "./KanbanBoard.css";

function KanbanBoard({ tasks, statuses, onUpdateTask }) {
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = (status) => {
    if (draggedTask) {
      onUpdateTask({ ...draggedTask, status });
      setDraggedTask(null);
    }
  };

  return (
    <div className="kanban-board">
      {statuses.map((status) => (
        <div
          key={status}
          className="kanban-column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(status)}
        >
          <h3>{status.toUpperCase()}</h3>
          <div className="task-list">
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={() => handleDragStart(task)}
                >
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span className={`priority-${task.priority}`}>
                      {task.priority}
                    </span>
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
