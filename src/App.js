import HomePage from './views/HomePage';
import Navigation from './components/Navigation/Navigation ';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {/* <Route path="/movies" exact>
          <SearchMovie />
        </Route>
        <Route path="/movies/:movieId">
          <MovieCard />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
