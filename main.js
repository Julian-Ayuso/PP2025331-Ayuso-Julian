let paginaActual = 1;
const seriesPorPagina = 6;

document.addEventListener('DOMContentLoaded', () => {
  cargarSeries();

  document.getElementById('anterior').addEventListener('click', paginaAnterior);
  document.getElementById('siguiente').addEventListener('click', paginaSiguiente);
});

function cargarSeries() {
  const contenedor = document.getElementById('series');
  contenedor.innerHTML = '';

  const inicio = (paginaActual - 1) * seriesPorPagina + 1;
  const peticiones = [];

  for (let i = 0; i < seriesPorPagina; i++) {
    const id = inicio + i;
    peticiones.push(fetch(`https://api.tvmaze.com/shows/${id}`).then(res => res.json()));
  }

  Promise.all(peticiones)
    .then(data => {
      data.forEach(serieData => {
        const serie = new Serie(
          serieData.id,
          serieData.url,
          serieData.name,
          serieData.language,
          serieData.genres,
          serieData.image?.medium || ''
        );
        const elemento = serie.createHtmlElement();
        contenedor.appendChild(elemento);
      });
    })
    .catch(error => {
      console.error('Error al cargar series:', error);
    });
}

function paginaSiguiente() {
  paginaActual++;
  cargarSeries();
}

function paginaAnterior() {
  if (paginaActual > 1) {
    paginaActual--;
    cargarSeries();
  }
}
