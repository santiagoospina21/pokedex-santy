import View from "./View";
import * as model from "./model";
class spriteView extends View {
  data;
  parentElement = document.querySelector(".container__pokes");
  headerElement = document.querySelector(".header");

  select1 = document.getElementById("select1");
  select2 = document.getElementById("select2");
  message = "There was a problem loading data";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);

    this.select1.addEventListener("change", function () {
      if (select1.value === "default") {
        handler();
        select2.innerHTML = "";
      }
    });
  }
}

export default new spriteView();
