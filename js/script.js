$(function () {
  let headerContent = document.querySelector('.header-content');
  let nav = document.querySelector('.site-nav');
  let areaScroll = document.querySelectorAll('#area-group .area');
  let headerCue = document.querySelector('.header-cue');
  let viewAreas = document.querySelector('#areas');
  let navHeight = nav.scrollHeight;

  areaScroll.forEach(
    (item) => (item.style.animationDelay = `${Math.random() * 0.5 + 0.4}s`)
  );

  function inViewPort(el) {
    let rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) ||
      (rect.top >= 0 && rect.bottom < window.innerHeight)
    );
  }

  function moveHeader() {
    let top = window.pageYOffset;
    let mainOnTop = viewAreas.getBoundingClientRect().top - navHeight;

    mainOnTop < 0
      ? nav.classList.add('in-body')
      : nav.classList.remove('in-body');

    let currentViewPosition = headerContent.getBoundingClientRect().top;

    currentViewPosition < 0
      ? headerCue.classList.add('d-none')
      : headerCue.classList.remove('d-none');

    headerContent.style.transform = `translateY(-${top / 1}px)`;
    headerContent.style.opacity =
      1 - Math.max(top / (window.innerHeight * 0.3), 0);

    areaScroll.forEach((item) =>
      inViewPort(item)
        ? item.classList.add('appear')
        : item.classList.remove('appear')
    );

    window.requestAnimationFrame(moveHeader);
  }

  window.requestAnimationFrame(moveHeader);
});

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
})();
