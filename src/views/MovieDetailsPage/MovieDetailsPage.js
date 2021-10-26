import React from 'react';
import { useState, useEffect } from 'react';
import {
  Link,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { ThemovieFetch } from '../../services/search-api';

const newThemovieFetch = new ThemovieFetch();

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    newThemovieFetch.id = movieId;
    newThemovieFetch
      .searchDetailsMovie()
      .then(movieDetails => {
        setMovieDetails(movieDetails);
        console.log(movieDetails.genres);
      })
      .catch(err => {
        console.log(err);
      });
  }, [movieId]);

  return (
    <>
      <button>Go back</button>
      <div>
        <article>
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
            alt={movieDetails.title || movieDetails.name}
          />
          <div>
            <h3>{`${movieDetails.title || movieDetails.name}`}</h3>
            <p>User Score - {`${movieDetails.vote_average * 10}%`}</p>
            <h4>Overview</h4>
            <p>{movieDetails.overview}</p>

            <h5>Genres</h5>
            {/* <ul>
                {movieDetails.genres.map(el => (
                  <li key={el.id}>{el.name}</li>
                ))}
              </ul>         */}

            <p>Additional Information</p>
            <ul>
              <li>
                <link to={`/movies/${movieId}/cast`}></link>
                Cast
              </li>
              <li>
                <link to={`/movies/${movieId}/reviews`}></link>
                Reviews
              </li>
            </ul>
            {/* <Switch>
                    <Route path='/movies/:moviesId/cast'>
                        <Cast />
                    </Route>
                    <Route path='/movies/:moviesId/reviews'>
                        <Reviews />
                    </Route>
                </Switch> */}
          </div>
        </article>
      </div>
    </>
  );
};

export default MovieDetailsPage;
