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

  // "Ver CV": muestra el PDF en un modal. Sin <dialog> o sin visor de PDF
  // integrado (p. ej. Chrome en Android), el enlace descarga el archivo.
  var modal = document.getElementById('cv-modal');
  var canShowPdf = navigator.pdfViewerEnabled !== false;
  if (modal && typeof modal.showModal === 'function' && canShowPdf) {
    var frame = modal.querySelector('.modal-frame');
    var openModal = function () {
      if (!frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
      modal.showModal();
    };
    var cvLinks = document.querySelectorAll('.js-cv-modal');
    for (var i = 0; i < cvLinks.length; i++) {
      cvLinks[i].addEventListener('click', function (e) {
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
