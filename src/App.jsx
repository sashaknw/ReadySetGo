import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import OverviewPage from "./pages/OverviewPage";
import KanbanPage from "./pages/KanbanPage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data.tasks || []);
      setCategories(data.categories || []);
      setStatuses(data.statuses || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Unable to connect to server. Using offline mode.");
      // Fallback data if server is not available
      setTasks([]);
      setCategories(["Social Media", "Selection", "Networking", "Research"]);
      setStatuses(["todo", "in-progress", "review", "done"]);
    }
  };

  const saveToServer = async (updatedTasks) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasks: updatedTasks,
          categories,
          statuses,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }
      setError(null);
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Changes will be saved locally only.");
    }
  };

  const addTask = async (newTask) => {
    try {
      const maxId =
        tasks.length > 0
          ? Math.max(...tasks.map((task) => parseInt(task.id)))
          : 0;

      const taskToAdd = {
        ...newTask,
        id: (maxId + 1).toString(),
        image: newTask.image || null,
      };

      const updatedTasks = [...tasks, taskToAdd];
      setTasks(updatedTasks);
      await saveToServer(updatedTasks);
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Task added locally but couldn't save to server.");
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
      await saveToServer(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Task updated locally but couldn't save to server.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      await saveToServer(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Task deleted locally but couldn't save to server.");
    }
  };

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Navbar />
          {error && <div className="error-banner">{error}</div>}
          <Routes>
            <Route path="/" element={<OverviewPage tasks={tasks} />} />
            <Route
              path="/kanban"
              element={
                <KanbanPage
                  tasks={tasks}
                  statuses={statuses}
                  categories={categories}
                  onAddTask={addTask}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
