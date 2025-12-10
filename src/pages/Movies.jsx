import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import "./Movies.css";

const API_KEY = "ea3e9799";

export default function Movies() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function fetchMovies(title) {
    if (!title.trim()) {
      setStatusMessage("Please type a movie title.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setStatusMessage("");

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (!data.Search) {
        setStatusMessage("No movies found.");
        setMovies([]);
      } else {
        setMovies(data.Search);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialSearch) fetchMovies(initialSearch);
  }, []);

  function handleSearch() {
    fetchMovies(search);
    navigate(`/movies?search=${encodeURIComponent(search)}`);
  }

  return (
    <>
      <header className="header__movies">
        <h2 className="header__browse">Browse Movies</h2>
        <p className="header__para">
          Search by movie title and discover posters, years, and more.
        </p>
      </header>

      <section className="search-bar-movies">
        <button className="movies__home-btn" onClick={() => navigate("/")}>
          <i className="fa-solid fa-house"></i>
        </button>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search for a movie..."
        />

        <button id="searchButton" onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </section>

      <div className="sort-buttons">
        <button onClick={() => setMovies([...movies].sort((a, b) => a.Year - b.Year))}>
          Year ↑
        </button>
        <button onClick={() => setMovies([...movies].sort((a, b) => b.Year - a.Year))}>
          Year ↓
        </button>
      </div>

      <main>
        {loading && <p className="status-message">Loading...</p>}
        {statusMessage && <p className="status-message">{statusMessage}</p>}

        {!loading && !statusMessage && (
          <div className="movies__container">
            {movies.map((movie) => (
              <Link key={movie.imdbID} to={`/movies/${movie.imdbID}`} className="movie-card">
                <div className="movie-card__image-wrapper">
                  <img
                    className="movie-card__img"
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/250x370?text=No+Image"
                    }
                  />
                  <div className="movie-card__overlay">
                    <h3 className="movie-card__title">{movie.Title}</h3>
                    <p><b>Year:</b> {movie.Year}</p>
                    <p><b>Type:</b> {movie.Type}</p>
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
