import "core-js/stable";
import "regenerator-runtime/runtime";
import { getJSON } from "./helpers";
import { urlBase, urlByName } from "./config";
import { async } from "regenerator-runtime";

export const pokemon = {
  sprites: [],
  page: 0,
  details: {},
  numPages: 0,
};

export const pokemonSprite = async function (url) {
  try {
    const { results } = await getJSON(url);

    const urls = results.map((el) => el.url);

    const requests = urls.map(getJSON);

    const data = await Promise.all(requests);

    pokemon.sprites = data
      .map((el) => {
        if (el.id <= 905) {
          return {
            name: el.name,
            id: el.id,
            image: el.sprites.front_default,
          };
        } else return;
      })
      .filter((el) => el !== undefined);
  } catch (err) {
    throw err;
  }
};

//PAGINATION

export const pokemonPage = async function (url) {
  await pokemonSprite(url);
};

//DATA DETAIL POKEMON

export const loadDataPokemon = async function (url) {
  try {
    const data = await getJSON(url);

    pokemon.details = {
      name: data.name,
      id: data.id,
      currentImage: "",
      image: data.sprites["other"]["official-artwork"].front_default,
      shiny: data.sprites["other"]["official-artwork"].front_shiny,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      special_attack: data.stats[3].base_stat,
      special_defense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      type1: data.types[0].type.name,
      type2: data.types[1]?.type.name,
    };
  } catch (err) {
    throw err;
  }
};

//Search by Pokemon name
export const loadPokeByName = async function (query) {
  try {
    const data = await getJSON(`${urlByName}${query}`);
    console.log(data);
    pokemon.sprites = {
      name: data.name,
      id: data.id,
      image: data.sprites.front_default,
    };
    console.log(pokemon.sprites);
  } catch (err) {
    throw err;
  }
};

//Filter
const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");

const types = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy",
];

const regions = [
  "Kanto",
  "Johto",
  "Hoenn",
  "Sinnoh",
  "Unova",
  "Kalos",
  "Alola",
  "Galar",
];

select1.onchange = function () {
  if (this.value === "opcion1") {
    select2.innerHTML = "";
    types.forEach((element, id) => {
      select2.innerHTML += `"<option  data-value='${id}' >${element}</option>"`;
    });
  } else if (this.value === "opcion2") {
    select2.innerHTML = "";
    regions.forEach((element, id) => {
      select2.innerHTML += `"<option data-value='${id}'>${element}</option>"`;
    });
  }
};

export const loadPokebyType = async function () {
  try {
    const type =
      select2.options[select2.selectedIndex].getAttribute("data-value");

    const data = await getJSON(
      `https://pokeapi.co/api/v2/type/${Number(type) + 1}/`
    );
    const slot = data.pokemon;

    const urls = slot.map((el) => el.pokemon.url);

    const requests = urls.map(getJSON);

    const pokes = await Promise.all(requests);

    pokemon.sprites = pokes
      .map((el) => {
        if (el.id >= 906) return;
        return {
          name: el.name,
          id: el.id,
          image: el.sprites.front_default,
        };
      })
      .filter((el) => el !== undefined);
    pokemon.numPages = Math.trunc(pokemon.sprites.length);
  } catch (err) {
    throw err;
  }
};

export const loadPokeByRegion = async function () {
  try {
    const region =
      select2.options[select2.selectedIndex].getAttribute("data-value");

    const { pokemon_species } = await getJSON(
      `https://pokeapi.co/api/v2/generation/${Number(region) + 1}`
    );

    const urls = pokemon_species.map((el) => el.url);

    const requests = await urls.map(getJSON);

    const data = await Promise.all(requests);

    const pokemonsData = data.map((el) => el.id);

    pokemonsData.sort(function (a, b) {
      return a - b;
    });

    const newData = pokemonsData.map((el) => getJSON(`${urlByName}${el}`));

    const pokes = await Promise.all(newData);

    pokemon.sprites = pokes.map((el) => {
      return {
        name: el.name,
        id: el.id,
        image: el.sprites.front_default,
      };
    });
    pokemon.numPages = Math.trunc(pokemon.sprites.length);
  } catch (err) {
    throw err;
  }
};
