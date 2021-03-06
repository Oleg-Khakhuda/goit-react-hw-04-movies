import React from 'react';
import { useState, useEffect } from 'react';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import default_movie from '../../images/default-movie.jpg';
import {
  NavLink,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import s from '../MovieDetailsPage/MovieDetailsPage.module.css';

import { ThemovieFetch } from '../../services/search-api';

const newThemovieFetch = new ThemovieFetch();

const MovieDetailsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    newThemovieFetch.id = movieId;
    newThemovieFetch
      .searchDetailsMovie()
      .then(movieDetails => {
        setMovieDetails(movieDetails);
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);

  const handleClick = () => history.push(location?.state?.from ?? '/');

  let poster = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`
    : default_movie;

  return (
    <>
      <button className={s.btn} type="button" onClick={handleClick}>
        Go back
      </button>
      {movieDetails.id ? (
        <>
          <div className={s.movieCard}>
            <img
              src={`${poster}`}
              alt={movieDetails.title || movieDetails.name}
              width="300"
            />
            <div className={s.descriptions}>
              <h3>{`${movieDetails.title || movieDetails.name}`}</h3>
              <p>User Score - {`${movieDetails.vote_average * 10}%`}</p>
              <h4>Overview</h4>
              <p>
                {movieDetails.overview || 'This movie has no overview yet.'}
              </p>

              <h5>Genres</h5>
              <ul className={s.genreList}>
                {movieDetails.genres.map(el => (
                  <li key={el.id} className={s.genreListItem}>
                    {el.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={s.addInf}>
            <h1>Additional Information</h1>
            <ul className={s.navList}>
              <li className={s.navListItem}>
                <NavLink
                  exact
                  to={{
                    pathname: `${url}/cast`,
                    state: {
                      from: location.state ? location.state.from : '/movies',
                    },
                  }}
                  className={s.link}
                  activeClassName={s.active}
                >
                  Cast
                </NavLink>
              </li>
              <li className={s.navListItem}>
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: {
                      from: location.state ? location.state.from : '/movies',
                    },
                  }}
                  className={s.link}
                  activeClassName={s.active}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Switch>
            <Route path="/movies/:movieId/cast">
              <Cast />
            </Route>
            <Route path="/movies/:movieId/reviews">
              <Reviews />
            </Route>
          </Switch>
        </>
      ) : (
        <p>The resource you requested could not be found.</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
