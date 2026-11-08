# AGENTS.md

Guía para agentes de código (Claude Code, Codex, Cursor, Copilot, etc.) que trabajen en este repositorio.

> Este archivo y `CLAUDE.md` tienen el mismo contenido de proyecto (`CLAUDE.md` agrega notas propias de Claude Code). Si cambias uno, actualiza el otro.

## Qué es

Sitio de **presentación y currículum** de Manuel Alejandro Henríquez Peralta (Ingeniero en Informática). Una sola página en español, con estilos en **Tailwind CSS 4** compilados con su CLI. Todas las dependencias se gestionan con **pnpm**. Se publica en GitHub Pages y GitLab Pages desde la carpeta `public/`.

La versión anterior con Bootstrap 5.3.8 está respaldada localmente en `tmp/version-bootstrap/` (ignorada por git) y en el historial (commit `ebb38f5`).

## Estructura

```
src/css/app.css              ← hoja de estilos FUENTE (Tailwind): colores, componentes, loader, modal, impresión
public/                      ← lo único que se publica
  index.html                 ← todo el contenido (CV completo), maquetado con clases de Tailwind
  assets/
    css/app.css              ← CSS GENERADO por Tailwind (pnpm build); no versionado, no se edita a mano
    js/script.js             ← año del footer, "Volver arriba", menú móvil, sección activa y modal del CV
    img/                     ← imágenes del sitio (vacía por ahora; el favicon es un SVG inline)
    docs/Curriculum_Vitae_Manuel_Henriquez.pdf ← CV que muestra el botón "Ver CV (PDF)"
  .nojekyll                  ← evita que GitHub Pages procese con Jekyll
docs/                        ← material fuente, ignorado por git (ver "Privacidad")
tmp/                         ← respaldos locales, ignorado por git
package.json / pnpm-lock.yaml ← dependencias de desarrollo (pnpm): tailwindcss, @tailwindcss/cli, vite
pnpm-workspace.yaml          ← configuración de pnpm (scripts de instalación permitidos/ignorados)
vite.config.js               ← Vite sirve public/ tal cual en desarrollo (root: public)
.github/workflows/pages.yml  ← despliegue a GitHub Pages en push a main
.gitlab-ci.yml               ← despliegue a GitLab Pages en la rama por defecto
landing.zip                  ← copia de la plantilla original; no se usa
```

## Comandos

```bash
# Instalar dependencias (también compila el CSS). Obligatorio antes de abrir el sitio.
pnpm install

# Desarrollo: Tailwind en modo watch + servidor Vite con recarga automática (abre el navegador)
pnpm dev
pnpm start        # solo el servidor Vite, sin watch ni abrir el navegador
pnpm build        # compila y minifica src/css/app.css → public/assets/css/app.css

# Alternativas (requieren haber ejecutado pnpm install o pnpm build antes)
cd public && python -m http.server 8000      # http://localhost:8000
# (o con Laragon: http://localhost/presentacion/public/)

# Vista previa de la versión impresa de la página (Chrome headless)
chrome --headless=new --no-pdf-header-footer --print-to-pdf=cv.pdf public/index.html
```

No hay tests ni linter. Verifica los cambios abriendo la página en escritorio, en móvil (< 768px), en modo oscuro y en vista de impresión.

## Convenciones

- **Idioma**: todo el contenido visible está en español de Chile. Usa tildes y ñ reales (UTF-8), no entidades HTML.
- **Dependencias solo con pnpm**: toda dependencia (del navegador o de desarrollo) se agrega con `pnpm add --save-exact <paquete>@<versión>` (o `-D` si es de desarrollo), con versión exacta y no recién publicada (al menos ~2 semanas). Nunca descargues archivos de librerías a mano, no enlaces CDNs y no uses npm ni yarn. Si una dependencia trae scripts de instalación, decide en `pnpm-workspace.yaml` (`allowBuilds`) si se permiten; `@parcel/watcher` está ignorado porque usa binarios precompilados.
- **Tailwind CSS 4**: los estilos se escriben como clases de utilidad en `index.html`. Lo que se repite o Tailwind no resuelve va en `src/css/app.css` (capa `components`: `.btn`, `.card`, `.tag`, `.timeline`, `.nav-link`, loader, modal…). Tailwind escanea solo `public/**/*.{html,js}` (`@source`); si generas clases desde JS, escríbelas completas para que las detecte. Nunca edites `public/assets/css/app.css`: se regenera.
- **HTML**: semántico (`section`, `article`, `ol.timeline`, `dl.facts`). Cada sección tiene un `id` que coincide con un `.nav-link` del menú `#menu`; `script.js` marca la sección visible con `aria-current` (IntersectionObserver). Si agregas o quitas una sección, actualiza el menú.
- **Colores y modo oscuro**: variables CSS en `:root` de `src/css/app.css` (`--bg`, `--fg`, `--muted`, `--line`, `--card`, `--brand`, `--brand-soft`, `--on-brand`…), redefinidas en `@media (prefers-color-scheme: dark)` y expuestas a Tailwind con `@theme inline` como `bg-bg`, `bg-bg-alt`, `text-fg`, `text-muted`, `border-line`, `bg-card`, `bg-brand`, `text-brand`, `bg-brand-soft`, `text-on-brand`, `shadow-soft`. Usa esas clases en lugar de colores fijos para que funcionen ambos temas. Breakpoints: los de Tailwind (`md` 768px para el menú, `lg` 1024px para el hero).
- **Loader**: `#page-loader` (monograma "MH" con `.spinner`) cubre la página hasta el evento `load`. Lo oculta y elimina el script del `<head>` (no `script.js`, para que no quede pegado si este falla), con un máximo de 8 s. Sin JavaScript (`html` sin `.js`) no se muestra.
- **Ver CV**: el botón (`.js-cv-modal`) abre `public/assets/docs/Curriculum_Vitae_Manuel_Henriquez.pdf` (copia del PDF de `docs/`) en el `<dialog id="cv-modal">` (pantalla completa en móvil), con botones para descargar o abrir en pestaña. El iframe usa `#toolbar=0&navpanes=0&view=FitH` para ocultar la barra del visor (incluidas las herramientas de anotación de Edge). `#cv` en la URL abre el modal al cargar. Si el navegador no tiene `<dialog>` o visor de PDF integrado (`navigator.pdfViewerEnabled === false`, p. ej. Chrome en Android), el enlace descarga el archivo. Para actualizar el CV, reemplaza el PDF manteniendo el nombre.
- **Volver arriba**: botón flotante `.back-to-top` (esquina inferior derecha). `script.js` le agrega `.show` al bajar más de 400px; el script del `<head>` pone la clase `js` en `<html>`, y sin ella el botón queda siempre visible.
- **Menú móvil**: `script.js` alterna `.is-open` en `#menu` y `aria-expanded` en `.nav-toggle`. Sin JavaScript el menú queda siempre visible.
- **Impresión**: el bloque `@media print` al final de `src/css/app.css` da formato de CV cuando se imprime la página (Ctrl+P). Lo que no se imprime lleva `print:hidden` (navegación, botones, estadísticas, "Áreas de experiencia", contacto, footer); la línea de contacto impresa usa `hidden print:block`. Si agregas una sección, decide si debe imprimirse.
- **JS**: `assets/js/script.js` en ES5 dentro de una IIFE, sin librerías. Debe degradar bien si JavaScript falla: el contenido se ve igual y "Ver CV" descarga el PDF.
- **Accesibilidad**: mantén `aria-label`/`aria-controls`/`aria-expanded` del `.nav-toggle`, el enlace "Saltar al contenido" (`sr-only focus:not-sr-only`), `aria-hidden` en emojis e íconos decorativos y contraste suficiente en ambos temas.

## Contenido del CV

La fuente de verdad del contenido es `docs/Curriculum_Vitae_Manuel_Henriquez_v2.docx`. Si el CV cambia, refleja el cambio en `index.html` (incluido el JSON-LD `Person` del `<head>`) y revisa las cifras de las estadísticas del perfil (años de experiencia: desde feb 2020; sector salud: sep 2021 – oct 2026, Hospital de Carabineros). La página es más reciente que el `.docx`: incluye el cargo actual (Analista Informático, Dirección de Bienestar de Carabineros de Chile, desde el 13 de octubre de 2026) y el término del cargo en el hospital (9 de octubre de 2026).

No inventes proyectos, enlaces, cifras, logros ni tecnologías que no estén en el CV. Si falta un dato (por ejemplo URL de LinkedIn/GitHub), déjalo como comentario HTML en lugar de poner un placeholder visible.

## Privacidad

- El CV en `docs/` contiene **nombres, teléfonos y correos de terceros** (referencias laborales). Nunca los copies a `public/` ni a ningún archivo publicado. En el sitio solo se indica "Referencias laborales disponibles a solicitud".
- No copies ningún `.docx` a `public/`. Solo se publica el PDF (`public/assets/docs/`), y antes de reemplazarlo revisa que no incluya datos de referencias.
- El correo y teléfono del propio Manuel sí se publican, por decisión explícita.

## Despliegue

URL pública (GitHub Pages): https://mhenriquezperalta.github.io/presentacion/ — está en `og:url`, `canonical` y en `url` del JSON-LD; si cambia el dominio, actualiza los tres.

Espejo en GitLab Pages: https://mhenriquezperalta.gitlab.io/presentacion/ (no es la canónica). El remoto `origin` tiene dos URLs de push (GitHub y GitLab), así que `git push` publica en ambos.

Ambos pipelines ejecutan `pnpm install --frozen-lockfile` y `pnpm build` (que genera `public/assets/css/app.css`) y luego publican `public/`. Si cambias dependencias, sube también `pnpm-lock.yaml` o el pipeline fallará. Un `git push` a `main` despliega en GitHub; en GitLab despliega la rama por defecto. El trabajo nuevo se hace en la rama `develop` y pasa a `main` cuando está listo para publicarse. No hay variables de entorno ni secretos.
