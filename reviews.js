const reviews = [
  {
    title: "Elden Ring",
    platform: "PC",
    genre: "Action RPG",
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
    score: 10,
    image: "oot_remake_cover_art.jpg",
    summary: "The most significant moment in gaming happened - again.",
    url: "review-oot_remake.html"
  }
];

function renderReviews() {
  const container = document.getElementById("review-list");
  if (!container) return;

  // data-limit=" " how many reviews to show
  const limit = parseInt(container.dataset.limit, 10) || reviews.length;

  container.innerHTML = reviews
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
            <p class="review-meta">${r.platform} &bull; ${r.genre}</p>
            <p class="summary">${r.summary}</p>
            <a class="btn" href="${r.url}">Read review</a>
          </div>
        </article>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", renderReviews);
