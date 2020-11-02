import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import PlanetInfo from './PlanetInfo';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/planet/:name" component={PlanetInfo} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
