import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import KanbanPage from "./pages/KanbanPage";
import data from "./data/data.json";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(data.tasks);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: (tasks.length + 1).toString() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

   const handleDeleteTask = (taskId) => {
      console.log("Deleting taskId:", taskId);
     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
   };

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<OverviewPage tasks={tasks} />} />
            <Route
              path="/kanban"
              element={
                <KanbanPage
                  tasks={tasks}
                  statuses={data.statuses}
                  categories={data.categories}
                  onAddTask={addTask}
                  onUpdateTask={updateTask}
                  onDeleteTask={handleDeleteTask}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
