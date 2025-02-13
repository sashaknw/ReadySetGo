import { NavLink } from "react-router-dom";
import { icons } from "../assets/assets";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        <NavLink to="/" className="nav-item">
          <div className="icon">
            <img src={icons.dashboard} alt="dashboard icon" />
          </div>
          Dashboard
        </NavLink>
        <NavLink to="/kanban" className="nav-item">
          <div className="icon">
            <img src={icons.tasks} alt="tasks icon" />
          </div>
          Tasks
        </NavLink>
        <NavLink to="/about" className="nav-item">
          <div className="icon">
            <img src={icons.aboutMe} alt="about icon" />
          </div>
          About
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;