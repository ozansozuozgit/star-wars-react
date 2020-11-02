import React, { useEffect, useState } from 'react';
import './PlanetInfo.css';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function PlanetInfo() {
  const location = useLocation();
  const planet = location.state.planet;
  const [planetResidents, setPlanetResidents] = useState([]);

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
    }
    
    fetchResidents();
  }, [residents]);

  return (
    <div className="planetInfo_container">
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      <h1>Planet:{name}</h1>
      <p>Rotation Period:{rotation_period}</p>
      <p>Diameter: {diameter}</p>
      <p>Climate: {climate}</p>
      <p>Gravity:{gravity}</p>
      <p>Terrain:{terrain}</p>
      <p>Population:{population}</p>
      <h2>Famous Residents:</h2>
      {planetResidents.length !== 0 ? (
        planetResidents.map((resident) => <p>{resident.name}</p>)
      ) : (
        <p>No Famous Residents</p>
      )}
    </div>
  );
}

export default PlanetInfo;
