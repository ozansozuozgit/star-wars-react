import React, { useEffect, useState } from 'react';
import './Home.css';
import Planet from './Planet';
import axios from 'axios';
import Spinner from './Spinner';

function Home() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let i = 1;
      let results = [];
      while (true) {
        try {
          const response = await axios.get(
            `https://swapi.dev/api/planets/?page=${i}`
          );
          results = results.concat(response.data.results);
          i++;
        } catch (error) {
          console.log(error);
          break;
        }
      }
      setPlanets(results);
    }
    fetchData();
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      console.log('cleaned up');
    };
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
