class Serie {
  constructor(id, url, name, language, genres, image) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.language = language;
    this.genres = genres;
    this.image = image;
  }

  toJsonString() {
    return JSON.stringify({
      id: this.id,
      url: this.url,
      name: this.name,
      language: this.language,
      genres: this.genres,
      image: this.image,
    });
  }

  static createFromJsonString(json) {
    const obj = JSON.parse(json);
    return new Serie(obj.id, obj.url, obj.name, obj.language, obj.genres, obj.image);
  }

  createHtmlElement() {
    const card = document.createElement('div');
    card.classList.add('card-serie');

    const img = document.createElement('img');
    img.src = this.image;
    img.alt = this.name;
    img.addEventListener('click', () => {
      window.open(this.url, '_blank');
    });

    const title = document.createElement('h3');
    title.textContent = this.name;

    const lang = document.createElement('p');
    lang.textContent = `Idioma: ${this.language}`;

    const gen = document.createElement('p');
    gen.textContent = `Géneros: ${this.genres.join(', ')}`;

    const btnGuardar = document.createElement('button');
    btnGuardar.textContent = 'Guardar';
    btnGuardar.addEventListener('click', () => {
      Serie.guardarSerie(this);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(lang);
    card.appendChild(gen);
    card.appendChild(btnGuardar);

    return card;
  }

  static guardarSerie(serie) {
    let guardadas = JSON.parse(localStorage.getItem('seriesGuardadas')) || [];
    if (!guardadas.some(s => s.id === serie.id)) {
      guardadas.push(JSON.parse(serie.toJsonString()));
      localStorage.setItem('seriesGuardadas', JSON.stringify(guardadas));
      alert(`Serie "${serie.name}" guardada.`);
    } else {
      alert(`La serie "${serie.name}" ya fue guardada.`);
    }
  }
}
