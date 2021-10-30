import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import default_poster from '../../images/unnamed.jpg';
import s from '../Cast/Cast.module.css';
import { ThemovieFetch } from '../../services/search-api';

const newThemovieFetch = new ThemovieFetch();

const Cast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    newThemovieFetch.id = movieId;
    newThemovieFetch
      .searchCreditsMovie()
      .then(movieCast => {
        setMovieCast(movieCast);
        console.log(movieCast);
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);

  return (
    <ul className={s.Cast}>
      {movieCast.map(actor => (
        <li key={actor.id} className={s.ListItem}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
                : default_poster
            }
            alt={actor.character}
            width="210"
            className={s.Image}
          ></img>
          <p className={s.Name}>{`${actor.name}`}</p>
          <p className={s.Character}>{`Character: ${actor.character}`}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
