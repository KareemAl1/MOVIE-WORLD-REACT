import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Movies.css"; 

const API_KEY = "ea3e9799";  

export default function Player() {
  const { id } = useParams(); // 
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`
        );
        const data = await res.json();

        if (data.Response === "False") {
          setError("Movie not found.");
          setMovie(null);
        } else {
          setMovie(data);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <button className="home__btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <p className="status-message">{error}</p>
      </div>
    );
  }

  return (
    <main className="player-page">
      <button className="home__btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="movie-card player-card">
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
        </div>

        <div className="player-details">
          <h2 className="movie-card__title">{movie.Title}</h2>
          <p className="movie-card__meta">
            <b>Year:</b> {movie.Year}
          </p>
          <p className="movie-card__meta">
            <b>Runtime:</b> {movie.Runtime}
          </p>
          <p className="movie-card__meta">
            <b>Genre:</b> {movie.Genre}
          </p>
          <p className="movie-card__meta">
            <b>Rated:</b> {movie.Rated}
          </p>
          <p className="movie-card__meta">
            <b>IMDB Rating:</b> {movie.imdbRating}
          </p>
          <p className="movie-card__meta">
            <b>Plot:</b> {movie.Plot}
          </p>
        </div>
      </div>
    </main>
  );
}
