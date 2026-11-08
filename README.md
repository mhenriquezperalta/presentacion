# Manuel Henríquez — Presentación y currículum

Sitio de una sola página con la presentación profesional y el currículum de Manuel Alejandro Henríquez Peralta, Ingeniero en Informática.

**Sitio publicado:**

- GitHub Pages: https://mhenriquezperalta.github.io/presentacion/ (URL canónica)
- GitLab Pages: https://mhenriquezperalta.gitlab.io/presentacion/

## Funcionalidades

- Perfil, experiencia, áreas de experiencia, competencias, formación y contacto.
- **Ver CV (PDF)**: muestra el currículum en un modal, con opciones para descargarlo o abrirlo en otra pestaña. El enlace `…/presentacion/#cv` abre el modal directamente.
- Modo claro y oscuro automático, según la configuración del sistema.
- Loader de carga, menú que marca la sección visible y botón flotante "Volver arriba".
- Versión imprimible: al imprimir la página (Ctrl+P) sale con formato de currículum.
- Diseño adaptable a móvil, metadatos para buscadores y vista previa en redes sociales.

## Tecnologías

| | Versión | Uso |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | 4.3.3 | Estilos del sitio, compilados con su CLI a un CSS estático |
| [Vite](https://vite.dev/) | 8.3.5 | Servidor de desarrollo con recarga automática (no participa en el despliegue) |
| [pnpm](https://pnpm.io/) | 11.17.0 | Gestor de dependencias |
| Node.js | ≥ 22.12 | Requerido por pnpm y Vite |

El único paso de build es compilar el CSS de Tailwind (`src/css/app.css` → `public/assets/css/app.css`). El resto es HTML y JavaScript que se publican tal cual desde `public/`.

La versión anterior, hecha con Bootstrap 5.3.8, está respaldada en `tmp/version-bootstrap/` (solo local) y en el historial de git (commit `ebb38f5`).

## Desarrollo local

```bash
pnpm install   # instala dependencias y compila el CSS
pnpm dev       # Tailwind en modo watch + servidor en http://localhost:5173 (abre el navegador)
```

| Comando | Qué hace |
|---|---|
| `pnpm install` | Instala dependencias y, al terminar, compila el CSS (`pnpm build`) |
| `pnpm dev` | Tailwind en modo watch + servidor con recarga automática; abre el navegador |
| `pnpm start` | Solo el servidor de desarrollo, sin modo watch ni abrir el navegador |
| `pnpm build` | Compila y minifica `src/css/app.css` → `public/assets/css/app.css` |

`pnpm install` es obligatorio después de clonar el repositorio: sin él la página se ve sin estilos. Una vez ejecutado, también se puede abrir con Laragon (http://localhost/presentacion/public/) o con `cd public && python -m http.server 8000`.

## Estructura

```
src/css/app.css                ← estilos fuente (Tailwind): colores, componentes, loader, modal, impresión
public/                        ← lo único que se publica
  index.html                   ← todo el contenido del sitio, con clases de Tailwind
  assets/
    css/app.css                ← CSS generado por Tailwind (no se sube al repositorio)
    js/script.js               ← menú móvil, sección activa, modal del CV, botón "Volver arriba"
    img/                       ← imágenes
    docs/Curriculum_Vitae_Manuel_Henriquez.pdf  ← CV que muestra el modal
package.json, pnpm-lock.yaml   ← dependencias
pnpm-workspace.yaml            ← configuración de pnpm
vite.config.js                 ← configuración del servidor de desarrollo
.github/workflows/pages.yml    ← despliegue en GitHub Pages
.gitlab-ci.yml                 ← despliegue en GitLab Pages
AGENTS.md, CLAUDE.md           ← guía del proyecto para agentes de código (mismo contenido)
docs/                          ← material fuente del CV (no se sube al repositorio)
tmp/                           ← respaldos locales (no se suben al repositorio)
```

## Actualizar el contenido

- **Textos del sitio:** edita `public/index.html`. Si cambia el cargo o la experiencia, actualiza también el bloque JSON-LD del `<head>` y las cifras de la sección "Perfil".
- **CV en PDF:** reemplaza `public/assets/docs/Curriculum_Vitae_Manuel_Henriquez.pdf` manteniendo el nombre. Antes de publicarlo, revisa que no incluya datos de contacto de terceros (referencias).
- **Redes:** los enlaces a LinkedIn, GitHub y GitLab están en la lista `.socials` de la sección Contacto y en `sameAs` del JSON-LD.
- **Estilos:** clases de Tailwind en `public/index.html`; los colores (tema claro y oscuro) y componentes repetidos están en `src/css/app.css`. Con `pnpm dev` el CSS se recompila solo al guardar.

## Dependencias

Todas las dependencias se gestionan con pnpm, con versión exacta:

```bash
pnpm add --save-exact paquete@versión      # dependencia del sitio
pnpm add -D --save-exact paquete@versión   # dependencia de desarrollo
```

No se descargan librerías a mano ni se usan CDN. Para actualizar Tailwind: `pnpm add -D --save-exact tailwindcss@X.Y.Z @tailwindcss/cli@X.Y.Z`. El CSS compilado no se sube al repositorio: lo genera `pnpm build`, tanto en local como en los pipelines.

## Ramas y publicación

- **`develop`**: rama de trabajo. Sus cambios no se publican.
- **`main`**: cada push publica el sitio en GitHub Pages y GitLab Pages.

El remoto `origin` tiene dos URLs de push (GitHub y GitLab), así que un solo `git push` actualiza ambos repositorios:

```bash
git checkout main
git merge develop
git push
```

Ambos pipelines ejecutan `pnpm install --frozen-lockfile` y `pnpm build`, y publican `public/`. Si cambias dependencias, sube también `pnpm-lock.yaml`.

Configuración necesaria (ya aplicada en este proyecto):

- **GitHub:** Settings → Pages → Build and deployment → Source: **GitHub Actions**.
- **GitLab:** Settings → General → Visibility → Pages: **Everyone**.
