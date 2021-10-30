import React, { useState } from 'react';

import PropTypes from 'prop-types';
import default_poster from '../../images/default-movie.jpg';
import { ThemovieFetch } from '../../services/search-api';
import MovieDetailsItem from '../../components/MovieDetailsItem/MovieDetailsItem';
import s from '../MoviesPage/MoviesPage.module.css';

const newThemovieFetch = new ThemovieFetch();

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [moviesQuery, setMoviesQuery] = useState([]);

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
    <div className={s.searchForm}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="query"
          value={query}
          onChange={handleChange}
          className={s.input}
        />

        <button className={s.button} type="submit">
          <span>Search</span>
        </button>
      </form>
      <MovieDetailsItem movies={moviesQuery} poster={default_poster} />
    </div>
  );
};
export default MoviesPage;
