# AGENTS.md

Guía para agentes de código (Claude Code, Codex, Cursor, Copilot, etc.) que trabajen en este repositorio.

## Qué es

Sitio estático de **presentación y currículum** de Manuel Alejandro Henríquez Peralta (Ingeniero en Informática). Una sola página en español, sin build, construida con **Bootstrap 5.3.8** servido localmente (sin CDN). Todas las dependencias se gestionan con **pnpm**. Se publica en GitHub Pages y GitLab Pages desde la carpeta `public/`.

## Estructura

```
public/                      ← lo único que se publica
  index.html                 ← todo el contenido (CV completo)
  assets/
    css/styles.css           ← identidad visual sobre Bootstrap (colores --bs-*, timeline, etiquetas), impresión
    css/bootstrap.min.css    ← Bootstrap (+ .map), copiado por pnpm install; no versionado
    js/script.js             ← año del footer, botón flotante "Volver arriba", cierre del menú móvil y modal del CV
    js/bootstrap.bundle.min.js ← Bootstrap con Popper (+ .map), copiado por pnpm install; no versionado
    img/                     ← imágenes del sitio (vacía por ahora; el favicon es un SVG inline)
    docs/Curriculum_Vitae_Manuel_Henriquez.pdf ← CV que muestra el botón "Ver CV (PDF)"
    bootstrap-LICENSE.txt    ← licencia MIT de Bootstrap, copiada por pnpm install; no versionada
  .nojekyll                  ← evita que GitHub Pages procese con Jekyll
docs/                        ← material fuente, ignorado por git (ver "Privacidad")
package.json / pnpm-lock.yaml ← dependencias (pnpm): bootstrap (navegador) y vite (solo desarrollo)
scripts/copy-vendor.mjs      ← copia los archivos de Bootstrap de node_modules a public/assets/ (postinstall)
vite.config.js               ← Vite sirve public/ tal cual (root: public, sin build)
.github/workflows/pages.yml  ← despliegue a GitHub Pages en push a main
.gitlab-ci.yml               ← despliegue a GitLab Pages en la rama por defecto
landing.zip                  ← copia de la plantilla original; no se usa
```

## Comandos

```bash
# Instalar dependencias (también copia Bootstrap a public/assets/). Obligatorio antes de abrir el sitio.
pnpm install
pnpm vendor       # vuelve a copiar Bootstrap a public/assets/ sin reinstalar

# Servidor de desarrollo con recarga automática (Node >= 22.12, pnpm)
pnpm dev          # abre http://localhost:5173 en el navegador
pnpm start        # igual, sin abrir el navegador

# Alternativas (requieren haber ejecutado pnpm install antes)
cd public && python -m http.server 8000      # http://localhost:8000
# (o con Laragon: http://localhost/presentacion/public/)

# Vista previa de la versión impresa de la página (Chrome headless)
chrome --headless=new --no-pdf-header-footer --print-to-pdf=cv.pdf public/index.html
```

No hay tests, linter ni paso de build: Vite solo sirve los archivos en desarrollo y no participa en el despliegue. Verifica los cambios abriendo la página en escritorio, en móvil (< 768px), en modo oscuro y en vista de impresión.

## Convenciones

- **Idioma**: todo el contenido visible está en español de Chile. Usa tildes y ñ reales (UTF-8), no entidades HTML.
- **Dependencias solo con pnpm**: toda dependencia (del navegador o de desarrollo) se agrega con `pnpm add --save-exact <paquete>@<versión>` (o `-D` si es de desarrollo), con versión exacta y no recién publicada (al menos ~2 semanas). Nunca descargues archivos de librerías a mano, no enlaces CDNs y no uses npm ni yarn. Ver `package.json`, `pnpm-lock.yaml` y `packageManager`.
- **Bootstrap**: dependencia `bootstrap` en `package.json`. `scripts/copy-vendor.mjs` (hook `postinstall`, o `pnpm vendor`) copia `dist/css/bootstrap.min.css(.map)`, `dist/js/bootstrap.bundle.min.js(.map)` y `LICENSE` a `public/assets/`; esos archivos están en `.gitignore` y no se editan a mano. Para actualizar: `pnpm add --save-exact bootstrap@X.Y.Z`, revisa la página y actualiza la versión mencionada en este archivo y en el comentario de `styles.css`. Si agregas otra librería del navegador, súmala a la lista de `copy-vendor.mjs` y al `.gitignore`. El sitio no tiene paso de build: tras `pnpm install`, `index.html` funciona abriéndolo directamente.
- **Usa Bootstrap primero**: grid (`row`/`col-*`), utilidades (`py-5`, `text-body-secondary`, `d-flex`…), `card`, `list-group`, `badge`, `navbar` y `modal`. En `styles.css` solo va lo que Bootstrap no resuelve.
- **HTML**: semántico (`section`, `article`, `ol.timeline`, `dl.facts`). Cada sección tiene un `id` que coincide con un `.nav-link` del menú `#menu`; el Scrollspy de Bootstrap (`data-bs-spy` en `<body>`) marca la sección activa. Si agregas o quitas una sección, actualiza el menú.
- **Colores y modo oscuro**: `assets/css/styles.css` sobrescribe las variables de Bootstrap (`--bs-primary`, `--bs-body-bg`, `--bs-tertiary-bg`…) en `:root, [data-bs-theme="light"]` y `[data-bs-theme="dark"]`. Un script en el `<head>` pone `data-bs-theme` según `prefers-color-scheme`. `.btn-primary`/`.btn-outline-primary` se recolorean con sus variables `--bs-btn-*`. Para texto sobre `--bs-primary` usa `--on-primary`. Breakpoints: los de Bootstrap (`md` 768px para el menú, `lg` 992px para el hero).
- **Ver CV**: el botón (`.js-cv-modal`) abre `public/assets/docs/Curriculum_Vitae_Manuel_Henriquez.pdf` (copia del PDF de `docs/`) en el modal de Bootstrap `#cv-modal` (pantalla completa en móvil), con botones para descargar o abrir en pestaña. El iframe usa `#toolbar=0&navpanes=0&view=FitH` para ocultar la barra del visor (incluidas las herramientas de anotación de Edge). `#cv` en la URL abre el modal al cargar. Si Bootstrap no carga o el navegador no tiene visor de PDF integrado (`navigator.pdfViewerEnabled === false`, p. ej. Chrome en Android), el enlace descarga el archivo. Para actualizar el CV, reemplaza el PDF manteniendo el nombre.
- **Volver arriba**: botón flotante `.back-to-top` (esquina inferior derecha). `script.js` le agrega `.show` al bajar más de 400px; el script del `<head>` pone la clase `js` en `<html>`, y sin ella el botón queda siempre visible.
- **Impresión**: el bloque `@media print` al final de `assets/css/styles.css` da formato de CV cuando se imprime la página (Ctrl+P). Lo que no se imprime lleva `d-print-none` (navegación, botones, estadísticas, "Áreas de experiencia", contacto, footer); la línea de contacto impresa usa `d-none d-print-block`. Si agregas una sección, decide si debe imprimirse.
- **JS**: `assets/js/script.js` en ES5 dentro de una IIFE, usando la API global `bootstrap` (Collapse, Modal). Debe degradar bien si JavaScript falla: el contenido se ve igual y "Ver CV" descarga el PDF.
- **Accesibilidad**: mantén `aria-label`/`aria-controls` del `navbar-toggler`, el enlace "Saltar al contenido" (`visually-hidden-focusable`), `aria-hidden` en emojis decorativos y contraste suficiente en ambos temas.

## Contenido del CV

La fuente de verdad del contenido es `docs/Curriculum_Vitae_Manuel_Henriquez_v2.docx`. Si el CV cambia, refleja el cambio en `index.html` (incluido el JSON-LD `Person` del `<head>`) y revisa las cifras de `.stats` (años de experiencia: desde feb 2020; sector salud: sep 2021 – oct 2026, Hospital de Carabineros). La página es más reciente que el `.docx`: incluye el cargo actual (Analista Informático, Dirección de Bienestar de Carabineros de Chile, desde el 13 de octubre de 2026) y el término del cargo en el hospital (9 de octubre de 2026).

No inventes proyectos, enlaces, cifras ni logros que no estén en el CV. Si falta un dato (por ejemplo URL de LinkedIn/GitHub), déjalo como comentario HTML en lugar de poner un placeholder visible.

## Privacidad

- El CV en `docs/` contiene **nombres, teléfonos y correos de terceros** (referencias laborales). Nunca los copies a `public/` ni a ningún archivo publicado. En el sitio solo se indica "Referencias laborales disponibles a solicitud".
- No copies ningún `.docx` a `public/`. Solo se publica el PDF (`public/assets/docs/`), y antes de reemplazarlo revisa que no incluya datos de referencias.
- El correo y teléfono del propio Manuel sí se publican, por decisión explícita.

## Despliegue

URL pública (GitHub Pages): https://mhenriquezperalta.github.io/presentacion/ — está en `og:url`, `canonical` y en `url` del JSON-LD; si cambia el dominio, actualiza los tres.

Espejo en GitLab Pages: https://mhenriquezperalta.gitlab.io/presentacion/ (no es la canónica). El remoto `origin` tiene dos URLs de push (GitHub y GitLab), así que `git push` publica en ambos.

Ambos pipelines ejecutan `pnpm install --prod --frozen-lockfile` (que copia Bootstrap a `public/assets/`) y luego publican `public/`. Si cambias dependencias, sube también `pnpm-lock.yaml` o el pipeline fallará. Un `git push` a `main` despliega en GitHub; en GitLab despliega la rama por defecto. El trabajo nuevo se hace en la rama `develop` y pasa a `main` cuando está listo para publicarse. No hay variables de entorno ni secretos.
