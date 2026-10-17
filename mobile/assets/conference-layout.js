(function() {
  "use strict";

  const layout = new URLSearchParams(window.location.search).get('layout');
  if (['balanced', 'compact', 'stacked'].includes(layout)) {
    document.body.dataset.conferenceLayout = layout;
  }

  const title = document.querySelector('.conference-title');
  if (!title) return;

  function fitTitle() {
    const lines = [...title.querySelectorAll('.conference-title-line')];
    const currentSize = parseFloat(getComputedStyle(title).fontSize);
    const longestLine = Math.max(...lines.map(line => line.getBoundingClientRect().width));
    const maximumSize = window.matchMedia('(max-width: 991.98px)').matches ? 48 : 64;
    if (longestLine > 0) {
      const fittedSize = Math.min(maximumSize, currentSize * (title.clientWidth - 2) / longestLine);
      title.style.setProperty('--conference-title-size', fittedSize + 'px');
    }
  }

  fitTitle();
  window.addEventListener('resize', fitTitle);
  document.fonts.ready.then(fitTitle);
})();
