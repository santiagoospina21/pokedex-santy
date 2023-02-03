import View from "./View";

class SearchView extends View {
  data;
  parentElement = document.querySelector(".container__pokes");
  formElement = document.querySelector(".form");
  btnPoke = document.querySelector(".poke__btn");
  headerElement = document.querySelector(".header");

  message = "Wrong Pokemon. Try again!";

  addHandlerSearch(handler) {
    this.formElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
      this.children[0].value = "";
      this.children[0].blur();
    });

    this.btnPoke.addEventListener("click", function () {
      handler();
      this.previousElementSibling.children[0].value = "";
      this.previousElementSibling.children[0].blur();
    });
  }

  getQuery() {
    const query = this.formElement.querySelector(".search__input").value;
    console.log(query);
    return query;
  }

  generateMarkup() {
    console.log(this.data);
    const markup = `<div  class="container__pokes__num" data-value="${
      this.data.name
    }">
    <h3 class="names">#${this.data.id} ${
      this.data.name[0].toUpperCase() + this.data.name.slice(1)
    }</h3>
    <img class="poke" alt="poke_1"   src="  ${this.data.image}" > </div>`;

    return markup;
  }
}

export default new SearchView();
