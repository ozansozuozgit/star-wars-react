import React, { useEffect, useContext } from 'react';
import './Home.css';
import Planet from './Planet';
import Spinner from './Spinner';
import PlanetContext from './context/Planet/planetContext';

function Home() {
  const planetContext = useContext(PlanetContext);
  const { getPlanets, planets } = planetContext;

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <div className="home_container">
      <h1>Star Wars Planets</h1>
      {planets.length > 1 ? (
        <div className="planet_list_container">
          {planets &&
            planets.map((planet, index) => (
              <Planet planet={planet} key={index} />
            ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Home;
