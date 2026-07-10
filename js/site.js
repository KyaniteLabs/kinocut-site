// Kinocut site: language toggle + playhead scroll ruler.
(function () {
  "use strict";

  // ---- language ----
  var root = document.documentElement;
  var buttons = document.querySelectorAll("[data-set-lang]");

  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.setLang === lang));
    });
    try { localStorage.setItem("kinocut-lang", lang); } catch (e) { /* private mode */ }
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.setLang); });
  });

  var urlLang = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("kinocut-lang"); } catch (e) { /* private mode */ }
  if (urlLang === "en" || urlLang === "es") {
    setLang(urlLang);
  } else if (saved === "en" || saved === "es") {
    setLang(saved);
  } else if ((navigator.language || "").toLowerCase().indexOf("es") === 0) {
    setLang("es");
  }

  // ---- playhead ruler (page as timeline; 30fps drop-frame-style timecode) ----
  var fill = document.getElementById("playheadFill");
  var tc = document.getElementById("playheadTc");
  var FPS = 30;
  var PAGE_SECONDS = 90; // full scroll = a 90-second "take"
  var ticking = false;

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function update() {
    ticking = false;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    fill.style.width = (p * 100).toFixed(2) + "%";
    var totalFrames = Math.round(p * PAGE_SECONDS * FPS);
    var f = totalFrames % FPS;
    var s = Math.floor(totalFrames / FPS) % 60;
    var m = Math.floor(totalFrames / (FPS * 60));
    tc.textContent = "00:" + pad(m) + ":" + pad(s) + ";" + pad(f);
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
})();
