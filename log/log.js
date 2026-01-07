async function loadLog() {
  const list = document.getElementById("logList");
  const dlg = document.getElementById("logDialog");
  const closeBtn = document.getElementById("closeDialog");
  const t = document.getElementById("dlgTitle");
  const d = document.getElementById("dlgDate");
  const b = document.getElementById("dlgBody");

  const res = await fetch("/log.json?v=" + Date.now(), { cache: "no-cache" });
  if (!res.ok) {
    list.textContent = "log.jsonが見つからない。Actionsがまだ生成してないかも。";
    return;
  }
  const posts = await res.json(); // [{title,date,html}, ...]

  list.innerHTML = "";
  posts.forEach((p) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "log-item";
    btn.innerHTML = `
      <span class="log-item-title">${escapeHtml(p.title)}</span>
      <span class="log-item-date small">${formatDate(p.date)}</span>
    `;
    btn.addEventListener("click", () => {
      t.textContent = p.title;
      d.textContent = formatDate(p.date);
      b.innerHTML = p.html; // Actions側で安全に生成したHTMLを想定
      dlg.showModal();
    });
    list.appendChild(btn);
  });

  closeBtn.addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => {
    const rect = dlg.getBoundingClientRect();
    const inDialog = rect.top <= e.clientY && e.clientY <= rect.bottom
      && rect.left <= e.clientX && e.clientX <= rect.right;
    if (!inDialog) dlg.close();
  });
}

function formatDate(iso) {
  // "2026-01-06" -> "2026.01.06"
  return String(iso).replaceAll("-", ".");
}
function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

loadLog();
