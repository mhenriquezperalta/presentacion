# Manuel Henríquez — Presentación y currículum

Sitio estático (HTML + CSS + JS, sin dependencias) con la presentación profesional y el CV de Manuel Alejandro Henríquez Peralta. Listo para GitLab Pages y GitHub Pages.

**Sitio publicado:**

- GitHub Pages: https://mhenriquezperalta.github.io/presentacion/ (URL canónica)
- GitLab Pages: https://mhenriquezperalta.gitlab.io/presentacion/

Un solo `git push` actualiza ambos (el remoto `origin` tiene las dos URLs de push).

## Estructura

```
public/
  index.html   ← contenido del CV (perfil, experiencia, competencias, formación, contacto)
  styles.css   ← estilos (colores en :root, modo oscuro y estilos de impresión)
  script.js    ← menú móvil, año del footer, botón "Descargar CV" y sección activa
docs/          ← CV original en Word (no se publica; ignorado por git)
.gitlab-ci.yml                ← despliegue en GitLab Pages
.github/workflows/pages.yml   ← despliegue en GitHub Pages
```

## Actualizar el contenido

1. Edita `public/index.html` cuando cambie el CV (también el bloque JSON-LD del `<head>` y las cifras de "Perfil").
2. El botón **Descargar CV (PDF)** imprime la página con el bloque `@media print` de `styles.css`; el navegador permite "Guardar como PDF".
3. Los enlaces a LinkedIn, GitHub y GitLab están en la lista `.socials` de la sección Contacto y en `sameAs` del JSON-LD.

Ver [AGENTS.md](AGENTS.md) para las convenciones del proyecto.

Para probar en local: `cd public && python3 -m http.server 8000` y abre http://localhost:8000.

## Publicar en GitLab Pages

1. Crea un repositorio en GitLab y sube estos archivos a la rama por defecto.
2. El pipeline `pages` se ejecuta solo.
3. El sitio queda en `https://<usuario-o-grupo>.gitlab.io/<repositorio>/` (Deploy → Pages).

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube estos archivos a la rama `main`.
2. En **Settings → Pages → Build and deployment → Source**, elige **GitHub Actions**.
3. El workflow se ejecuta solo. El sitio queda en `https://<usuario>.github.io/<repositorio>/`.

## Publicar en ambos

```bash
git remote add origin  git@github.com:USUARIO/REPO.git
git remote set-url --add --push origin git@github.com:USUARIO/REPO.git
git remote set-url --add --push origin git@gitlab.com:USUARIO/REPO.git
git push origin main
```

Con eso un solo `git push` actualiza ambos sitios. Si GitLab usa `master` como rama por defecto, ajusta el nombre de la rama.
