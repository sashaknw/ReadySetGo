import { useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import Calendar from "../components/Calendar";
import AddTaskModal from "../components/AddTaskModal";
import "./KanbanPage.css";

function KanbanPage({ tasks, statuses, categories, onAddTask, onUpdateTask, onDeleteTask }) {
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
            categories={categories}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        </div>
        <aside className="kanban-sidebar">
          <Calendar tasks={tasks} page="kanban" />
        </aside>
      </div>

      <AddTaskModal
        isOpen={showTaskForm}
        onClose={() => setShowTaskForm(false)}
        task={newTask}
        setTask={setNewTask}
        onSubmit={handleSubmit}
        categories={categories}
      />
    </div>
  );
}

export default KanbanPage;
