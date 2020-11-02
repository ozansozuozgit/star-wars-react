import React, { useEffect, useState } from 'react';
import './Home.css';
import Planet from './Planet';
import axios from 'axios';

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
    <div className="planet_list_container">
      {planets &&
        planets.map((planet, index) => <Planet planet={planet} key={index} />)}
    </div>
  );
}

export default Home;
