(function () {
  'use strict';
  var overlay = document.getElementById('formOverlay');
  var frame = document.getElementById('formFrame');
  var opener = null;
  var localFile = location.protocol === 'file:';
  var messageOrigin = localFile ? '*' : location.origin;

  // A normal web server resolves a route such as `beyond-belief/` to its
  // index file. A direct file preview does not, so make only that preview
  // explicit while leaving the public, canonical links clean.
  if (localFile) {
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.endsWith('/') && !/^(?:[a-z]+:|\/\/|#)/i.test(href)) {
        link.setAttribute('href', href + 'index.html');
      }
    });
  }

  var headerMain = document.querySelector('.header-main');
  var primaryNav = document.querySelector('.primary-nav');
  if (headerMain && primaryNav) {
    var routeToggle = document.createElement('button');
    var routeSheet = document.createElement('div');
    var routeLinks = primaryNav.cloneNode(true);
    routeToggle.type = 'button';
    routeToggle.className = 'mobile-route-toggle';
    routeToggle.textContent = 'Explore +';
    routeToggle.setAttribute('aria-expanded', 'false');
    routeToggle.setAttribute('aria-controls', 'mobileRouteSheet');
    routeSheet.className = 'mobile-route-sheet';
    routeSheet.id = 'mobileRouteSheet';
    routeSheet.setAttribute('aria-hidden', 'true');
    routeLinks.className = 'mobile-route-links';
    routeSheet.appendChild(routeLinks);
    headerMain.insertBefore(routeToggle, headerMain.querySelector('.top-action'));
    document.body.appendChild(routeSheet);

    function closeRoutes() {
      routeSheet.classList.remove('open');
      routeSheet.setAttribute('aria-hidden', 'true');
      routeToggle.setAttribute('aria-expanded', 'false');
      routeToggle.textContent = 'Explore +';
      document.body.classList.remove('route-open');
    }
    routeToggle.addEventListener('click', function () {
      var open = !routeSheet.classList.contains('open');
      if (open) {
        routeSheet.classList.add('open');
        routeSheet.setAttribute('aria-hidden', 'false');
        routeToggle.setAttribute('aria-expanded', 'true');
        routeToggle.textContent = 'Close −';
        document.body.classList.add('route-open');
      } else closeRoutes();
    });
    routeLinks.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeRoutes); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && routeSheet.classList.contains('open')) { closeRoutes(); routeToggle.focus(); }
    });
  }

  if (!overlay || !frame) return;

  function openForm(event) {
    event.preventDefault();
    opener = event.currentTarget;
    var targetUrl = opener.href;
    if (frame.src !== targetUrl) frame.src = targetUrl;
    var isWaitlist = new URL(targetUrl).searchParams.get('mode') === 'waitlist';
    overlay.setAttribute('aria-label', isWaitlist ? 'Join the Beyond Belief waitlist' : 'Write to John');
    frame.title = isWaitlist ? 'Beyond Belief waitlist · Space to Be' : 'Write to John · Space to Be';
    document.body.classList.add('form-open');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    try { frame.contentWindow.postMessage('spacetobe:open', messageOrigin); } catch (_) {}
  }

  function closeForm() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('form-open');
    if (opener) opener.focus({ preventScroll: true });
  }

  document.querySelectorAll('a[href*="start.html"]').forEach(function (link) {
    link.addEventListener('click', openForm);
  });
  window.addEventListener('message', function (event) {
    if (event.source === frame.contentWindow && (localFile || event.origin === location.origin) && event.data === 'spacetobe:close-form') closeForm();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && overlay.classList.contains('open')) closeForm();
  });
})();
