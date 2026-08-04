# spacetobe.xyz — how this repo works

Small and hand-maintained. No generator, no build step. Edit the HTML, commit, push.

GitHub Pages from `main` on `beingwithjohn/spacetobe-xyz`, CNAME `spacetobe.xyz`, HTTPS enforced.

| Path | What it is |
|---|---|
| `index.html` | the home page — one file, inline `<style>`, two inline `<script>` blocks |
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
