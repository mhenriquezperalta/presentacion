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
| [Bootstrap](https://getbootstrap.com/) | 5.3.8 | Componentes y estilos del sitio, servido localmente (sin CDN) |
| [Vite](https://vite.dev/) | 8.3.5 | Servidor de desarrollo con recarga automática (no participa en el despliegue) |
| [pnpm](https://pnpm.io/) | 11.17.0 | Gestor de dependencias |
| Node.js | ≥ 22.12 | Requerido por pnpm y Vite |

El sitio no tiene paso de build: es HTML, CSS y JavaScript que se publican tal cual desde `public/`.

## Desarrollo local

```bash
pnpm install   # instala dependencias y copia Bootstrap a public/assets/
pnpm dev       # servidor en http://localhost:5173 (abre el navegador)
```

| Comando | Qué hace |
|---|---|
| `pnpm install` | Instala dependencias y, al terminar, copia Bootstrap a `public/assets/` |
| `pnpm dev` | Servidor de desarrollo con recarga automática; abre el navegador |
| `pnpm start` | Igual que `pnpm dev`, sin abrir el navegador |
| `pnpm vendor` | Vuelve a copiar Bootstrap a `public/assets/` sin reinstalar |

`pnpm install` es obligatorio después de clonar el repositorio: sin él la página se ve sin estilos. Una vez ejecutado, también se puede abrir con Laragon (http://localhost/presentacion/public/) o con `cd public && python -m http.server 8000`.

## Estructura

```
public/                        ← lo único que se publica
  index.html                   ← todo el contenido del sitio
  assets/
    css/styles.css             ← identidad visual sobre Bootstrap, modo oscuro, loader, impresión
    js/script.js               ← menú móvil, modal del CV, botón "Volver arriba"
    img/                       ← imágenes
    docs/Curriculum_Vitae_Manuel_Henriquez.pdf  ← CV que muestra el modal
    (bootstrap.min.css, bootstrap.bundle.min.js y su licencia los genera pnpm install)
scripts/copy-vendor.mjs        ← copia Bootstrap de node_modules a public/assets/
package.json, pnpm-lock.yaml   ← dependencias
vite.config.js                 ← configuración del servidor de desarrollo
.github/workflows/pages.yml    ← despliegue en GitHub Pages
.gitlab-ci.yml                 ← despliegue en GitLab Pages
AGENTS.md, CLAUDE.md           ← guía del proyecto para agentes de código (mismo contenido)
docs/                          ← material fuente del CV (no se sube al repositorio)
```

## Actualizar el contenido

- **Textos del sitio:** edita `public/index.html`. Si cambia el cargo o la experiencia, actualiza también el bloque JSON-LD del `<head>` y las cifras de la sección "Perfil".
- **CV en PDF:** reemplaza `public/assets/docs/Curriculum_Vitae_Manuel_Henriquez.pdf` manteniendo el nombre. Antes de publicarlo, revisa que no incluya datos de contacto de terceros (referencias).
- **Redes:** los enlaces a LinkedIn, GitHub y GitLab están en la lista `.socials` de la sección Contacto y en `sameAs` del JSON-LD.
- **Colores:** variables `--bs-*` al inicio de `public/assets/css/styles.css`, para el tema claro y el oscuro.

## Dependencias

Todas las dependencias se gestionan con pnpm, con versión exacta:

```bash
pnpm add --save-exact paquete@versión      # dependencia del sitio
pnpm add -D --save-exact paquete@versión   # dependencia de desarrollo
```

No se descargan librerías a mano ni se usan CDN. Para actualizar Bootstrap: `pnpm add --save-exact bootstrap@X.Y.Z`. Los archivos de Bootstrap en `public/assets/` no se suben al repositorio: los genera `pnpm install`, tanto en local como en los pipelines.

## Ramas y publicación

- **`develop`**: rama de trabajo. Sus cambios no se publican.
- **`main`**: cada push publica el sitio en GitHub Pages y GitLab Pages.

El remoto `origin` tiene dos URLs de push (GitHub y GitLab), así que un solo `git push` actualiza ambos repositorios:

```bash
git checkout main
git merge develop
git push
```

Ambos pipelines ejecutan `pnpm install --prod --frozen-lockfile` y publican `public/`. Si cambias dependencias, sube también `pnpm-lock.yaml`.

Configuración necesaria (ya aplicada en este proyecto):

- **GitHub:** Settings → Pages → Build and deployment → Source: **GitHub Actions**.
- **GitLab:** Settings → General → Visibility → Pages: **Everyone**.
