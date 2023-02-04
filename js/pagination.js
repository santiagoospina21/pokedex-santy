import { urlBase } from "./config";
import * as model from "./model";
import View from "./View";

class Pagination extends View {
  paginationElement = document.querySelector(".pagination");

  nextElement = document.querySelector(".next");
  previewElement = document.querySelector(".preview");
  firstElement = document.querySelector(".first");
  secondElement = document.querySelector(".second");
  thirdElement = document.querySelector(".third");
  fourthElement = document.querySelector(".fourth");
  fifthElement = document.querySelector(".fifth");
  sixthElement = document.querySelector(".sixth");
  select1 = document.getElementById("select1");

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

    window.addEventListener("click", function (e) {
      const target = e.target;
      elements.forEach((el, i) => {
        if (el === target) {
          handler(Number(target.dataset.value) + currentPage);

          if (activeIndex === i) {
            el.classList.add("active");
          } else el.classList.remove("active");
        }
      });
    });

    //Reset when changed to default option
    this.select1.addEventListener("change", function () {
      if (select1.value === "default") {
        elements.forEach((el, i) => {
          el.innerHTML = i + 1;
          if (el.classList.contains("active")) {
            el.classList.remove("active");
          }
        });
        elements[0].classList.add("active");
        count = 0;
        activeIndex = 0;
      }
    });

    let x = currentPage;

    this.nextElement.addEventListener("click", function () {
      if (select1.value === "opcion1") return;
      if (select1.value === "opcion2") return;
      if (model.pokemon.page < 892) {
        console.log(currentPage);

        currentPage = model.nextPage();
        handler(currentPage);

        activeIndex = (activeIndex + 1) % elements.length;
        count += 1;

        elements.forEach((el, i) => {
          if (count % 6 === 0) {
            elements.forEach((el) => {
              el.innerHTML = Number(el.innerHTML) + 1;
              if (el.innerHTML > Math.ceil(892 / 8)) el.classList.add("hidden");
            });
          }

          if (activeIndex === i) {
            el.classList.add("active");
          } else el.classList.remove("active");
        });
      }
    });

    this.previewElement.addEventListener("click", function () {
      if (select1.value === "opcion1") return;
      if (select1.value === "opcion2") return;
      if (model.pokemon.page > 0) {
        currentPage = model.previewPage();
        handler(currentPage);

        count -= 1;

        activeIndex = (activeIndex - 1) % elements.length;

        if (activeIndex === -1) {
          activeIndex = 5;
          elements.forEach((el) => el.classList.remove("hidden"));
        }
        elements.forEach((el, i) => {
          if ((count + 1) % 6 === 0) {
            elements.forEach((el) => {
              el.innerHTML = Number(el.innerHTML) - 1;
            });
          }

          if (activeIndex === i) {
            el.classList.add("active");
          } else el.classList.remove("active");
        });
      }
    });
  }
}

export default new Pagination();
