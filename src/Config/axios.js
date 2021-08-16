import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://pokeapi.co/api/v2/", //url de api
});

export default clienteAxios;
