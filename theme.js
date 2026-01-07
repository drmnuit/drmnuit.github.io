// theme.js
function applySavedTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.dataset.theme = saved;
  } else if (!root.dataset.theme) {
    root.dataset.theme = "dark"; // 初期
  }
}

function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");

  // まず保存テーマは必ず適用
  applySavedTheme();

  // ボタンが無いページでも反映
  if (!btn) return;

  const icon = btn.querySelector("i");
  setIcon(root.dataset.theme);

  if (btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";

  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
    setIcon(next);
  });

  function setIcon(theme) {
    if (!icon) return;
    icon.className = theme === "dark"
      ? "bi bi-moon-stars-fill"
      : "bi bi-sun-fill";
  }
}

window.applySavedTheme = applySavedTheme;
window.initThemeToggle = initThemeToggle;
