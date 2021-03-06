import { GET_RESIDENTS, GET_PLANETS, SET_CURRENT_PLANET } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_PLANETS: {
      return { ...state, planets: action.payload };
    }
    case SET_CURRENT_PLANET: {
      return { ...state, currentPlanet: action.payload };
    }
    case GET_RESIDENTS: {
      return { ...state, famousResidents: action.payload, loading: false };
    }
    default:
      return state;
  }
};
