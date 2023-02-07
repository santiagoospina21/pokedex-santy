import "core-js/stable";
import { async } from "regenerator-runtime";
import "regenerator-runtime/runtime";

import { getJSON } from "./helpers";
import * as model from "./model";
import SpriteView from "./spriteView.js";
import Pagination from "./pagination";
import Detailview from "./detailView";
import SearchView from "./searchView";
import FilterView from "./filterView";
import { urlBase, urlByName } from "./config";

/**
 * 1. Esten los primeros 8 pokemons renderizados en la parte izquierda de manera inicial
 * 2. Si la persona pasa las flechas se renderizaran los siguientes 8 pokemons y asi sucesivamente
 * 3. La persona puede buscar un pokemon especifico en la barra de busqueda
 * 4. La persona al undir click en algun pokemon de la izquierda, se renderiza a la derecha con mayor cantidad de datos y detalles
 * Opcional: Filtros de busqueda por tipo de pokemon, etc.
 */

const controlPokemonSprite = async function () {
  try {
    //0) Render Spinner
    SpriteView.renderSpinner();
    //1) Charged sprites info
    await model.pokemonSprite(urlBase);
    //2) Render sprites
    SpriteView.renderSprite(model.pokemon.sprites);
  } catch (err) {
    SpriteView.renderError();
  }
};

const controlPagination = async function (page) {
  if (select1.value === "opcion1") return;
  if (select1.value === "opcion2") return;

  //1) Charge new array pokemon sprite (next 8 poke)
  if (model.pokemon.page < 904) {
    await model.pokemonPage(
      `https://pokeapi.co/api/v2/pokemon?offset=${page}jajaj&limit=8`
    );
  }

  //2) Render NEW results
  SpriteView.renderSprite(model.pokemon.sprites);
};

const controlPokemonDetail = async function () {
  try {
    //1) Load currentPoke Data
    await model.loadDataPokemon(`${urlByName}${model.pokemon.currentPoke}`);

    //2) Render details Poke
    Detailview.renderSprite(model.pokemon.details);

    //3) Change backgrounds
    Detailview.changePokeBackground();

    //4) Shiny control
    Detailview.addHandlerShiny(controlShiny);

    return;
  } catch (err) {
    Detailview.renderError();
  }
};

const controlShiny = async function () {
  //1) Render Shiny Sprite
  Detailview.renderSprite(model.pokemon.details);
  //2) Change backgrounds
  Detailview.changePokeBackground();
  //3) Shiny control
  Detailview.addHandlerShiny(controlShiny);
};

const controlSearchByName = async function () {
  try {
    //0)Render Spinner
    SearchView.renderSpinner();

    //1)Get pokemon query
    const query = SearchView.getQuery();

    //2) Load pokemon query
    await model.loadPokeByName(query);

    //3)Render pokemon query
    SearchView.renderSprite(model.pokemon.sprites);
  } catch (err) {
    SearchView.renderError();
  }
};

const controlSearchByType = async function () {
  //0)Render Spinner
  FilterView.renderSpinner();

  //1)Load pokemon by Type
  await model.loadPokebyType();

  //2)Render pokemon by type
  FilterView.renderSprite(model.pokemon.sprites.slice(0, 8));
};

const controlSearchByRegion = async function () {
  //0)Render Spinner
  FilterView.renderSpinner();

  //1)Load pokemon by Region
  await model.loadPokeByRegion();

  //2)Render pokemon by Region
  FilterView.renderSprite(model.pokemon.sprites.slice(0, 8));
};

const paginationFilter = async function (page) {
  SpriteView.renderSpinner();
  //1)Render pokemon (Filter)
  FilterView.renderSprite(model.pokemon.sprites.slice(page, 8 + page));
};

const init = function () {
  SpriteView.addHandlerRender(controlPokemonSprite);
  Pagination.addHandlerPage(controlPagination);
  Detailview.addHandlerDetail(controlPokemonDetail);
  SearchView.addHandlerSearch(controlSearchByName);
  FilterView.addHandlerType(controlSearchByType);
  FilterView.addHandlerPage(paginationFilter);
  FilterView.addHandlerDefaultType(controlSearchByType);
  FilterView.addHandlerRegion(controlSearchByRegion);
  FilterView.addHandlerDefaultRegion(controlSearchByRegion);
};
init();
