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
    category: categories[0] || "", 
    dueDate: new Date().toISOString().split("T")[0],
  });

 const handleSubmit = (e) => {
   e.preventDefault();
   console.log("Submitting new task:", newTask); // Debug log

   // Validate required fields
   if (!newTask.title || !newTask.category || !newTask.dueDate) {
     alert("Please fill in all required fields");
     return;
   }

   // Make sure the task matches your data structure
   const taskToAdd = {
     title: newTask.title,
     description: newTask.description,
     status: newTask.status,
     dueDate: newTask.dueDate,
     priority: newTask.priority,
     category: newTask.category,
   };

   onAddTask(taskToAdd);

   // Reset form
   setNewTask({
     title: "",
     description: "",
     status: "todo",
     priority: "medium",
     category: categories[0] || "",
     dueDate: new Date().toISOString().split("T")[0],
   });
   setShowTaskForm(false);
 };

  return (
    <div className="kanban-page">
      <div className="kanban-header">
        <button className="add-task-btn" onClick={() =>  {
          console.log("Add Task button clicked");
          setShowTaskForm(true);
        }}>
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
        isEditing={false}
        onDelete={() => {}}
      />
    </div>
  );
}

export default KanbanPage;
