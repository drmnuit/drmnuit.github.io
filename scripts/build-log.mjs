import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "_posts");

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// 超簡易 front matter parser（--- で始まるときだけ）
function parseFrontMatter(md) {
  const trimmed = md.replace(/^\uFEFF/, ""); // BOM保険
  if (!trimmed.startsWith("---\n") && !trimmed.startsWith("---\r\n")) {
    return { data: {}, content: md };
  }

  const lines = trimmed.split(/\r?\n/);
  // 1行目は ---
  let i = 1;
  const data = {};
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "---") {
      i++;
      break;
    }
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2] ?? "";
    // "..." や '...' を外す
    val = val.replace(/^["']/, "").replace(/["']$/, "");
    data[key] = val;
  }
  const content = lines.slice(i).join("\n");
  return { data, content };
}

// 最低限のMarkdown→HTML（依存ゼロ）
function mdToHtml(md) {
  const blocks = md
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/) // 空行で段落
    .map(b => b.trim())
    .filter(Boolean);

  return blocks
    .map(block => {
      // まずHTMLエスケープ
      let s = escapeHtml(block);

      // インライン：`code`
      s = s.replace(/`([^`]+)`/g, "<code>$1</code>");

      // インライン：**bold**
      s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

      // インライン：*italic*
      s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");

      // リンク：[text](url)
      s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, `<a href="$2" target="_blank" rel="noopener">$1</a>`);

      // 段落内改行は <br>
      s = s.replace(/\n/g, "<br>");

      return `<p>${s}</p>`;
    })
    .join("\n");
}

const files = fs.existsSync(POSTS_DIR)
  ? fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md"))
  : [];

const posts = files.map((file) => {
  const full = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = parseFrontMatter(raw);

  const title = String(data.title ?? file.replace(/\.md$/, ""));
  const date = String(data.date ?? file.slice(0, 10)); // "2026-01-06"
  const html = mdToHtml(content);

  return { title, date, html };
});

// 新しい順
posts.sort((a, b) => (a.date < b.date ? 1 : -1));

fs.writeFileSync(
  path.join(process.cwd(), "log.json"),
  JSON.stringify(posts, null, 2),
  "utf8"
);

console.log(`Generated log.json (${posts.length} posts)`);
