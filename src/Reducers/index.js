//
import {
  GET_POKEMON_API,
  GET_POKEMON_API_EXITO,
  GET_POKEMON_API_ERROR,
} from "../types/types";
// Estado inicial
const initialState = {
  pokemon: [],
  error: null,
  loading: false,
};

const pokeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Aca va tu codigo;
    case GET_POKEMON_API:
      return [...state, { ...payload }];
    case GET_POKEMON_API_EXITO:
      return [...state, { ...payload }];
    case GET_POKEMON_API_ERROR:
      return [...state, { ...payload }];

    default:
      return state;
  }
};

export default pokeReducer;
