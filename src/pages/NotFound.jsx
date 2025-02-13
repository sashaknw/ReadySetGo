import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Oh no! Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <button onClick={() => navigate("/")}>Back to Dashboard</button>
    </div>
  );
}

export default NotFound;
