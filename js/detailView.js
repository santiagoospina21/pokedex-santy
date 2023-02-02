import spriteView from "./spriteView";
import * as model from "./model";
import View from "./View";

class Detailview extends View {
  parentElement = document.querySelector(".container__search");
  containerElement = document.querySelector(".container__pokes");
  cardElement;
  data1;
  btnShiny;
  message = "There was a problem loading data";
  state = false;

  addHandlerDetail(handler) {
    this.containerElement.addEventListener("click", function (e) {
      const data = e.target.closest(".container__pokes__num");
      if (!data) return;
      const { value } = data.dataset;
      model.pokemon.currentPoke = value;

      handler();
    });
  }

  changePokeBackground() {
    this.cardElement = document.querySelector(".card");
    this.btnShiny = document.querySelector(".card__header__button");

    this.cardElement.addEventListener("mouseover", function () {
      const computedStyle = window.getComputedStyle(this);
      const backgroundImage =
        computedStyle.getPropertyValue("background-image");
      this.style.backgroundImage = `url('https://raw.githubusercontent.com/santiagoospina21/pokedex-santy/master/img/Backgrounds/${model.pokemon.details.type1}.png')`;
    });
  }

  addHandlerShiny(handler) {
    this.btnShiny = document.querySelector(".card__header__button");

    this.btnShiny.addEventListener("click", function () {
      console.log(this);
      this.state = !this.state;
      console.log(this.state);
      if (this.state) {
        model.pokemon.details.image = model.pokemon.details.shiny;
        handler();
      } else {
        model.pokemon.details.image = model.pokemon.details.image;
        handler();
      }
    });
  }

  generateType2() {
    if (this.data.type2) {
      return `<img class="card__body__type2" alt="Type 2" src="https://raw.githubusercontent.com/santiagoospina21/pokedex-santy/master/img/symbols/${
        this.data.type2[0].toUpperCase() + this.data.type2.slice(1)
      }.png">`;
    } else return "";
  }

  generateType2Text() {
    if (this.data.type2) {
      return `/${this.data.type2[0].toUpperCase() + this.data.type2.slice(1)}`;
    } else return "";
  }
  generateMarkup() {
    console.log(this.data);

    return `<article class="card">

    <div class="card__header">
      <h1 class="card__header__title">${
        this.data.name[0].toUpperCase() + this.data.name.slice(1)
      } <span>#${this.data.id}</span></h1>
    <h3 class="card__header__text">${
      this.data.type1[0].toUpperCase() + this.data.type1.slice(1)
    }${this.generateType2Text()}</h3>
    <button class="card__header__button"><img src="https://raw.githubusercontent.com/santiagoospina21/pokedex-santy/master/img/shiny.png" alt="shiny " width="40px"> </button>
    
    </div>
    
   <div class="card__body">
    <div class="card__body__content">
      <img class="card__body__image" alt="Pokemon_Image" src="${
        this.data.image
      }" >
      </div> 
      <div class="card__body__type1"><img class="card__body__type1" alt="Type 1" src="https://raw.githubusercontent.com/santiagoospina21/pokedex-santy/master/img/symbols/${
        this.data.type1[0].toUpperCase() + this.data.type1.slice(1)
      }.png">
      
      ${this.generateType2()}

        
    </div>
   </div>

   <div class="card__footer">
    <div class="card__footer__stat">
      <img class="card__footer__stat" alt="Pokemon_Ataque" src="https://raw.githubusercontent.com/santiagoospina21/pokedex-santy/master/img/hp.png" width="30px">
      <h2 class="card__footer__stat">Hp</h2>
      <h2 class="both">${this.data.hp}</h2>
    </div>
    
    <div class="card__footer__stat">
      <img class="card__footer__stat" alt="Pokemon_Ataque" src="https://raw.githubusercontent.com/santiagoospina21/pokedex-santy/master/img/Ataque.png" width="30px">
      <h2 class="card__footer__stat">Atk</h2>
      <h2 class="both">${this.data.attack}</h2>
    </div>
    
    <div class="card__footer__stat">
      <img class="card__footer__stat" alt="Pokemon_Defensa" src="https://raw.githubusercontent.com/santiagoospina21/pokedex-santy/master/img/Escudo.png" width="30px">
      <h2 class="card__footer__stat">Def</h2>
      <h2 class="both">${this.data.defense}</h2>
    </div>

    <div class="card__footer__stat">
      <img class="card__footer__stat" alt="Pokemon_Ataque_Especial" src="https://raw.githubusercontent.com/santiagoospina21/pokedex-santy/master/img/baculo.png" width="60px">
      <h2 class="card__footer__stat">Atk. Spe</h2>
      <h2 class="both" >${this.data.special_attack}</h2>
    </div>

    <div class="card__footer__stat">
      <img class="card__footer__stat" alt="Pokemon_Defensa_Especial" src="https://raw.githubusercontent.com/santiagoospina21/pokedex-santy/master/img/Capa.png" width="30px">
      <h2 class="card__footer__stat"  >Def. Spe</h2>
      <h2 class="both" >${this.data.special_defense}</h2>
    </div>

    <div class="card__footer__stat">
      <img class="card__footer__stat" alt="Pokemon_Defensa_Especial" src="https://raw.githubusercontent.com/santiagoospina21/pokedex-santy/master/img/Velocidad.png" width="30px">
      <h2 class="card__footer__stat">Spe</h2>
      <h2 class="both" >${this.data.speed}</h2>
    </div>
    <div >

    </div>
   </div>
  </article>
    `;
  }
}

export default new Detailview();
