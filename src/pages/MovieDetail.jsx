// src/pages/MovieDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetail.css";

const API_KEY = "ea3e9799"; // your OMDb key

export default function MovieDetail() {
  const { imdbID } = useParams();
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
          `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.Response === "False") {
          setError("Could not find that movie.");
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

    fetchMovie();
  }, [imdbID]);

  function handleBack() {
    navigate(-1); // go back to previous page
  }

  if (loading) {
    return <p className="movie-detail__status">Loading...</p>;
  }

  if (error) {
    return <p className="movie-detail__status">{error}</p>;
  }

  if (!movie) return null;

  return (
    <div className="movie-detail-page">
      <button className="back-button" onClick={handleBack}>
        ← Back
      </button>

      <div className="movie-detail">
        <div className="movie-detail__poster">
          <img
            src={
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.Title}
          />
        </div>

        <div className="movie-detail__info">
          <h1 className="movie-detail__title">{movie.Title}</h1>

          <div className="movie-detail__meta">
            <p>
              <strong>Year:</strong> {movie.Year}
            </p>
            <p>
              <strong>Rated:</strong> {movie.Rated}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.Runtime}
            </p>
            <p>
              <strong>Genre:</strong> {movie.Genre}
            </p>
            <p>
              <strong>IMDb Rating:</strong> {movie.imdbRating}
            </p>
          </div>

          <p className="movie-detail__plot">
            <strong>Plot: </strong>
            {movie.Plot}
          </p>

          <p className="movie-detail__extra">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="movie-detail__extra">
            <strong>Actors:</strong> {movie.Actors}
          </p>
        </div>
      </div>
    </div>
  );
}
