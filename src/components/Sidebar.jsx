import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
     

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
        <NavLink to="/about" className="nav-item">
          <div className="icon">
            <img src="/src/assets/icons/about-me.png" alt="about icon" />
          </div>
          About
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
