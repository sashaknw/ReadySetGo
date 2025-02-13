import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="repo">
            <img
              src="/src/assets/images/github-logo.png"
              className="logo-footer"
            ></img>
            <p>Project Repository</p>
          </div>
        </div>
      </footer>
    );
}

export default Footer