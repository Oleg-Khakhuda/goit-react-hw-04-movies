import HomePage from './views/HomePage/HomePage';
import Navigation from './components/Navigation/Navigation ';
import MovieDetailsPage from './views/MovieDetailsPage/MovieDetailsPage';
import MoviesPage from './views/MoviesPage/MoviesPage';

import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Navigation />
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Switch>
        <Route path="/movies" exact>
          <MoviesPage />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
