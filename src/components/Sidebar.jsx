import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h1>Ready Set Go!</h1>
      </div>

      <nav className="nav-menu">
        <NavLink to="/" className="nav-item">
          <div className="icon">
            <img src="/src/assets/icons/dashboard.png" alt="dashboard icon" />
          </div>
          Dashboard
        </NavLink>
        <NavLink to="/kanban" className="nav-item">
          <div className="icon">
            <img src="/src/assets/icons/tasks.png" alt="tasks icon" />
          </div>
          Tasks
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
