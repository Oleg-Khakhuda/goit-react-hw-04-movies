import React from 'react';
import { useState, useEffect } from 'react';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import default_movie from '../../images/default-movie.jpg';
import {
  NavLink,
  Switch,
  Route,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { ThemovieFetch } from '../../services/search-api';

const newThemovieFetch = new ThemovieFetch();

const MovieDetailsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    newThemovieFetch.id = movieId;
    newThemovieFetch
      .searchDetailsMovie()
      .then(movieDetails => {
        setMovieDetails(movieDetails);
        console.log(movieDetails);
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);

  const handleClick = () =>
    history.push(location?.state?.from?.location ?? '/');

  let poster = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`
    : default_movie;

  return (
    <>
      <button type="button" onClick={handleClick}>
        Go back
      </button>
      {movieDetails.id ? (
        <div>
          <article>
            <img
              src={`${poster}`}
              alt={movieDetails.title || movieDetails.name}
            />
            <div>
              <h3>{`${movieDetails.title || movieDetails.name}`}</h3>
              <p>User Score - {`${movieDetails.vote_average * 10}%`}</p>
              <h4>Overview</h4>
              <p>{movieDetails.overview}</p>

              <h5>Genres</h5>
              <ul>
                {movieDetails.genres.map(el => (
                  <li key={el.id}>{el.name}</li>
                ))}
              </ul>

              <p>Additional Information</p>
              <ul>
                <li>
                  <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
                </li>
                <li>
                  <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
                </li>
              </ul>
              <Switch>
                <Route path="/movies/:movieId/cast">
                  <Cast />
                </Route>
                <Route path="/movies/:movieId/reviews">
                  <Reviews />
                </Route>
              </Switch>
            </div>
          </article>
        </div>
      ) : (
        <p>The resource you requested could not be found.</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
