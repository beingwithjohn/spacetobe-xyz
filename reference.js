(function () {
  'use strict';
  var overlay = document.getElementById('formOverlay');
  var frame = document.getElementById('formFrame');
  var opener = null;
  var localFile = location.protocol === 'file:';
  var messageOrigin = localFile ? '*' : location.origin;

  if (!overlay || !frame) return;

  function openForm(event) {
    event.preventDefault();
    opener = event.currentTarget;
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

  document.querySelectorAll('a[href="../start.html"]').forEach(function (link) {
    link.addEventListener('click', openForm);
  });
  window.addEventListener('message', function (event) {
    if (event.source === frame.contentWindow && (localFile || event.origin === location.origin) && event.data === 'spacetobe:close-form') closeForm();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && overlay.classList.contains('open')) closeForm();
  });
})();
