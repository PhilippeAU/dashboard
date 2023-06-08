document.addEventListener("DOMContentLoaded", function () {
  let filmes = [];

  function getMovieByGenre(genre) {
    const filmesFiltrados = filmes.filter(filme => filme.genres.includes(genre));
    exibirFilmes(filmesFiltrados);
  }

  function exibirFilmes(filmes) {
    const elementoPai = document.getElementById('filmesContainer');
    if (elementoPai) {
      elementoPai.innerHTML = ''; // Limpa o conteúdo anterior

      filmes.forEach(filme => {
        const divFilme = document.createElement('div');
        const titulo = document.createElement('h2');
        titulo.textContent = filme.title;
        divFilme.appendChild(titulo);
        elementoPai.appendChild(divFilme);
      });
    } else {
      console.error('Elemento pai não encontrado.');
    }
  }

  function parseCSV(contents) {
    const lines = contents.split("\n");
    const headers = lines[0].split(";");

    for (let i = 1; i < lines.length; i++) {
      const data = lines[i].split(";");
      const filme = {};

      for (let j = 0; j < headers.length; j++) {
        const key = headers[j].trim().replace(/"/g, '');
        const value = data[j] ? data[j].trim().replace(/"/g, '') : '';
        filme[key] = value;
      }

      filmes.push(filme);
    }

    console.log('Análise do CSV concluída.');
  }

  function getCSVContents(fileUrl) {
    fetch(fileUrl)
      .then(response => response.text())
      .then(contents => parseCSV(contents))
      .catch(error => console.error('Ocorreu um erro ao obter o conteúdo do arquivo CSV:', error));
  }

  const suggestionsBtn = document.getElementById("suggestionsButton");
  const genreOptions = document.getElementById("genreOptions");
  const genreSelect = document.getElementById("genreSelect");
  const submitGenreBtn = document.getElementById("submitGenreBtn");

  suggestionsBtn.addEventListener("click", function () {
    toggleGenreOptions();
  });

  submitGenreBtn.addEventListener("click", function () {
    submitGenre();
  });

  function submitGenre() {
    const selectedGenre = genreSelect.value;
    getMovieByGenre(selectedGenre);
  }

  const csvFileUrl = 'titles.csv';
  getCSVContents(csvFileUrl);
});

function toggleGenreOptions() {
  var genreOptions = document.getElementById("genreOptions");
  genreOptions.style.display = genreOptions.style.display === "none" ? "block" : "none";
}

function toggleMenu() {
  var dropdown = document.getElementById("menuDropdown");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

function handleMenuItemClick(item) {
  if (item === 'lançamentos') {
    window.location.href = 'lançamentos.html';
  }
  else if(item === 'inicio'){
    window.location.href = 'index.html'
  }
  console.log("Clicked item:", item);
}

function virarDiv(element) {
  element.classList.toggle("virado");
}