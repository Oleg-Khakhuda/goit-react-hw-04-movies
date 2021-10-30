import { Link, useLocation } from 'react-router-dom';
import default_poster from '../../images/default-movie.jpg';
import s from '../MovieDetailsItem/MovieDetailsItem.module.css';

const MovieDetailsItem = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      <ul className={s.MoviesGallery}>
        {movies.map(movie => (
          <li key={movie.id} className={s.MoviesGalleryItem}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: {
                  from: location,
                },
              }}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                    : default_poster
                }
                alt={movie.title || movie.name}
                className={s.MoviesGalleryItem__image}
                width="300"
              />
              <h2 className={s.MoviesGalleryItem__title}>
                {movie.title || movie.name}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieDetailsItem;
