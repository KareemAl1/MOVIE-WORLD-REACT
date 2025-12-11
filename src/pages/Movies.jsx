// src/pages/Movies.jsx
import "../movies.css";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

const API_KEY = "ea3e9799"; // your OMDb key

export default function Movies() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function fetchMovies(title) {
    const query = title.trim();
    if (!query) {
      setMovies([]);
      setStatusMessage("Please type a movie title.");
      return;
    }

    setLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(
          query
        )}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (!data.Search) {
        setMovies([]);
        setStatusMessage("No movies found.");
      } else {
        setMovies(data.Search);
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // auto-fetch when page opens with ?search=...
  useEffect(() => {
    if (initialSearch) {
      fetchMovies(initialSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearchClick() {
    fetchMovies(search);
    navigate(`/movies?search=${encodeURIComponent(search.trim())}`);
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter") handleSearchClick();
  }

  function sortYearLowHigh() {
    const sorted = [...movies].sort((a, b) => Number(a.Year) - Number(b.Year));
    setMovies(sorted);
  }

  function sortYearHighLow() {
    const sorted = [...movies].sort((a, b) => Number(b.Year) - Number(a.Year));
    setMovies(sorted);
  }

  return (
    <>
      {/* HEADER TEXT */}
      <header className="header__movies">
        <h2 className="header__browse">Browse Movies</h2>
        <p className="header__para">
          Search by movie title and discover posters, years, and more.
        </p>
      </header>

      {/* SEARCH BAR */}
      <section className="search-bar-movies">
        <button className="home__btn" onClick={() => navigate("/")}>
          <i className="fa-solid fa-house"></i>
        </button>

        <input
          type="text"
          id="searchInput"
          placeholder="Search for a movie..."
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />

        <button id="searchButton" onClick={handleSearchClick}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </section>

      {/* SORT BUTTONS */}
      <div className="sort-buttons">
        <button id="sortLowHigh" onClick={sortYearLowHigh}>
          Year ↑
        </button>
        <button id="sortHighLow" onClick={sortYearHighLow}>
          Year ↓
        </button>
      </div>

      {/* RESULTS GRID */}
      <main>
        {loading && <p className="status-message">Loading...</p>}
        {!loading && statusMessage && (
          <p className="status-message">{statusMessage}</p>
        )}

        {!loading && !statusMessage && (
          <div id="results" className="movies__container">
            {movies.map((movie) => (
              <Link
                to={`/movies/${movie.imdbID}`}
                key={movie.imdbID}
                className="movie-card"
              >
                <div className="movie-card__image-wrapper">
                  <img
                    className="movie-card__img"
                    src={
                      movie.Poster && movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/250x370?text=No+Image"
                    }
                    alt={movie.Title}
                  />

                  <div className="movie-card__overlay">
                    <h3 className="movie-card__title">{movie.Title}</h3>
                    <p className="movie-card__meta">
                      <b>Year:</b> {movie.Year}
                    </p>
                    <p className="movie-card__meta">
                      <b>Type:</b> {movie.Type}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
