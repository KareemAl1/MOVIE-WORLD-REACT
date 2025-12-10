import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Movies.css";

const API_KEY = "ea3e9799";

export default function MovieDetail() {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${API_KEY}`
      );
      const data = await res.json();
      setMovie(data);
    }
    load();
  }, [imdbID]);

  if (!movie) return <p className="status-message">Loading...</p>;

  return (
    <div className="movie-detail-wrapper">
      <button className="detail-back-btn" onClick={() => navigate(-1)}>
  <i className="fa-solid fa-arrow-left"></i> Back
</button>


      <div className="movie-detail">
        <img
          className="movie-detail-poster"
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
          alt={movie.Title}
        />

        <div className="movie-detail-info">
          <h1>{movie.Title}</h1>
          <p><b>Year:</b> {movie.Year}</p>
          <p><b>Genre:</b> {movie.Genre}</p>
          <p><b>Runtime:</b> {movie.Runtime}</p>
          <p><b>IMDB Rating:</b> {movie.imdbRating}</p>
          <p><b>Director:</b> {movie.Director}</p>
          <p><b>Actors:</b> {movie.Actors}</p>
          <p className="plot"><b>Plot:</b> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}
