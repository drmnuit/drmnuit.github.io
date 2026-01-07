// async function loadInclude(selector, url) {
//   const mount = document.querySelector(selector);
//   if (!mount) return;

//   const res = await fetch(url, { cache: "no-cache" });
//   if (!res.ok) return;

//   mount.innerHTML = await res.text();

//   // ヘッダー挿入後に移動（landingだけ）
//   if (document.body.classList.contains("landing")) {
//     const slot = document.querySelector(".theme-slot");
//     const toggleLi = document.querySelector("#themeToggle")?.closest("li");
//     if (slot && toggleLi) slot.appendChild(toggleLi);
//   }

//   // 移動後に初期化（重要）
//   if (typeof window.initThemeToggle === "function") {
//     window.initThemeToggle();
//   }
// }

// loadInclude("#siteHeader", "/header-main.html");


// ----------------------


// async function loadInclude(selector, url) {
//   const mount = document.querySelector(selector);
//   if (!mount) return;

//   const res = await fetch(url, { cache: "no-cache" });
//   if (!res.ok) return;

//   mount.innerHTML = await res.text();

//   // landing のときだけ、トグルを theme-slot に移動（ヘッダー挿入後にやる）
//   if (document.body.classList.contains("landing")) {
//     const slot = document.querySelector(".theme-slot");
//     const toggleLi = document.querySelector("#themeToggle")?.closest("li");
//     if (slot && toggleLi) slot.appendChild(toggleLi);
//   }

//   // トグルの移動後にテーマ初期化（重要）
//   if (typeof window.initThemeToggle === "function") {
//     window.initThemeToggle();
//   }
// }

// loadInclude("#siteHeader", "/header-ep.html");

async function loadInclude(selector) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  const url = mount.dataset.include;
  if (!url) return;

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) return;

  mount.innerHTML = await res.text();

  // landing のときだけ、トグルを theme-slot に移動（ヘッダー挿入後にやる）
  if (document.body.classList.contains("landing")) {
    const slot = document.querySelector(".theme-slot");
    const toggleLi = document.querySelector("#themeToggle")?.closest("li");
    if (slot && toggleLi) slot.appendChild(toggleLi);
  }

  // トグルの移動後にテーマ初期化
  if (typeof window.initThemeToggle === "function") {
    window.initThemeToggle();
  }
}

loadInclude("#siteHeader");
