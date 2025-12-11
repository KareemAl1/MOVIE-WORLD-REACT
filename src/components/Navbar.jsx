// src/components/Navbar.jsx
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <i className="fa-solid fa-film" aria-hidden="true"></i>
        <h1>Movie World</h1>
      </div>

      <ul className="navigation-links">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/movies">
            Find Movies
          </NavLink>
        </li>

        {/* Fake “Contact” button – no real page, just like original */}
        <li>
          <button className="btn_contact" type="button">
            CONTACT
          </button>
        </li>
      </ul>
    </nav>
  );
}
