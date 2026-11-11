const reviews = [
  {
    title: "Elden Ring",
    platform: "PC",
    genre: "Action RPG",
    score: 9,
    image: "ER Logo.png",
    summary: "Dying never felt so empowering. Elden Ring is the real deal.",
    url: "review-elden_ring.html"
  }
  // , { ...next review goes here, separated by a comma }
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
          <img src="${r.image}" alt="${r.title} cover art">
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
