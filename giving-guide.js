(function () {
  'use strict';
  var triggers = document.querySelectorAll('[data-giving-guide]');
  if (!triggers.length) return;

  var dialog = document.createElement('dialog');
  dialog.className = 'giving-guide';
  dialog.id = 'givingGuide';
  dialog.setAttribute('aria-labelledby', 'givingGuideTitle');
  dialog.setAttribute('data-nosnippet', '');
  var opener;
  document.body.appendChild(dialog);

  function close() { dialog.close(); }
  function render(revealed) {
    // The amount enters the document only after the reader opts in.
    dialog.innerHTML = '<div data-nosnippet><header><p class="giving-label">Freely given</p><button type="button" class="giving-close" aria-label="Close giving information">Close ×</button></header>' +
      (revealed ?
        '<h2 id="givingGuideTitle" tabindex="-1">If you have the means, I ask that you give</h2><p class="giving-amount">£125–£200<span>per session</span></p><p>I warmly welcome smaller contributions when that is what your circumstances allow.</p><p>What you give does not change the care I offer.</p><div class="giving-actions"><button type="button" class="giving-confirm" data-dismiss>Close</button></div>' :
        '<h2 id="givingGuideTitle" tabindex="-1">This work is freely given.</h2><p>You do not need to be able to give money to work with me. You are welcome to reach out without making any financial commitment.</p><p>That said, if you have the means and would find a specific amount helpful, you can choose to see it.</p><div class="giving-actions"><button type="button" class="giving-confirm" data-dismiss>Continue without looking</button><button type="button" class="giving-dismiss" data-reveal>Show me</button></div>') + '</div>';
    dialog.querySelector('.giving-close').addEventListener('click', close);
    dialog.querySelector('[data-dismiss]').addEventListener('click', close);
    var reveal = dialog.querySelector('[data-reveal]');
    if (reveal) reveal.addEventListener('click', function () {
      render(true);
      dialog.scrollTop = 0;
      dialog.querySelector('h2').focus();
    });
  }

  triggers.forEach(function (trigger) {
    trigger.setAttribute('aria-controls', dialog.id);
    trigger.addEventListener('click', function () {
      opener = trigger;
      render(false);
      document.body.classList.add('giving-guide-open');
      dialog.showModal();
      dialog.querySelector('h2').focus();
    });
  });
  dialog.addEventListener('close', function () {
    document.body.classList.remove('giving-guide-open');
    dialog.replaceChildren();
    if (opener) opener.focus({ preventScroll: true });
  });
  // Native dialog handles focus containment and Escape. Do not let the
  // landing page's keyboard navigation act on the sheet beneath it.
  document.addEventListener('keydown', function (event) {
    if (dialog.open) event.stopImmediatePropagation();
  }, true);
})();
