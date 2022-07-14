// path = "./header.html"
// include = where to include
function importHTML({ path, include }) {
  fetch(path)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.querySelector(include).innerHTML = data;
    });
}
