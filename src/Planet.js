import React from 'react';
import './Planet.css';
import { Link } from 'react-router-dom';

function Planet({ planet }) {
  let formatPopulation = String(planet.population).replace(
    /(.)(?=(\d{3})+$)/g,
    '$1,'
  );
  return (
    <Link
      to={{
        pathname: `/planet/${planet.name.replace(/ /g, '_')}`,
        state: { planet: planet },
      }}
    >
      <div className="planet_container">
        <h2>{planet.name}</h2>
        <p>
          <b>Condition:</b> {planet.climate}
        </p>
        <p>
          <b>Population:</b> {formatPopulation}
        </p>
      </div>
    </Link>
  );
}

export default Planet;
