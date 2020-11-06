import React, { useEffect, useContext, useState } from 'react';
import './PlanetInfo.css';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import PlanetContext from './context/Planet/planetContext';

function PlanetInfo() {
  const planetContext = useContext(PlanetContext);
  const {
    currentPlanet,
    getResidents,
    loading,
    famousResidents,
  } = planetContext;
  const [planet, setPlanet] = useState({});

  const {
    name,
    rotation_period,
    diameter,
    gravity,
    climate,
    terrain,
    population,
    residents,
  } = currentPlanet;

  useEffect(() => {
    getResidents(residents);
  }, []);

  return (
    <div className="planetInfo_container">
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      <h1>{name}</h1>
      <div className="planetInfo">
        <p>
          <span>Rotation Period</span>
          {rotation_period}
        </p>
        <p>
          <span>Diameter</span>
          {diameter}
        </p>
        <p>
          <span>Climate</span>
          {climate}
        </p>
        <p>
          <span>Gravity</span>
          {gravity}
        </p>
        <p>
          <span>Terrain</span>
          {terrain}
        </p>
        <p>
          <span>Population</span>
          {population}
        </p>
      </div>
      <h2>Famous Residents</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="resident_container">
          {famousResidents?.length !== 0 ? (
            famousResidents?.map((resident, index) => (
              <p className="resident" key={index}>
                {resident.name}
              </p>
            ))
          ) : (
            <p style={{ color: 'red', textAlign: 'center' }}>
              No Famous Residents
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PlanetInfo;
