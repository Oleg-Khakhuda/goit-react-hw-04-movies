import React from 'react';
import { useState, useEffect } from 'react';
import { ThemovieFetch } from '../../services/search-api';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import MovieDetailsItem from '../../components/MovieDetailsItem/MovieDetailsItem';
import s from '../HomePage/HomePage.module.css';

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

  const handleClick = () => {
    newThemovieFetch.page = 1;
    newThemovieFetch
      .searchTrendMovie()
      .then(movies => {
        setMovies(prev => [...prev, ...movies]);
        // setStatus('success');
        // scroll();
      })
      .catch(err => {
        // setStatus('error');
        console.log(err);
      });
  };

  return (
    <>
      <h1 className={s.title}>Trending Today</h1>
      <MovieDetailsItem movies={movies} />
      <LoadMoreBtn onClick={handleClick} />
    </>
  );
};

export default HomePage;
