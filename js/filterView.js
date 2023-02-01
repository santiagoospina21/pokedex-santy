import View from "./View";
import * as model from "./model";

class FilterView extends View {
  data;
  parentElement = document.querySelector(".pagination");
  parentElement = document.querySelector(".container__pokes");
  headerElement = document.querySelector(".header");

  nextElement = document.querySelector(".next");
  previewElement = document.querySelector(".preview");
  firstElement = document.querySelector(".first");
  secondElement = document.querySelector(".second");
  thirdElement = document.querySelector(".third");
  fourthElement = document.querySelector(".fourth");
  fifthElement = document.querySelector(".fifth");
  sixthElement = document.querySelector(".sixth");

  select1 = document.getElementById("select1");
  select2 = document.getElementById("select2");

  addHandlerType(handler) {
    this.select2.addEventListener("change", function () {
      if (this.previousElementSibling.value === "opcion1") {
        model.pokemon.page = 0;
        handler();
      }
    });
  }

  addHandlerRegion(handler) {
    this.select2.addEventListener("change", function () {
      if (this.previousElementSibling.value === "opcion2") {
        model.pokemon.page = 0;
        handler();
      }
    });
  }

  addHandlerDefaultType(handler) {
    this.select1.addEventListener("change", function () {
      if (this.value === "opcion1") {
        model.pokemon.page = 0;
        handler();
      }
    });
  }

  addHandlerDefaultRegion(handler) {
    this.select1.addEventListener("change", function () {
      if (this.value === "opcion2") {
        model.pokemon.page = 0;
        handler();
      }
    });
  }

  addHandlerPage(handler) {
    const elements = [
      this.firstElement,
      this.secondElement,
      this.thirdElement,
      this.fourthElement,
      this.fifthElement,
      this.sixthElement,
    ];
    let activeIndex = 0;
    let count = 0;
    let currentPage = 0;

    //RESET WHEN CHANGED TO OTHER OPTION
    [this.select1, this.select2].forEach((el) => {
      el.addEventListener("change", function () {
        if (select1.value === "opcion1" || select1.value === "opcion2") {
          //Reset numbers of pagination
          elements.forEach((el, i) => {
            el.innerHTML = i + 1;
            if (el.classList.contains("active")) {
              el.classList.remove("active");
            }
          });
          elements[0].classList.add("active");
          elements.forEach((el) => el.classList.remove("hidden"));
          count = 0;
          activeIndex = 0;
        }
      });
    });

    //NEXT ELEMENT
    this.nextElement.addEventListener("click", function () {
      if (model.pokemon.page < model.pokemon.numPages - 8) {
        //Current Page and Handler
        currentPage = model.nextPage();
        handler(currentPage);
        //Variables
        activeIndex = (activeIndex + 1) % elements.length;
        count += 1;
        //Sum +6 to numbers pagination
        elements.forEach((el, i) => {
          if (count % 6 === 0) {
            elements.forEach((el) => {
              el.innerHTML = Number(el.innerHTML) + 1;
              //Hidden the rest of numbers page (At the end)
              if (el.innerHTML > Math.ceil(model.pokemon.numPages / 8))
                el.classList.add("hidden");
            });
          }
          //Active Class
          if (activeIndex === i) {
            el.classList.add("active");
          } else el.classList.remove("active");
        });
      }
    });

    //PREVIEW ELEMENT
    this.previewElement.addEventListener("click", function () {
      if (select1.value === "opcion1" || select1.value === "opcion2")
        if (model.pokemon.page > 0) {
          //Current Page and Handler
          currentPage = model.previewPage();
          handler(currentPage);
          //Variables
          count -= 1;
          activeIndex = (activeIndex - 1) % elements.length;
          //Remove numbers pagination hidden
          if (activeIndex === -1) {
            activeIndex = 5;
            elements.forEach((el) => el.classList.remove("hidden"));
          }
          //Rest -6 to numbers pagination
          elements.forEach((el, i) => {
            console.log(count);
            if ((count + 1) % 6 === 0) {
              elements.forEach((el) => {
                el.innerHTML = Number(el.innerHTML) - 1;
              });
            }
            //Active Class
            if (activeIndex === i) {
              el.classList.add("active");
            } else el.classList.remove("active");
          });
        }
    });
  }
}

export default new FilterView();
