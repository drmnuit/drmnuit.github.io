// novel1/header.js
(function () {
  let lastY = window.scrollY;
  let ticking = false;

  function getNav() {
    return document.querySelector(".ep-nav");
  }

  function show(nav) { nav.classList.remove("is-hidden"); }
  function hide(nav) { nav.classList.add("is-hidden"); }

  function onScroll() {
    const nav = getNav();
    if (!nav) return;

    const y = window.scrollY;

    // ちょい上は常に見せる
    if (y < 40) {
      show(nav);
      lastY = y;
      return;
    }

    // 下スクロールで隠す / 上スクロールで出す
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

  // ボタン挙動（prev/next/top）
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;

    if (action === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // 各ページで指定したURLに飛ばす
    const prevUrl = document.body.dataset.prev;
    const nextUrl = document.body.dataset.next;

    if (action === "prev" && prevUrl) location.href = prevUrl;
    if (action === "next" && nextUrl) location.href = nextUrl;
  });

  // prev/next が無い時はボタン無効化
  function initPrevNextState() {
    const prevBtn = document.querySelector('[data-action="prev"]');
    const nextBtn = document.querySelector('[data-action="next"]');
    if (prevBtn && !document.body.dataset.prev) prevBtn.classList.add("is-disabled");
    if (nextBtn && !document.body.dataset.next) nextBtn.classList.add("is-disabled");
  }

  initPrevNextState();
})();
