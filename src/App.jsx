import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { useState } from "react";
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

  return (
    <Router>
      <div className="app">
        <aside className="sidebar">
          <div className="logo">
            <h1>Intelly</h1>
          </div>

          <nav className="nav-menu">
            <NavLink to="/" className="nav-item">
              <span className="icon">📊</span>
              Overview
            </NavLink>
            <NavLink to="/kanban" className="nav-item">
              <span className="icon">📋</span>
              Tasks
            </NavLink>
            <NavLink to="/schedule" className="nav-item">
              <span className="icon">📅</span>
              Schedule
            </NavLink>
            <NavLink to="/patients" className="nav-item">
              <span className="icon">👥</span>
              Patients
            </NavLink>
          </nav>
        </aside>

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
