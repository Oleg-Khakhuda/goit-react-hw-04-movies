import HomePage from './views/HomePage/HomePage';
import Navigation from './components/Navigation/Navigation ';
import MovieDetailsPage from './views/MovieDetailsPage/MovieDetailsPage';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import axios from 'axios';

// axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=69178cbac05b13d057a60cacb1cf68a0')
//   .then(results => console.log(results.data.results))

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {/* <Route path="/movies" exact>
          <MoviesPage />
        </Route> */}
        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
