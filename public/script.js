(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');
  var year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Marca en el menú la sección visible.
  if (menu && 'IntersectionObserver' in window) {
    var links = menu.querySelectorAll('a[href^="#"]');
    var byId = {};
    for (var j = 0; j < links.length; j++) {
      byId[links[j].getAttribute('href').slice(1)] = links[j];
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (link && entry.isIntersecting) {
          for (var k = 0; k < links.length; k++) links[k].removeAttribute('aria-current');
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
