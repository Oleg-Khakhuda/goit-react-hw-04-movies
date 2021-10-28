import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemovieFetch } from '../../services/search-api';

const newThemovieFetch = new ThemovieFetch();

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [moviesQuery, setMoviesQuery] = useState([]);
  const location = useLocation();

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() !== '') {
      newThemovieFetch.resetPage();
      newThemovieFetch.searchQuery = query;
      newThemovieFetch
        .searchMovie()
        .then(moviesQuery => {
          setMoviesQuery(moviesQuery);
          console.log(moviesQuery);
        })
        .catch(error => {
          console.log(error);
        });
    } else alert('Введите название картинки!');
  };

  return (
    <div>
      <h2>MoviesPage</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="query"
          value={query}
          onChange={handleChange}
        />

        <button type="submit">
          <span>Search</span>
        </button>
      </form>

      <ul>
        {moviesQuery.map(movie => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: {
                  search: location && location.search ? location.search : '',
                },
              }}
            >
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MoviesPage;
