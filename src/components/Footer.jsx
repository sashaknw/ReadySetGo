import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
          <p className="logo-footer"> ReadySetGo!</p>
          
          <p className="copyright">Copyright © 2025</p>
          <NavLink to="/privacy-policy" className={"privacy-policy"}>Privacy Policy</NavLink>
        </div>
      </footer>
    );
}

export default Footer