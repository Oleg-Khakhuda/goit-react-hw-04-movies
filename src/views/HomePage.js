import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemovieFetch } from '../services/search-api';

const newThemovieFetch = new ThemovieFetch();

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  // const [status, setStatus] = useState('idle');

  useEffect(() => {
    newThemovieFetch
      .searchTrendMovie()
      .then(movies => {
        setMovies(movies.results);
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
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                // state: { from: props.location.pathname },
              }}
            >
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
