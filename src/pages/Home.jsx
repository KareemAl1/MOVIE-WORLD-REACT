import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/undraw_home-cinema_jdm1.svg";

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    if (!search.trim()) return;
    navigate(`/movies?search=${encodeURIComponent(search)}`);
  }

  return (
    <main className="hero">
      <div className="hero-content">
        <h2>Discover your next favorite movie</h2>
        <p>Search by title to explore ratings, posters, and more.</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <figure className="hero__image-wrapper">
          <img className="hero__img" src={heroImg} />
        </figure>
      </div>
    </main>
  );
}
