# AGENTS.md

Guía para agentes de código (Claude Code, Codex, Cursor, Copilot, etc.) que trabajen en este repositorio.

## Qué es

Sitio estático de **presentación y currículum** de Manuel Alejandro Henríquez Peralta (Ingeniero en Informática). Una sola página en español, sin build, sin dependencias, sin framework. Se publica en GitHub Pages y GitLab Pages desde la carpeta `public/`.

## Estructura

```
public/                      ← lo único que se publica
  index.html                 ← todo el contenido (CV completo)
  styles.css                 ← estilos, modo oscuro y estilos de impresión
  script.js                  ← menú móvil, año del footer, botón "Descargar CV", sección activa en el menú
  .nojekyll                  ← evita que GitHub Pages procese con Jekyll
docs/                        ← material fuente, NO se publica (ver "Privacidad")
  Curriculum_Vitae_Manuel_Henriquez_v2.docx
.github/workflows/pages.yml  ← despliegue a GitHub Pages en push a main
.gitlab-ci.yml               ← despliegue a GitLab Pages en la rama por defecto
landing.zip                  ← copia de la plantilla original; no se usa
```

## Comandos

```bash
# Servidor local
cd public && python -m http.server 8000      # http://localhost:8000
# (o con Laragon: http://localhost/presentacion/public/)

# Vista previa del PDF que genera "Descargar CV" (Chrome headless)
chrome --headless=new --no-pdf-header-footer --print-to-pdf=cv.pdf public/index.html
```

No hay tests, linter ni paso de build. Verifica los cambios abriendo la página en escritorio, en móvil (≤ 860px), en modo oscuro y en vista de impresión.

## Convenciones

- **Idioma**: todo el contenido visible está en español de Chile. Usa tildes y ñ reales (UTF-8), no entidades HTML.
- **Sin dependencias**: no agregues frameworks, CDNs, fuentes externas ni herramientas de build. El sitio debe funcionar abriendo `index.html` directamente.
- **HTML**: semántico (`section`, `article`, `ol.timeline`, `dl.facts`). Cada sección tiene un `id` que coincide con un enlace del menú `#menu`; si agregas o quitas una sección, actualiza el menú.
- **CSS**: los colores salen de variables en `:root` (`--primary`, `--on-primary`, etc.) y se redefinen en `@media (prefers-color-scheme: dark)`. No uses colores fijos para texto sobre `--primary`; usa `--on-primary`. Breakpoint único: `max-width: 860px`.
- **Impresión**: el bloque `@media print` al final de `styles.css` convierte la página en el CV en PDF. Oculta navegación, botones, estadísticas, "Áreas de experiencia" y la sección de contacto (el contacto se imprime arriba con `.print-only`). Si agregas una sección, decide si debe imprimirse.
- **JS**: ES5 dentro de una IIFE, sin módulos ni librerías. Debe degradar bien si JavaScript falla.
- **Accesibilidad**: mantén `aria-label`/`aria-expanded` del menú, el enlace "Saltar al contenido", `aria-hidden` en emojis decorativos y contraste suficiente en ambos temas.

## Contenido del CV

La fuente de verdad del contenido es `docs/Curriculum_Vitae_Manuel_Henriquez_v2.docx`. Si el CV cambia, refleja el cambio en `index.html` (incluido el JSON-LD `Person` del `<head>`) y revisa las cifras de `.stats` (años de experiencia: desde feb 2020; sector salud: sep 2021 – oct 2026, Hospital de Carabineros). La página es más reciente que el `.docx`: incluye el cargo actual (Analista Informático, Dirección de Bienestar de Carabineros de Chile, desde el 13 de octubre de 2026) y el término del cargo en el hospital (9 de octubre de 2026).

No inventes proyectos, enlaces, cifras ni logros que no estén en el CV. Si falta un dato (por ejemplo URL de LinkedIn/GitHub), déjalo como comentario HTML en lugar de poner un placeholder visible.

## Privacidad

- El CV en `docs/` contiene **nombres, teléfonos y correos de terceros** (referencias laborales). Nunca los copies a `public/` ni a ningún archivo publicado. En el sitio solo se indica "Referencias laborales disponibles a solicitud".
- No copies el `.docx` a `public/`.
- El correo y teléfono del propio Manuel sí se publican, por decisión explícita.

## Despliegue

Ambos pipelines publican `public/` tal cual. Un `git push` a `main` despliega en GitHub; en GitLab despliega la rama por defecto. No hay variables de entorno ni secretos.
