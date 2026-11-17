const reviews = [
  {
    title: "Elden Ring",
    platform: "PC",
    genre: "Action RPG",
    year: 2022,
    added: "2026-10-10",
    score: 9.5,
    image: "ER Logo.png",
    summary: "Dying never felt so empowering. Elden Ring is the real deal.",
    url: "review-elden_ring.html"
  }
  ,
  {
    title: "Control",
    platform: "PC",
    genre: "Third-person Action",
    year: 2019,
    added: "2026-10-10",
    score: 8,
    image: "Control logo.jpg",
    summary: "Take. CONTROL. Toss a bench at someone. It's fun!",
    url: "review-control.html"
  }
  ,
  {
    title: "Resident Evil: Requiem",
    platform: "PC",
    genre: "Survival Horror",
    year: 2026,
    added: "2026-10-10",
    score: 8,
    image: "RE9 Cover Art.jpg",
    summary: "The best of both worlds, for better or for worse.",
    url: "review-RE9.html"
  }
  ,
  {
    title: "Dark Souls",
    platform: "PC",
    genre: "Action RPG",
    year: 2011,
    added: "2026-10-14",
    score: 8,
    image: "Dark Souls Box Art.jfif",
    summary: "Hand it over, that thing, your dark soul...",
    url: "review-dark_souls.html"
  }
  ,
  {
    title: "Zelda: Ocarina of Time (2026)",
    platform: "PC",
    genre: "Third-person Action Adventure",
    year: 2026,
    added: "2026-10-14",
    score: 10,
    image: "oot_remake_cover_art.jpg",
    summary: "The most significant moment in gaming happened - again.",
    url: "review-oot_remake.html"
  }
];

// Current sort: which field, and direction ("asc" or "desc")
const sortState = { key: "added", dir: "desc" };

// How each sort option compares two reviews
const sorters = {
  // "YYYY-MM-DD" strings sort correctly as plain text
  added: function (a, b) { return a.added.localeCompare(b.added); },
  year: function (a, b) { return a.year - b.year; },
  score: function (a, b) { return a.score - b.score; },
  genre: function (a, b) { return a.genre.localeCompare(b.genre); }
};

function getSortedReviews() {
  const compare = sorters[sortState.key];
  const direction = sortState.dir === "asc" ? 1 : -1;
  // Original array is never changed
  // Ties fall back to title so the order is stable
  return reviews.slice().sort(function (a, b) {
    return compare(a, b) * direction || a.title.localeCompare(b.title);
  });
}
// The actual container!
function renderReviews() {
  const container = document.getElementById("review-list");
  if (!container) return;

  // data-limit=" " how many reviews to show, container.dataset.limit is radix 
  const limit = parseInt(container.dataset.limit, 10) || reviews.length;

  container.innerHTML = getSortedReviews()
    .slice(0, limit)
    .map(function (r) {
      return `
        <article class="review-card">
          <a href="${r.url}"><img src="${r.image}" alt="${r.title} cover art"></a>
          <div class="review-card-body">
            <div class="review-card-top">
              <h3>${r.title}</h3>
              <span class="score-badge">${r.score}</span>
            </div>
            <p class="review-meta">${r.platform} &bull; ${r.genre} &bull; ${r.year}</p>
            <p class="summary">${r.summary}</p>
            <a class="btn" href="${r.url}">Read review</a>
          </div>
        </article>`;
    })
    .join("");
}

// Builds the sort controls and puts them above the list
function setupSortControls() {
  const container = document.getElementById("review-list");
  if (!container) return;

  // Only show controls on pages that list every review
  if (container.dataset.limit) return;

  const controls = document.createElement("div");
  controls.className = "sort-controls";
  controls.innerHTML = `
    <label for="sort-key">Sort by</label>
    <select id="sort-key">
      <option value="added">Date added</option>
      <option value="score">Score</option>
      <option value="year">Year</option>
      <option value="genre">Type</option>
    </select>
    <button type="button" id="sort-dir" aria-label="Toggle sort direction"></button>`;
  container.parentNode.insertBefore(controls, container);

  const keySelect = controls.querySelector("#sort-key");
  const dirButton = controls.querySelector("#sort-dir");

  function updateButton() {
    dirButton.textContent = sortState.dir === "asc" ? "\u2191 Ascending" : "\u2193 Descending";
  }

  keySelect.value = sortState.key;
  updateButton();

  keySelect.addEventListener("change", function () {
    sortState.key = keySelect.value;
    // May eventually build to topic i.e. review, retrospective, may use this whole script for another website built around topics...
    sortState.dir = sortState.key === "genre" ? "asc" : "desc";
    updateButton();
    renderReviews();
  });

  dirButton.addEventListener("click", function () {
    sortState.dir = sortState.dir === "asc" ? "desc" : "asc";
    updateButton();
    renderReviews();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupSortControls();
  renderReviews();
});