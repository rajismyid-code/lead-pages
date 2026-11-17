document.querySelectorAll('.copyable').forEach(function (box) {
  var pre = box.querySelector('pre');
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-btn';
  btn.textContent = '📋 Copy';
  btn.addEventListener('click', function () {
    var text = pre.innerText;
    var done = function () {
      btn.textContent = '✅ Copied!';
      setTimeout(function () { btn.textContent = '📋 Copy'; }, 1800);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else { fallback(); }
    function fallback() {
      var r = document.createRange();
      r.selectNodeContents(pre);
      var s = window.getSelection();
      s.removeAllRanges(); s.addRange(r);
      try { document.execCommand('copy'); done(); } catch (e) { btn.textContent = 'Long-press to copy'; }
    }
  });
  box.appendChild(btn);
});
