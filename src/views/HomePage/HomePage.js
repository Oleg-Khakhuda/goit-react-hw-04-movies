import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemovieFetch } from '../../services/search-api';

const newThemovieFetch = new ThemovieFetch();

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    newThemovieFetch
      .searchTrendMovie()
      .then(movies => {
        setMovies(movies);
        console.log(movies);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Trending Today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title || movie.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
