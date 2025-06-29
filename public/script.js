function loadGenre(genre) {
  fetch(`/api/movies?genre=${genre}`)
    .then(res => res.json())
    .then(data => renderMovies(data));
}

function renderMovies(movies) {
  const container = document.getElementById("movies-container");
  container.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="images/${movie.thumbnail}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.genre}</p>
    `;
    card.onclick = () => showTrailer(movie.title, movie.trailer);
    container.appendChild(card);
  });
}

function showTrailer(title, trailerUrl) {
  document.getElementById("trailer-title").textContent = title;
  document.getElementById("trailer-frame").src = trailerUrl;
  document.getElementById("trailer-modal").classList.remove("hidden");
}

document.getElementById("close-btn").onclick = () => {
  document.getElementById("trailer-modal").classList.add("hidden");
  document.getElementById("trailer-frame").src = "";
};

window.onload = () => loadGenre("All");
