import { useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import Calendar from "../components/Calendar";
import "./KanbanPage.css";

function KanbanPage({ tasks, statuses, categories, onAddTask, onUpdateTask }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    category: "",
    dueDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(newTask);
    setNewTask({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      category: "",
      dueDate: "",
    });
    setShowTaskForm(false);
  };

  return (
    <div className="kanban-page">
      <div className="kanban-header">
        <button className="add-task-btn" onClick={() => setShowTaskForm(true)}>
          Add Task
        </button>
      </div>

      <div className="kanban-layout">
        <div className="kanban-main">
          <KanbanBoard
            tasks={tasks}
            statuses={statuses}
            onUpdateTask={onUpdateTask}
          />
        </div>
        <aside className="kanban-sidebar">
          <Calendar tasks={tasks} />
        </aside>
      </div>

      {showTaskForm && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSubmit} className="task-form">
              <h3>Add New Task</h3>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) =>
                      setNewTask({ ...newTask, category: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowTaskForm(false)}>
                  Cancel
                </button>
                <button type="submit">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default KanbanPage;
