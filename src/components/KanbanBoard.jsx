import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { icons } from "../assets/assets";

function KanbanBoard({
  tasks,
  statuses,
  categories,
  onUpdateTask,
  onDeleteTask,
}) {
  const [draggedTask, setDraggedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = (status) => {
    if (draggedTask) {
      onUpdateTask({ ...draggedTask, status });
      setDraggedTask(null);
    }
  };

  const handleEditSubmit = (updatedTask) => {
    onUpdateTask(updatedTask);
    setEditingTask(null);
  };

  const handleDeleteTask = () => {
    console.log("Deleting task:", editingTask.id);
    onDeleteTask(editingTask.id);
    setEditingTask(null);
  };

  return (
    <div className="kanban-board">
      {statuses.map((status) => (
        <div
          key={status}
          className="kanban-column"
          data-status={status}
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
                  <img
                    src={icons.edit}
                    className="edit-button-png"
                    alt="edit icon"
                    onClick={() => setEditingTask(task)}
                  />
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

      {editingTask && (
        <AddTaskModal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          task={editingTask}
          setTask={setEditingTask}
          onSubmit={(e) => {
            e.preventDefault();
            handleEditSubmit(editingTask);
          }}
          onDelete={handleDeleteTask}
          categories={categories}
          isEditing={true}
        />
      )}
    </div>
  );
}

export default KanbanBoard;
