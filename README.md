# Philip Flávio — personal website

A small, static personal website for [www.pflavio.com](https://www.pflavio.com/). Plain HTML and CSS with a small local JavaScript theme switch. No Jekyll, Ruby, npm, build step, blog, tracking, externally loaded fonts, or embeds.

## Revision

This revision builds on commit `a7f4b44a4264e81376aa47d3e30572ebe188de3d` in `pflavio/pflavio.github.io`. The owner approved the design and copy, with the birthplace mentioned only in the Life section. The introduction pairs German–Brazilian identity with a travel reference and five languages; Play includes pétanque.

The owner confirmed `hello@pflavio.com` is ready to use. No mailbox or DNS configuration was changed.

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

- An evergreen English introduction with distinct Work, Play, Life, and Contact sections, based on the owner’s supplied editorial brief.
- A restrained “Previously at BMW” note, without job titles, dates, achievements, or logos. German–Brazilian background, fluent languages, and interests are included as supplied by the owner. No current location, postal address, family names, or portrait appears on the homepage.
- Email is the main contact action, with LinkedIn and GitHub also available.
- Existing German Impressum and Datenschutz content retained on separate pages, including the postal address as requested. These pages carry `noindex,follow`; this is a search-engine hint, not access control. The legal wording was preserved, not legally reviewed or updated.
- No dates, feeds, posts, availability indicators, or third-party widgets to keep fresh.

## What was fixed

The old homepage returned literal Jekyll front matter. The old Jekyll workflow failed while the automatic branch-based Pages deployment successfully served the unbuilt source. This version contains complete HTML and removes the competing Jekyll workflow, theme configuration, and unused blog assets.

## Small future edits

- Wording and contact links: `index.html`.
- Colors, spacing, and responsive layout: `style.css`.
- Legal text: `impressum/index.html` and `datenschutz/index.html`.
- Domain: `CNAME`, canonical/Open Graph URLs in `index.html`, `robots.txt`, and `sitemap.xml`.

The custom `404.html` sends visitors back to the homepage. All visual assets are served locally.

## Color themes

Dark navy is the default. The header button switches between dark and light, remembering the choice in this browser using only the `pflavio-theme` localStorage key. The same choice applies to the legal and error pages. If storage is blocked the switch still works; without JavaScript the site remains readable in dark mode. The script runs before the stylesheet to apply a remembered choice before the page renders.
