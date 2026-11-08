(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Botón flotante "Volver arriba": aparece después de bajar 400px.
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    var toggleBackToTop = function () {
      backToTop.classList.toggle('show', window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
  }

  // Menú móvil: abre/cierra y se cierra al elegir una sección.
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    var setMenu = function (open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    toggle.addEventListener('click', function () {
      setMenu(!menu.classList.contains('is-open'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
  }

  // Marca en el menú la sección visible.
  if (menu && 'IntersectionObserver' in window) {
    var links = menu.querySelectorAll('a.nav-link');
    var byId = {};
    for (var i = 0; i < links.length; i++) {
      byId[links[i].getAttribute('href').slice(1)] = links[i];
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

  // "Ver CV": muestra el PDF en un <dialog>. Sin <dialog> o sin visor de PDF
  // integrado (p. ej. Chrome en Android), el enlace descarga el archivo.
  var modal = document.getElementById('cv-modal');
  if (modal && typeof modal.showModal === 'function' && navigator.pdfViewerEnabled !== false) {
    var frame = modal.querySelector('iframe');
    var openModal = function () {
      if (!frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
      modal.showModal();
    };
    var cvLinks = document.querySelectorAll('.js-cv-modal');
    for (var j = 0; j < cvLinks.length; j++) {
      cvLinks[j].addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    }
    modal.querySelector('.modal-close').addEventListener('click', function () { modal.close(); });
    // Cierra al hacer clic fuera del contenido (sobre el fondo).
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.close();
    });
    if (location.hash === '#cv') openModal();
  }
})();
