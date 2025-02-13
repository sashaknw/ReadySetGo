import { NavLink } from "react-router-dom";
import { images } from "../assets/assets";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="repo">
          <img
            src={images.githubLogo}
            className="logo-footer"
            alt="GitHub logo"
          />
          <NavLink
            to="https://github.com/sashaknw/ReadySetGo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Project Repository</p>
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
