// /ep-nav.js
(function () {
  let lastY = window.scrollY;
  let ticking = false;

  function getNav() {
    return document.querySelector(".ep-nav");
  }

  function show(nav) { nav.classList.remove("is-hidden"); }
  function hide(nav) { nav.classList.add("is-hidden"); }

  // ★追加：prev/next の表示/無効化を反映
  function applyPrevNext() {
    const nav = getNav();
    if (!nav) return;

    const prevBtn = nav.querySelector('[data-action="prev"]');
    const nextBtn = nav.querySelector('[data-action="next"]');

    const prevUrl = document.body.dataset.prev || "";
    const nextUrl = document.body.dataset.next || "";

    if (prevBtn) {
      prevBtn.style.display = prevUrl ? "" : "none";
      prevBtn.classList.toggle("is-disabled", !prevUrl);
    }
    if (nextBtn) {
      nextBtn.style.display = nextUrl ? "" : "none";
      nextBtn.classList.toggle("is-disabled", !nextUrl);
    }
  }

  function onScroll() {
    const nav = getNav();
    if (!nav) return;

    const y = window.scrollY;

    if (y < 40) {
      show(nav);
      lastY = y;
      return;
    }

    if (y > lastY) hide(nav);
    else show(nav);

    lastY = y;
  }

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  }, { passive: true });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;

    if (action === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const prevUrl = document.body.dataset.prev;
    const nextUrl = document.body.dataset.next;

    if (action === "prev" && prevUrl) location.href = prevUrl;
    if (action === "next" && nextUrl) location.href = nextUrl;
  });

  // ★追加：nav差し込み/データセット更新の「後」でも追従する
  const mo = new MutationObserver(() => applyPrevNext());
  mo.observe(document.body, { childList: true, subtree: true, attributes: true });

  // 初回も一応
  applyPrevNext();
})();
