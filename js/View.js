export default class View {
  messageElement = document.querySelector(".container__pokes");

  renderSprite(data) {
    if (!data) return;
    this.data = data;

    const markup = this.generateMarkup();
    this.parentElement.innerHTML = "";
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  generateMarkup() {
    const markup = this.data.map((el) => this.generatePokeSprites(el)).join("");
    return markup;
  }

  generatePokeSprites(el) {
    return `<div  class="container__pokes__num" data-value="${el.name}">
      <h3 class="names">#${el.id} ${
      el.name[0].toUpperCase() + el.name.slice(1)
    }</h3>
      <img class="poke" alt="poke_1"   src="  ${el.image}" > </div>`;
  }

  renderSpinner() {
    const markup = `
    <div class="pokeball"></div>`;

    this.parentElement.innerHTML = "";
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this.message) {
    const markup = ` <a class="poke__message1" href="#">
    <img src="http://localhost/files/Pokebola.jpg" width="35px" alt="Button">
    
  </a><h3>${message} </h3> <a class="poke__message2" href="#">
  <img src="http://localhost/files/Pokebola.jpg" width="35px" alt="Button">
  
</a>`;
    this.parentElement.innerHTML = "";
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
