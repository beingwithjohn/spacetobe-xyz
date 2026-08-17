# spacetobe.xyz — how this repo works

Small and hand-maintained. No generator, no build step. Edit the HTML, commit, push.

GitHub Pages from `main` on `beingwithjohn/spacetobe-xyz`, CNAME `spacetobe.xyz`, HTTPS enforced.

| Path | What it is |
|---|---|
| `index.html` | the home page — an **app shell**: an entry gate plus five no-scroll screens, one file |
| `start.html` | the contact form; also embedded as an iframe overlay by the other pages |
| `practice-map/` | the practice map, Space to Be's own version of the Beings Club one |
| `404.html` | predates the current design system — still on the old fonts |
| `images/` | all assets |

## Deploying

There is no deploy script here. Push, then **verify by bytes** — GitHub's Pages build API
has reported a stale commit for a deploy that was already live, so don't trust "built":

```bash
git add -A && git commit -m "…" && git push origin main
# then poll until the served page matches what you have locally
until [ "$(curl -fsS https://spacetobe.xyz/ | shasum | cut -d' ' -f1)" = "$(shasum index.html | cut -d' ' -f1)" ]; do sleep 6; done; echo live
```

## The design system

Defined once in `index.html`'s `:root`. Any new page copies these verbatim — that is what
makes it feel like one site.

```
--bg #FFF9F0   --forest #1E2618   --green #60A484   --hair rgba(30,38,24,0.08)
--display 'Bricolage Grotesque'   --body 'Space Grotesk'   --mono 'Space Mono'
```

Structural idiom: a `.page` with a faint 64px `.grid-overlay`, a 1240px `.col` with hairline
left/right borders, and sections separated by single hairlines. Eyebrows are mono, uppercase
or sentence case, green. Headings are Bricolage, tight tracking. Breakpoints at 900px and
560px. The ASCII flow field in the hero and the rotating torus in "Who I am" are the site's
signature — reuse them rather than introducing new decoration.

`404.html` has **not** been brought into this system; it still loads Tenor Sans and Pontano
Sans. Worth fixing, not yet done.

## Things worth knowing

**The contact overlay.** Every `a[href="/start.html"]` is intercepted and opens `start.html`
in a full-screen iframe instead of navigating. The iframe posts `spacetobe:close-form` to
close. If you add a CTA, point it at `/start.html` and it joins the pattern for free.

**Images must be resized before committing.** The portrait in the intro section came from a
2.2MB original; it ships at 1500px / 411KB as `images/john-portrait.jpg`. The 2127px
originals (`DSC00393.*`) are kept in `images/` but never served.
`sips -Z 1500 --setProperty formatOptions 78 in.jpg --out out.jpg` is enough.

**The practice map is a sibling, not a copy.** `practice-map/` carries the same content as
beingsclub.com's but rebuilt in this design system. Copy changes usually need applying to
both — they are separate repos and nothing syncs them. Beings Club's version is at
`../Beings Club/practice-map/index.html`; read that repo's `AGENTS.md` first, because its
six main pages are generated and must not be hand-edited.

**Image bands on the practice map.** One full plate at the top, unfiltered; after that the
photographs run as thin desaturated "spectral rules" between territories, so the colour
paces the page instead of shouting over a cream-and-forest palette. Deliberate — see the
comment above `.band` before enlarging them.

## Open threads

- **The practice map wants restructuring.** A reader's note: it calls itself a map and reads
  as a linear essay, so the relationships between body/heart/mind × cultivate/rest/reveals
  are never actually shown. Proposal under consideration: a real grid near the top, the
  "if overwhelmed / if angry / if scattered" entry points moved up with it, nothing cut.
  This page is the cheapest place to prototype it — it is hand-maintained.
- **`404.html`** is still on the pre-redesign fonts and palette.

## The home page is an app shell

`index.html` is no longer a scrolling page. It is a gate plus five screens, and **nothing on
it scrolls** — `body` is `overflow:hidden`, `.stage` is `100svh`, and each `.screen` is an
absolutely-positioned layer that crossfades. Only one carries `data-active="1"`.

Screens: `start`, `how`, `john`, `words`, `cost`. Switched by the bottom tabs, the arrow keys,
the browser Back button, and `#hash` deep links. There is one URL — no per-screen directories
to maintain.

**Every screen must fit the viewport.** The floor is 360×640; `how` is the tallest and had to
be tightened with a `@media (max-height: 44rem)` tier to fit. If you add copy, re-check that
tier — measure `.inner`'s bounding box against `clientHeight` rather than eyeballing it, and
note that the preview pane's screenshot canvas is bigger than the page, so screenshots lie
about vertical fit.

**The entry gate** is the breathing ring plus "click to enter". It follows the same contract
as the Beings Club intro, for the same reasons:
- shut by default in CSS — the `<head>` script opens it on a first visit, so the page is never
  painted and then covered;
- `@keyframes gate-guard` retires it after 14s with no JavaScript, so a dead script cannot
  trap anyone behind it;
- `sessionStorage["stb-entered"]` is written on *arrival*, not on click, so a visitor who
  never clicks still only sees it once.

**The ring is CSS, not `images/logo.png`.** The PNG's centre is opaque white and reads as a
hole punched in the paper. `.ring` is a `1em` box with a `0.27em` border, which reproduces the
logo's proportions (hole/outer = 0.46 against the original's 0.45) and lets it animate. The
breath is 6s peaking at 38% — 2.3s in, 3.7s out, which is the way a resting breath actually
goes.

The old scrolling page is in git history if any of this needs walking back:
`git log --oneline -- index.html`.
