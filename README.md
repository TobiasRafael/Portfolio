# Rafael Tobías Genao · Portfolio

Personal site: senior full stack engineer (.NET · Azure · Angular).

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies.

```
index.html              page content (all copy lives here)
assets/css/styles.css   design tokens, light/dark themes, layout
assets/js/main.js       theme toggle, mobile menu, project filters, scroll reveal
assets/img/             portrait, project screenshots, social preview (og-image.png)
```

## Run locally

```bash
python -m http.server 8080
```

Open http://127.0.0.1:8080

## Deploy

Any static host works. Two options:

- **GitHub Pages:** Settings → Pages → Deploy from branch `master`, folder `/ (root)`.
- **Cloudflare Pages:** `npx wrangler pages deploy . --project-name portfolio`

After choosing a domain, make `og:image` in `index.html` an absolute URL
(e.g. `https://your-domain/assets/img/og-image.png`) so LinkedIn and WhatsApp show the preview card.

## Updating

- **New project:** copy an `<article class="project ...">` block in `#work` and set `data-tags`
  (`dotnet`, `client`, `ai`) so the filters pick it up.
