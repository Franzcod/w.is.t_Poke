import {
  GET_POKEMON_API,
  // GET_POKEMON_API_EXITO,
  GET_POKEMON_API_ERROR,
} from "../types/types";
// import clienteAxios from "../Config/axios";
import axios from "axios";

let numeroRandom = Math.floor(Math.random() * (1 + 100 + 1) + 1);

export const getPokemon = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${numeroRandom}`
    );
    return {
      type: GET_POKEMON_API,
      payload: res.data,
    };
  } catch (e) {
    return {
      type: GET_POKEMON_API_ERROR,
      payload: console.log(e),
    };
  }
};
