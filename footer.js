fetch('/footer.html')
  .then(res => res.text())
  .then(html => {
    const target = document.getElementById('footer');
    if (target) target.innerHTML = html;
  });
