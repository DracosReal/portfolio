// Jim Folliard portfolio: small helpers shared by every page.
(function () {
  // The address is assembled here so it never sits in the page as plain text.
  var codes = [106, 106, 102, 111, 108, 108, 105, 97, 114, 100, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];
  function address() {
    return codes.map(function (c) { return String.fromCharCode(c); }).join('');
  }

  document.querySelectorAll('[data-email]').forEach(function (el) {
    el.addEventListener('click', function () {
      window.location.href = 'mailto:' + address();
    });
  });

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // If an image can't load (moved, renamed, or a host goes away), hide it
  // rather than show a broken-image icon. A card keeps its tinted panel.
  document.querySelectorAll('img').forEach(function (img) {
    function fail() {
      var media = img.closest('.work-media');
      var figure = img.closest('figure');
      if (media) { media.classList.add('media-missing'); img.remove(); }
      else if (figure) { figure.hidden = true; }
    }
    // SVGs without a set size report no natural width even when they load fine.
    var isSvg = /\.svg(\?|#|$)/i.test(img.getAttribute('src') || '');
    if (!isSvg && img.complete && img.naturalWidth === 0 && img.getAttribute('src')) fail();
    else img.addEventListener('error', fail);
  });

  // Same behavior as the original site: no right-click or drag on images.
  document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
})();
