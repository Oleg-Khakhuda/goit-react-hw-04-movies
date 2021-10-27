import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import default_poster from '../../images/unnamed.jpg';
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
    <ul>
      {movieCast.map(actor => (
        <li key={actor.id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
                : default_poster
            }
            alt={actor.character}
            // className={s.photo}
          ></img>
          <p>{`Name: ${actor.name}`}</p>
          <p>{`Character: ${actor.character}`}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
