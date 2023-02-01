import "core-js/stable";
import "regenerator-runtime/runtime";

export const getJSON = function (url, message = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${message} ${response.status}`);
    return response.json();
  });
};
