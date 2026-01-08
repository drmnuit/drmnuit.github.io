(function () {
  const MOBILE_MAX = 768;
  let lastScrollY = window.scrollY;

  function isMobile() {
    return window.innerWidth <= MOBILE_MAX;
  }

  function isNearBottom() {
    const scrollBottom =
      window.innerHeight + window.scrollY;
    const pageHeight =
      document.documentElement.scrollHeight;
    return pageHeight - scrollBottom < 80;
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

    // 最上部では表示
    if (currentY < 60) {
      header.classList.remove("is-hidden");
      lastScrollY = currentY;
      return;
    }

    // 下スクロールしたら隠す（戻さない）
    if (currentY > lastScrollY) {
      header.classList.add("is-hidden");
    }

    lastScrollY = currentY;
  });
})();
