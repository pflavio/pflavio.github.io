# Philip Flávio — personal website

A small, static personal website for [www.pflavio.com](https://www.pflavio.com/). Plain HTML, CSS, and an inline SVG illustration. No Jekyll, Ruby, npm, build step, JavaScript, blog, tracking, externally loaded fonts, or embeds.

## Hosting

GitHub Pages publishes the root of the `main` branch. The `.nojekyll` file tells GitHub to serve these ready-made files directly. No custom Actions workflow is needed.

In **Settings → Pages → Build and deployment**, use **Deploy from a branch**, branch **main**, folder **/ (root)**. Keep **www.pflavio.com** as the custom domain and keep the existing DNS records. The included `CNAME` preserves the domain.

Commit changes to `main` to publish them. GitHub's automatic **pages build and deployment** run reports the result in the Actions tab.

If restoring from the downloadable ZIP, extract its contents into the repository root, including hidden files such as `.nojekyll`. Do not upload the ZIP itself or put the files inside a nested folder. Keep the repository's `.git` folder when working in a local clone. Remove obsolete Jekyll files and the previous `.github/workflows/pages-deploy.yml`; the previous website remains recoverable in Git history.

## Preview locally

Open `index.html` in a browser for a quick preview. To test directory links and the entire site, run from this folder:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/`. There is nothing to install or build.

## Content and privacy

- A casual, evergreen English introduction, based on the public LinkedIn profile and maker interests in the original website.
- No employer names, detailed career history, location, portrait, or contact address on the homepage. LinkedIn is the contact route.
- Existing German Impressum and Datenschutz content retained on separate pages, including the postal address as requested. These pages carry `noindex,follow`; this is a search-engine hint, not access control. The legal wording was preserved, not legally reviewed or updated.
- No dates, feeds, posts, availability indicators, or third-party widgets to keep fresh.

## What was fixed

The old homepage returned literal Jekyll front matter. The old Jekyll workflow failed while the automatic branch-based Pages deployment successfully served the unbuilt source. This version contains complete HTML and removes the competing Jekyll workflow, theme configuration, and unused blog assets.

## Small future edits

- Wording and LinkedIn link: `index.html`.
- Colors, spacing, and responsive layout: `style.css`.
- Legal text: `impressum/index.html` and `datenschutz/index.html`.
- Domain: `CNAME`, canonical/Open Graph URLs in `index.html`, `robots.txt`, and `sitemap.xml`.

The custom `404.html` sends visitors back to the homepage. All visual assets are served locally.
