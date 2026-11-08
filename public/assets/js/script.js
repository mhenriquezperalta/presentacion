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

  // Bootstrap 5.3.8 (assets/js/bootstrap.bundle.min.js) maneja el menú colapsable y la sección activa (Scrollspy).
  if (!window.bootstrap) return;

  // En móvil, cierra el menú al elegir una sección.
  var menu = document.getElementById('menu');
  if (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  }

  // "Ver CV": muestra el PDF en un modal. Sin visor de PDF integrado
  // (p. ej. Chrome en Android), el enlace descarga el archivo.
  var modalEl = document.getElementById('cv-modal');
  if (modalEl && navigator.pdfViewerEnabled !== false) {
    var frame = modalEl.querySelector('.modal-frame');
    var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modalEl.addEventListener('show.bs.modal', function () {
      if (!frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
    });
    var cvLinks = document.querySelectorAll('.js-cv-modal');
    for (var i = 0; i < cvLinks.length; i++) {
      cvLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        modal.show();
      });
    }
    if (location.hash === '#cv') modal.show();
  }
})();
