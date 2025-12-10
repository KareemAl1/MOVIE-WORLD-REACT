import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <i className="fa-solid fa-film"></i>
        <h1>Movie World</h1>
      </div>

      <ul className="navigation-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/movies">Find Movies</NavLink></li>
        <li><button className="btn_contact">Contact</button></li>
      </ul>
    </nav>
  );
}
