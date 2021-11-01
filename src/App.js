import { Route, Switch } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { routes } from './routes';
import Navigation from './components/Navigation/Navigation ';
import './App.css';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage' /*webpackChunkName: "home-page"*/),
);

const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage' /*webpackChunkName: 'movie-details' */
  ),
);

const MoviesPage = lazy(() =>
  import('./views/MoviesPage/MoviesPage' /*webpackChunkName: 'movie' */),
);

function App() {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path={routes.home} exact>
            <HomePage />
          </Route>
          <Route path={routes.movies} exact>
            <MoviesPage />
          </Route>
          <Route path={routes.movieDetails}>
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
