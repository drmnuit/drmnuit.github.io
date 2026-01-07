// header.js
(function () {
  const MOBILE_MAX = 768; // px
  let lastScrollY = window.scrollY;

  function isMobile() {
    return window.innerWidth <= MOBILE_MAX;
  }

  function isNearBottom() {
    const scrollBottom =
      window.innerHeight + window.scrollY;
    const pageHeight =
      document.documentElement.scrollHeight;
    return pageHeight - scrollBottom < 80; // 下から80px
  }

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (!header) return;

    // PCでは常に表示
    if (!isMobile()) {
      header.classList.remove("is-hidden");
      return;
    }

    const currentY = window.scrollY;

    // ページ最上部 or 最下部では表示
    if (currentY < 60 || isNearBottom()) {
      header.classList.remove("is-hidden");
      lastScrollY = currentY;
      return;
    }

    // 下スクロール → 隠す / 上スクロール → 出す
    if (currentY > lastScrollY) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }

    lastScrollY = currentY;
  });
})();
