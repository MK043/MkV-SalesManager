(function () {
  var t = localStorage.getItem('servis-dashboard-theme');
  if (t !== 'dark' && t !== 'light') {
    t = 'dark';
  }
  var bg = t === 'dark' ? '#0c0d11' : '#f4f5f7';
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.style.background = bg;
  document.documentElement.style.colorScheme = t;
  // Акцентный цвет, выбранный посетителем, ставим до отрисовки, чтобы не мигал фиолетовый.
  try {
    var a = localStorage.getItem('avto-accent');
    if (a && a !== 'violet') document.documentElement.setAttribute('data-accent', a);
  } catch (e) {}
})();
