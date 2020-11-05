import { GET_RESIDENTS, GET_PLANETS ,SET_CURRENT_PLANET} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_PLANETS: {
      return { ...state, planets: action.payload };
    }
    default:
      return state;
  }
};
