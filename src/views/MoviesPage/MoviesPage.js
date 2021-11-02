import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import default_poster from '../../images/default-movie.jpg';
import { ThemovieFetch } from '../../services/search-api';
import MovieDetailsItem from '../../components/MovieDetailsItem/MovieDetailsItem';
import s from '../MoviesPage/MoviesPage.module.css';

const newThemovieFetch = new ThemovieFetch();

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [moviesQuery, setMoviesQuery] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();
  const location = useLocation();
  const movieQuery = new URLSearchParams(location.search).get('query');

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setQuery(inputValue);
    if (inputValue.trim() === '') {
      alert('Введите название картинки!');
    }
  };

  useEffect(() => {
    if (location.search === '') {
      return;
    }
    setQuery(movieQuery);
  }, [location.search, movieQuery]);

  useEffect(() => {
    if (query === '') {
      return;
    }
    newThemovieFetch.searchQuery = query;
    newThemovieFetch
      .searchMovie()
      .then(moviesQuery => {
        setMoviesQuery(moviesQuery);
      })
      .then(
        history.push({
          ...location,
          search: `query=${query}`,
        }),
      )
      .catch(error => {
        console.log(error);
      });
  }, [query]);

  return (
    <div className={s.searchForm}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="query"
          value={inputValue}
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
