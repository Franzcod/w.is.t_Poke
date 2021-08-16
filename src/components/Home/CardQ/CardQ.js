import React, { useState, useEffect } from "react";
import styles from "./CardQ.module.css";
// import { getNamesRandom, getInfoPokemon } from "../../../Utils/utils.js";
import obtenerOpciones from "../../../Utils/listPokemon.js";
import axios from "axios";
import Swal from "sweetalert2";

function CardQ() {
  const [pokemon, setPokemon] = useState([]);
  const [championData, setChampion] = useState([]);
  const [click, setClickState] = useState(false);
  const [loading, setLoadinge] = useState(false);

  // let dificult = 4;

  function handleClick() {
    setClickState(true);
    setTimeout(() => {
      setClickState(false);
    }, 1000);
  }

  var classNameImagen = click ? styles.imgPok_2 : styles.imgPok;

  useEffect(() => {
    setLoadinge(true);

    let grupo = obtenerOpciones(4);
    setPokemon(grupo);
    let elegido = [];
    async function getPokemons(pokemon) {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((result) => {
          elegido.push(
            result.data.name.charAt(0).toUpperCase() + result.data.name.slice(1)
          );
          elegido.push(result.data.sprites.other.dream_world.front_default);
          // console.log(result.data);

          setChampion(elegido);
        })
        .catch((err) => console.log("Error:", err));
    }

    let nroRandom = Math.floor(Math.random() * (1 + 3));
    // console.log(grupo[0].toLowerCase());
    let nombre = grupo[nroRandom].toLowerCase();

    getPokemons(nombre);

    console.log("Elegido  ", elegido);
    // setChampion(elegido);
    setLoadinge(false);
  }, []);

  return (
    <div className={styles.divRey}>
      <div className={styles.contImg}>
        {/*{loading !== true ? <h2>{championData[0]}</h2> : <h2>Cargando</h2>}*/}
        {loading !== true ? (
          <img alt="" src={championData[1]} className={classNameImagen} />
        ) : (
          // <h2>Cargando</h2>
          <img
            alt=""
            src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_800,h_600/https://codigofuente.io/wp-content/uploads/2018/09/progress.gif"
            className={styles.imgPok_2}
          />
        )}
      </div>

      <div className={styles.contBotons}>
        {pokemon.map((el) => {
          return (
            <h2 key={el} className={styles.boton} onClick={handleClick}>
              {el}
            </h2>
          );
        })}
      </div>
    </div>
  );
}

export default CardQ;

// import axios from "axios";

// function CardQ() {
//   const [data, setData] = useState({ hits: [] });

//   useEffect(async () => {
//     const result = await axios(
//       "https://hn.algolia.com/api/v1/search?query=redux"
//     );

//     setData(result.data);
//   }, []);

//   return (
//     <ul>
//       {data.hits.map((item) => (
//         <li key={item.objectID}>
//           <a href={item.url}>{item.title}</a>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default CardQ;
