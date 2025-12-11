// src/pages/Home.jsx
import "../index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/undraw_home-cinema_jdm1.svg";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/movies?search=${encodeURIComponent(trimmed)}`);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <main className="hero">
      <div className="hero-content">
        <h2>Discover your next favorite movie</h2>
        <p>Search by title to explore ratings, posters, and more.</p>

        <div className="search-bar">
          <input
            type="text"
            id="homeSearchInput"
            placeholder="Search for a movie..."
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            id="homeSearchButton"
            aria-label="Search"
            onClick={handleSearch}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <figure className="hero__image-wrapper">
          <img
            className="hero__img"
            src={heroImg}
            alt="Person sitting in a home cinema watching a movie"
          />
        </figure>
      </div>
    </main>
  );
}
