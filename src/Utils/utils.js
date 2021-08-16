export function mezclarArreglo(arreglo) {
  for (let i = arreglo.length - 1; i > 0; i--) {
    let indiceAleatorio = Math.floor(Math.random() * (i + 1));
    let temporal = arreglo[i];
    arreglo[i] = arreglo[indiceAleatorio];
    arreglo[indiceAleatorio] = temporal;
  }
}

// //cambiar para tener mas o menos nombre de opciones, se puede diseñar algun tipo de dificultad

// // Obtiene N(dificult) nombres de pokemons
export function getNamesRandom(dificult) {
  let pokemonsList = [];
  // console.log(resp);
  for (let i = 0; i < dificult; i++) {
    let numeroRandom = Math.floor(Math.random() * (1 + 100 + 1) + 1);
    fetch(`https://pokeapi.co/api/v2/pokemon/${numeroRandom}`)
      .then((r) => r.json())
      .then((recurso) => {
        if (recurso !== undefined) {
          const poke = {
            name: recurso.name.charAt(0).toUpperCase() + recurso.name.slice(1),
            img: recurso.sprites.other.dream_world.front_default,
          };
          pokemonsList.push(poke);
        } else {
          alert("Error en base de datos, vuelva a cargar");
        }
      });
  }
  return pokemonsList;
}

export function getInfoPokemon(pokemon) {
  // let numeroRandom = Math.floor(Math.random() * (1 + 100 + 1) + 1);
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((r) => r.json())
    .then((recurso) => {
      //   console.log("util ", recurso.name);
      if (recurso !== undefined) {
        const poke = {
          name: recurso.name,
          img: recurso.sprites.other.dream_world.front_default,
        };
        return poke.name;
      } else {
        alert("Error en base de datos, vuelva a cargar");
      }
    });
}
