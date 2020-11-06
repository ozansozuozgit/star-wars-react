import React, { useReducer } from 'react';
import axios from 'axios';
import PlanetContext from './planetContext';
import planetReducer from './planetReducer';
import { GET_PLANETS, GET_RESIDENTS, SET_CURRENT_PLANET } from '../types';

function PlanetState(props) {
  const initialState = {
    planets: [],
    famousResidents: [],
    currentPlanet: {},
    loading: true,
  };

  const [state, dispatch] = useReducer(planetReducer, initialState);

  // Get Planets
  const getPlanets = async () => {
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
    //Filter unknown planets
    const filteredPlanets = results.filter(
      (result) => result.name !== 'unknown'
    );
    dispatch({ type: GET_PLANETS, payload: filteredPlanets });
  };

  // Set current planet
  const setCurrentPlanet = (planet) => {
    dispatch({ type: SET_CURRENT_PLANET, payload: planet });
  };

  // Get Famous Residents
  const getResidents = async (residents) => {
    let results = [];
    for (let resident of residents) {
      try {
        const response = await axios.get(resident);
        results = results.concat(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    dispatch({ type: GET_RESIDENTS, payload: results });
  };

  return (
    <PlanetContext.Provider
      value={{
        planets: state.planets,
        currentPlanet: state.currentPlanet,
        famousResidents: state.famousResidents,
        loading: state.loading,
        getPlanets,
        setCurrentPlanet,
        getResidents,
      }}
    >
      {props.children}
    </PlanetContext.Provider>
  );
}

export default PlanetState;
