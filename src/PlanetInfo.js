import React, { useEffect, useState, useContext } from 'react';
import './PlanetInfo.css';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import PlanetContext from './context/Planet/planetContext';

function PlanetInfo() {
  const [planetResidents, setPlanetResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const planetContext = useContext(PlanetContext);

  const { currentPlanet } = planetContext;

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
    async function fetchResidents() {
      let results = [];
      for (let resident of residents) {
        try {
          const response = await axios.get(resident);
          results = results.concat(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      setPlanetResidents(results);
      setLoading(false);
    }

    fetchResidents();
  }, [residents]);

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
          {planetResidents.length !== 0 ? (
            planetResidents.map((resident, index) => (
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
