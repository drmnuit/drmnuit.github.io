// vega.js（一覧の既読表示）
(() => {
  const read = JSON.parse(localStorage.getItem("readEpisodes") || "[]");

  document.querySelectorAll(".episode-link").forEach(link => {
    const ep = link.dataset.ep;
    if (ep && read.includes(ep)) {
      link.classList.add("is-read");
    }
  });
})();
