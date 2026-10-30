# Philip Flávio — personal website

Static HTML, CSS and a small local theme switch for https://www.pflavio.com/. No build step, blog, tracking, external fonts, translation API, or embeds.

## Languages

- American English: index.html (en-US)
- German: de/index.html (de)
- Brazilian Portuguese: pt-br/index.html (pt-BR)

Header links use local US, German and Brazilian flags with accessible names and hover labels. Each version is a complete page and works without JavaScript. The theme switch remembers light/dark mode across pages. Shared legal pages remain in German; English and Portuguese links identify their language.

## Hosting and previews

GitHub Pages serves the root of the main branch. Keep CNAME and .nojekyll, and retain the existing custom domain and DNS. Commit the contents of this folder to main to publish.

For a local preview, run `python3 -m http.server 8765 --bind 127.0.0.1` in this folder, then open http://127.0.0.1:8765/. Root-relative links require serving the folder rather than opening the pages directly as files.

## Editing

Update all three HTML pages when changing copy. They share style.css, theme.js and the assets folder. Keep canonical and alternate-language links and sitemap.xml consistent with their routes.

Photos use local responsive JPG/WebP assets. The hero and Work pictures have blurred screens baked into every size. The Life photo includes the supplied privacy edits. Only edited photos belong in the deployed assets. Legal content remains in impressum/index.html and datenschutz/index.html.

## CV downloads

Each Work section links to its matching language PDF in assets/cv/. Only the public CV editions belong here: no personal phone number or street address, and hello@pflavio.com as the contact email. Private application versions must not be committed. Replace the corresponding EN, DE, and PT-BR PDF when updating a CV, and retain the filenames to preserve download links.

