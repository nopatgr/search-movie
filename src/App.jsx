/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "./api";
import "./App.css";

const App = () => {
  const [PopularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((results) => {
      setPopularMovies(results);
    });
  }, []);

  const PopularMovieList = () => {
    return PopularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="Movie-date">{movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };
  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="judul">Search Movie 🎬</h1>
        <input
          placeholder="Search your movie 🎞"
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
