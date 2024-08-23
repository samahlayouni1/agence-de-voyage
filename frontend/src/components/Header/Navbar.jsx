import { Link } from "react-router-dom";
import "./header.css";
import { useAuth } from '../Auth/Auth';

const Navbar = ({ toggle, setToggle }) => {
  const auth = useAuth();

  return (
    <nav
      style={{
        clipPath: toggle ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "none",
      }}
      className="navbar"
    >
      <ul className="navbar-links">
        <Link to="/" onClick={() => setToggle(false)} className="navbar-link">
          <i className="bi bi-house-fill"></i>
          Home
        </Link>
        <Link to="/about" onClick={() => setToggle(false)} className="navbar-link">
          <i className="bi bi-bank2"></i>
          About
        </Link>
        {auth?.user && (
          <Link to="/Profile" className="navbar-link">
            Profile
          </Link>
        )}
        {!auth?.user && (
          <>
            <Link to="/login" onClick={() => setToggle(false)} className="navbar-link">
              <i className="bi bi-arrow-right-square-fill"></i>
              Login
            </Link>
            <Link to="/register" onClick={() => setToggle(false)} className="navbar-link">
              <i className="bi bi-person-plus-fill"></i>
              Register
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
