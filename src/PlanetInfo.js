import React, { useEffect, useState } from 'react';
import './PlanetInfo.css';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

function PlanetInfo() {
  const location = useLocation();
  const planet = location.state.planet;
  const [planetResidents, setPlanetResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    name,
    rotation_period,
    diameter,
    gravity,
    climate,
    terrain,
    population,
    residents,
  } = planet;

  useEffect(() => {
    async function fetchResidents() {
      let results = [];
      for (let i = 0; i < residents.length; i++) {
        let residentID = residents[i].match(/people\/(\d+)/)[1];
        try {
          const response = await axios.get(
            `http://swapi.dev/api/people/${residentID}`
          );
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
            <p style={{ color: 'red' }}>No Famous Residents</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PlanetInfo;
