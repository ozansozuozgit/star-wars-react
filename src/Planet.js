import React, { useContext } from 'react';
import './Planet.css';
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import PlanetContext from './context/Planet/planetContext';

function Planet({ planet }) {
  const planetContext = useContext(PlanetContext);

  const { setCurrentPlanet } = planetContext;
  let history = useHistory();

  const goToPlanet = () => {
    setCurrentPlanet(planet);
    history.push(`/planet/${planet.name.replace(/ /g, '_')}`);
  };

  let formatPopulation = String(planet.population).replace(
    /(.)(?=(\d{3})+$)/g,
    '$1,'
  );
  return (
    <div className="planet_container" onClick={goToPlanet}>
      <h2>{planet.name}</h2>
      <p>
        <b>Condition:</b> {planet.climate}
      </p>
      <p>
        <b>Population:</b> {formatPopulation}
      </p>
    </div>
  );
}

export default Planet;
